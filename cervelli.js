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


    const biS = baseImponibile(ral, regione, false);
    const biC = baseImponibile(ral, regione, true);

    $('#imponibileIrpefS').text(Math.round(biS));
    $('#imponibileIrpefC').text(Math.round(biC));
    const PercentualeImponibile = regioneToRegola[regione] === 0.1 ? "90%" : "70%";
    $('#PercentualeImponibile').text(PercentualeImponibile);

    const standardiIrpef = calcolaIrpef(biS);
    const rientroIrpef = calcolaIrpef(biC);
    $('#taxIrpefS').text(Math.round(standardiIrpef));
    $('#taxIrpefC').text(Math.round(rientroIrpef));
    $('#TotIrpefS').text(Math.round(standardiIrpef));
    $('#TotIrpefC').text(Math.round(rientroIrpef));

    const standardiIrpefRegione = calcolaIrpefRegione(biS, regione);
    const rientroIrpefRegione = calcolaIrpefRegione(biC, regione);
    $('#taxRegioneS').text(Math.round(standardiIrpefRegione));
    $('#taxRegioneC').text(Math.round(rientroIrpefRegione));

    const standardiIrpefComune = calcolaIrpefComune(biS, comune, comuneDef);
    const rientroIrpefComune = calcolaIrpefComune(biC, comune, comuneDef);
    $('#taxComuneS').text(Math.round(standardiIrpefComune));
    $('#taxComuneC').text(Math.round(rientroIrpefComune));


    const irpefTotS = standardiIrpef + standardiIrpefRegione + standardiIrpefComune;
    const irpefTotC = rientroIrpef + rientroIrpefRegione + rientroIrpefComune;
    $('#irpefTotS').text(Math.round(irpefTotS));
    $('#irpefTotC').text(Math.round(irpefTotC));

    const biCArr = findScaglioniIrpef(biC, soglieIrpefToPercentualeMarginale);
    const biSArr = findScaglioniIrpef(biS, soglieIrpefToPercentualeMarginale);
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
        const selectedRegion = $('#region').children("option:selected").val()

        for (const comune of regioniToComuni[findRegionByName(selectedRegion)]) {
            $('#comune').append($('<option>', {
                value: comune,
                text: comune
            }));
        }
    });
}

function addEditableRegionalIrpef(comuniToIrpef) {
    $("#comune").change(() => {
        const selectedComune = $('#comune').children("option:selected").val();
        if (comuniToIrpef[selectedComune] == undefined) {
            $('#warningComune').show()
        } else {
            $('#warningComune').hide();
        }
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
});
$(document).ready(() => $('#submit-salary').submit());
