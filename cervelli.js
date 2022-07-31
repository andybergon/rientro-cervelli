function preRender() {    
$("#imponibileInfo").tooltip();
$("#comuneWarning").tooltip();
addRegionToOptions(nomiRegioni);
$('#region option[value="Lazio"]').attr("selected", "selected");
addComuniToOptions(regioniToComuni);
addEditableRegionalIrpef(comuniToScaglioniIrpef);
    $(document).on('submit', '#submit-salary', () => {
        $("#dopo5anni").hide();
        fillTables();
        $("#body").show('slow');
        return false;
    });
    //$('#comune option[value="Roma"]').attr("selected", "selected");
    $("#region").change(() => addComuniToOptions(regioniToComuni));
}

function fillTables() {
    const ral = $('#ral').val();
    const regionName = $('#region').children("option:selected").text();
    const regione = findRegionByName(regionName);
    const comune = $('#comune').children("option:selected").text();
    const comuneDef = {
        1_000_000_000: $('#customComune').val()/100,
    }
    console.log('Regione: %s - Comune: %s - Comune Def: %s', regione, comune, comuneDef)

    const standardSalary = calcolaNetto(ral, regione, comune, false, comuneDef);
    const rientroSalary = calcolaNetto(ral, regione, comune, true, comuneDef);
    console.log('Std: %s - Rientro: %s', standardSalary, rientroSalary)

    $('#nettoAnnualeS').text(Math.round(standardSalary/mensilita));
    $('#nettoAnnualeC').text(Math.round(rientroSalary/mensilita));

    const percentualeTasseS = (1 - standardSalary / ral) * 100;
    const percentualeTasseC = (1 - rientroSalary / ral) * 100;
    $('#tasseTotS').text(Math.round(percentualeTasseS));
    $('#tasseTotC').text(Math.round(percentualeTasseC));
    fillTableSalaries(standardSalary, rientroSalary, mesi);
    fillTableTaxes(ral);
    $("#body").hide();
    $("#btnIrpefInfo").unbind('click').bind('click', function () {
        $(".collapsemeIrpef").toggle('slow');
        $("#btnIrpefInfo").toggleClass('border-left');
        $(".collapsemeIrpef").toggleClass('border-left');
        $(this).find('i').toggleClass('fa-angle-down fa-angle-up')
    });
}

function valueChanged() {
    if ($("#flexCheckDefault").is(":checked")) {
        $("#dopo5anni").show("slow");
    } else {
        $("#dopo5anni").hide("slow");
    }
}
 var mensilita = 1
