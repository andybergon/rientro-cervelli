function preRender() {    
$("#imponibileInfo").tooltip();
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
    $('#comune option[value="Roma"]').attr("selected", "selected");
    $("#region").change(() => addComuniToOptions(regioniToComuni));
}

function fillTables() {
    const ral = $('#ral').val();
    const regionName = $('#region').children("option:selected").text();
    const regione = findRegionByName(regionName);
    const comune = $('#comune').children("option:selected").text();
    const comuneDef = $('#customComune').val();
    console.log('Regione: %s - Comune: %s', regione, comune)

    const standardSalary = calcolaNetto(ral, regione, comune, false, comuneDef);
    const rientroSalary = calcolaNetto(ral, regione, comune, true, comuneDef);
    console.log('Std: %s - Rientro: %s', standardSalary, rientroSalary)

    $('#nettoAnnualeS').text(Math.round(standardSalary));
    $('#nettoAnnualeC').text(Math.round(rientroSalary));

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

function fillTableTaxes(ral) {
    $('#taxRalS').text(ral);
    $('#taxRalC').text(ral);
    const regionName = $('#region').children("option:selected").text();
    const regione = findRegionByName(regionName);
    const comune = $('#comune').children("option:selected").text();
    const comuneDef = $('#customComune').val();
    const inps = calcolaInps(ral)
    $('#taxInpsS').text(Math.round(inps));
    $('#taxInpsC').text(Math.round(inps));


    const imponibileIrpefS = baseImponibile(ral, regione, false);
    const imponibileIrpefC = baseImponibile(ral, regione, true);

    $('#imponibileIrpefS').text(Math.round(imponibileIrpefS));
    $('#imponibileIrpefC').text(Math.round(imponibileIrpefC));
    const percentualeImponibile = regioneToRegola[regione] === 0.1 ? "90%" : "70%";
    $('#percentualeImponibile').text(percentualeImponibile);

    const standardIrpef = calcolaIrpef(imponibileIrpefS);
    const rientroIrpef = calcolaIrpef(imponibileIrpefC);
    $('#taxIrpefS').text(Math.round(standardIrpef));
    $('#taxIrpefC').text(Math.round(rientroIrpef));
    $('#TotIrpefS').text(Math.round(standardIrpef));
    $('#TotIrpefC').text(Math.round(rientroIrpef));

    const standardIrpefRegione = calcolaIrpefRegione(imponibileIrpefS, regione);
    const rientroIrpefRegione = calcolaIrpefRegione(imponibileIrpefC, regione);
    $('#taxRegioneS').text(Math.round(standardIrpefRegione));
    $('#taxRegioneC').text(Math.round(rientroIrpefRegione));

    const standardiIrpefComune = calcolaIrpefComune(imponibileIrpefS, comune, comuneDef);
    const rientroIrpefComune = calcolaIrpefComune(imponibileIrpefC, comune, comuneDef);
    $('#taxComuneS').text(Math.round(standardiIrpefComune));
    $('#taxComuneC').text(Math.round(rientroIrpefComune));

    const irpefTotS = standardIrpef + standardIrpefRegione + standardiIrpefComune;
    const irpefTotC = rientroIrpef + rientroIrpefRegione + rientroIrpefComune;
    $('#irpefTotS').text(Math.round(irpefTotS));
    $('#irpefTotC').text(Math.round(irpefTotC));

    const detrazioniTotS = calcolaDetrazioni(imponibileIrpefS);
    const detrazioniTotC = calcolaDetrazioni(imponibileIrpefC);
    $('#detrazioniTotS').text(Math.round(detrazioniTotS));
    $('#detrazioniTotC').text(Math.round(detrazioniTotC));

    const irpefNettoS = calcolaIrpefNetto(irpefTotS, detrazioniTotS);
    const irpefNettoC = calcolaIrpefNetto(irpefTotC, detrazioniTotC);
    $('#irpefNettoS').text(Math.round(irpefNettoS));
    $('#irpefNettoC').text(Math.round(irpefNettoC));

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
        $('#comune').html('<option disabled selected>Comune</option>');
        const selectedRegion = $('#region').children("option:selected").val()

        for (const comune of regioniToComuni[findRegionByName(selectedRegion)]) {
            $('#comune').append($('<option>', {
                value: comune,
                text: comune
            }));
        }
}


function addEditableRegionalIrpef(comuniToScaglioniIrpef) {
    $("#comune").change(() => {
        const selectedComune = $('#comune').children("option:selected").val();
        if (comuniToScaglioniIrpef.selectedComune == undefined) {
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

