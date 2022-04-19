function preRender() {
    $("#imponibileInfo").tooltip();
    addRegionToOptions(nomiRegioni);
    addComuniToOptions(regioniToComuni);
    addEditableRegionalIrpef(comuniToIrpef);
    $(document).on('submit', '#submit-salary', () => {
        $("#dopo5anni").hide();
        fillTables();
        $("#body").show('slow');
        return false;
    });
}

function fillTables() {
    const ral = $('#ral').val();
    const regionName = $('#region').children("option:selected").text();
    const regione = findRegionByName(regionName);
    const comune = $('#comune').children("option:selected").text();
    const comuneDef = $('#customComune').val();

    const standardSalary = calcolaNetto(ral, regione, comune, false, comuneDef);
    console.log('standard ' + standardSalary)
    console.log(ral, regione, comune, comuneDef);
    const rientroSalary = calcolaNetto(ral, regione, comune, true, comuneDef);
    console.log('rientro ' + rientroSalary)
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
    var regione = $('#region').children("option:selected").text();
    var comune = $('#comune').children("option:selected").text();
    let comuneDef = $('#customComune').val();
    let inps = calcolaInps(ral)
    $('#taxInpsS').text(Math.round(inps));
    $('#taxInpsC').text(Math.round(inps));


    let biS = baseImponibile(ral, regione, false);
    let biC = baseImponibile(ral, regione, true);
    $('#imponibileIrpefS').text(Math.round(biS));
    $('#imponibileIrpefC').text(Math.round(biC));
    let PercentualeImponibile = regioneToRegola[regione] == 0.1 ? "90%" : "70%";
    $('#PercentualeImponibile').text(PercentualeImponibile);

    let standardiIrpef = calcolaIrpef(biS);
    let rientroIrpef = calcolaIrpef(biC);
    $('#taxIrpefS').text(Math.round(standardiIrpef));
    $('#taxIrpefC').text(Math.round(rientroIrpef));
    $('#TotIrpefS').text(Math.round(standardiIrpef));
    $('#TotIrpefC').text(Math.round(rientroIrpef));

    let standardiIrpefRegione = calcolaIrpefRegione(biS, regione);
    let rientroIrpefRegione = calcolaIrpefRegione(biC, regione);
    $('#taxRegioneS').text(Math.round(standardiIrpefRegione));
    $('#taxRegioneC').text(Math.round(rientroIrpefRegione));

    let standardiIrpefComune = calcolaIrpefComune(biS, comune, comuneDef);
    let rientroIrpefComune = calcolaIrpefComune(biC, comune, comuneDef);
    $('#taxComuneS').text(Math.round(standardiIrpefComune));
    $('#taxComuneC').text(Math.round(rientroIrpefComune));


    var irpefTotS = standardiIrpef + standardiIrpefRegione + standardiIrpefComune;
    var irpefTotC = rientroIrpef + rientroIrpefRegione + rientroIrpefComune;
    $('#irpefTotS').text(Math.round(irpefTotS));
    $('#irpefTotC').text(Math.round(irpefTotC));

    var biCArr = findScaglioniIrpef(biC, soglieIrpefToPercentualeMarginale);
    var biSArr = findScaglioniIrpef(biS, soglieIrpefToPercentualeMarginale);
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
    $("#region").change(() => {
        $('#comune').html('<option disabled selected>Comune</option>');
        let selectedRegion = $('#region').children("option:selected").val()

        for (let comune of regioniToComuni[findRegionByName(selectedRegion)]) {
            $('#comune').append($('<option>', {
                value: comune,
                text: comune
            }));
        }
    });
}

function addEditableRegionalIrpef(comuniToIrpef) {
    $("#comune").change(() => {
        let selectedComune = $('#comune').children("option:selected").val();
        if (comuniToIrpef[selectedComune] == undefined) {
            $('#warningComune').show()
        } else {
            $('#warningComune').hide();
        }
    });
}

function findScaglioniIrpef(bi, soglieToPercentualeMarginale) {
    var tasseTotale = 0;
    var resto = bi;
    var sogliaPrecedente = 0;
    var scaglioniIrpef = [];
    for (const soglia in soglieToPercentualeMarginale) {
        var percentuale = soglieToPercentualeMarginale[soglia]
        var deltaSoglia = soglia - sogliaPrecedente;
        var used = Math.min(deltaSoglia, resto);
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
});
$(document).ready(() => $('#submit-salary').submit());