function getMensilita() {
   mensilita = document.querySelector('input[name="mensilita"]:checked').value;
  fillTables()  
    $("#body").show('slow');
}
function fillTableTaxes(ral) {
    $('#taxRalS').text(Math.round(ral/mensilita));
    $('#taxRalC').text(Math.round(ral/mensilita));
    const regionName = $('#region').children("option:selected").text();
    const regione = findRegionByName(regionName);
    const comune = $('#comune').children("option:selected").text();
    const comuneDef = {
        1_000_000_000: $('#customComune').val()/100,
    }
    console.log( $('#customComune').val()/100)
    const inps = calcolaInps(ral)
    $('#taxInpsS').text(Math.round(inps/mensilita));
    $('#taxInpsC').text(Math.round(inps/mensilita));


    const imponibileIrpefS = baseImponibile(ral, regione, false);
    const imponibileIrpefC = baseImponibile(ral, regione, true);

    $('#imponibileIrpefS').text(Math.round(imponibileIrpefS/mensilita));
    $('#imponibileIrpefC').text(Math.round(imponibileIrpefC/mensilita));
    const percentualeImponibile = regioneToRegola[regione] === 0.1 ? "90%" : "70%";
    $('#percentualeImponibile').text(percentualeImponibile);

    const standardIrpef = calcolaIrpef(imponibileIrpefS);
    const rientroIrpef = calcolaIrpef(imponibileIrpefC);
    $('#taxIrpefS').text(Math.round(standardIrpef/mensilita));
    $('#taxIrpefC').text(Math.round(rientroIrpef/mensilita));
    $('#TotIrpefS').text(Math.round(standardIrpef/mensilita));
    $('#TotIrpefC').text(Math.round(rientroIrpef/mensilita));

    const standardIrpefRegione = calcolaIrpefRegione(imponibileIrpefS, regione);
    const rientroIrpefRegione = calcolaIrpefRegione(imponibileIrpefC, regione);
    $('#taxRegioneS').text(Math.round(standardIrpefRegione/mensilita));
    $('#taxRegioneC').text(Math.round(rientroIrpefRegione/mensilita));

    const standardiIrpefComune = calcolaIrpefComune(imponibileIrpefS, comune, comuneDef);
    const rientroIrpefComune = calcolaIrpefComune(imponibileIrpefC, comune, comuneDef);
    $('#taxComuneS').text(Math.round(standardiIrpefComune/mensilita));
    $('#taxComuneC').text(Math.round(rientroIrpefComune/mensilita));

    const irpefTotS = standardIrpef + standardIrpefRegione + standardiIrpefComune;
    const irpefTotC = rientroIrpef + rientroIrpefRegione + rientroIrpefComune;
    $('#irpefTotS').text(Math.round(irpefTotS/mensilita));
    $('#irpefTotC').text(Math.round(irpefTotC/mensilita));

    const detrazioniTotS = calcolaDetrazioni(imponibileIrpefS);
    const detrazioniTotC = calcolaDetrazioni(imponibileIrpefC);
    $('#detrazioniTotS').text(Math.round(detrazioniTotS/mensilita));
    $('#detrazioniTotC').text(Math.round(detrazioniTotC/mensilita));

    const irpefNettoS = calcolaIrpefNetto(irpefTotS, detrazioniTotS);
    const irpefNettoC = calcolaIrpefNetto(irpefTotC, detrazioniTotC);
    $('#irpefNettoS').text(Math.round(irpefNettoS/mensilita));
    $('#irpefNettoC').text(Math.round(irpefNettoC/mensilita));

    const biCArr = findScaglioniIrpef(imponibileIrpefC, soglieIrpefToPercentualeMarginale);
    const biSArr = findScaglioniIrpef(imponibileIrpefS, soglieIrpefToPercentualeMarginale);
    fillScaglioniIrpef(biCArr, '#irpefC');
    fillScaglioniIrpef(biSArr, '#irpefS');
}


const mesi = [12, 13, 14];

function fillTableSalaries(std, rientro, mesi) {
    mesi.forEach(mese => fillTableSalary(std, rientro, mese));
}

function fillTableSalary(std, rientro, mese) {
    $('.standard' + mese).text(Math.round(std / mese));
    $('.rientro' + mese).text(Math.round(rientro / mese));
    $('.dif' + mese).text(Math.round((rientro - std) / mese));
}


function addRegionToOptions(regioni) {
    for (let regione of regioni) {
        $('#region').append($('<option>', {
            value: regione,
            text: regione
        }));
    }
}

function addComuniToOptions(regioniToComuni) {    
      //  $('#comune').html('<option disabled selected>Comune</option>');
        $('#comune').html('');
        const selectedRegion = $('#region').children("option:selected").val()

        for (const comune of regioniToComuni[findRegionByName(selectedRegion)]) {
            $('#comune').append($('<option>', {
                value: comune,
                text: comune
            }));
        }
        $("#comune:first-child").attr("selected", true);        
        fillTables();  
        $("#body").show('slow');
}


function addEditableRegionalIrpef(comuniToScaglioniIrpef) {
    $("#comune").change(() => {
        const selectedComune = $('#comune').find(":selected").val();
        if (comuniToScaglioniIrpef[selectedComune] == undefined) {
            $('#warningComune').show()
        } else {
            $('#warningComune').hide();
        }
     
        $('#submit-salary').submit();
            
    });
}

    

function findScaglioniIrpef(bi, soglieToPercentualeMarginale) {
    let tasseTotale = 0;
    let resto = bi;
    const sogliaPrecedente = 0;
    const scaglioniIrpef = [];
    for (const soglia in soglieToPercentualeMarginale) {
        const percentuale = soglieToPercentualeMarginale[soglia]
        const deltaSoglia = soglia - sogliaPrecedente;
        const used = Math.min(deltaSoglia, resto);
        resto -= used;
        tasseTotale += used * percentuale;
        scaglioniIrpef.push(used * percentuale);
    }
    return scaglioniIrpef;
}

function fillScaglioniIrpef(arr, id) {
    for (const i in arr) {
        $(id + i).text(Math.round(arr[i]));
    }

}

$(function () {
    preRender();
    fillTables();

    $("#ral").on("input", function(){
        $('#submit-salary').submit();          
    });
    $("#customComune").on("input", function(){
        $('#submit-salary').submit();          
    });
});

$(document).ready(() => $('#submit-salary').submit());

