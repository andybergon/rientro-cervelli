const Regione = {
    ABRUZZO: "Abruzzo",
    BASILICATA: "Basilicata",
    CALABRIA: "Calabria",
    CAMPANIA: "Campania",
    EMILIA_ROMAGNA: "Emilia-Romagna",
    FRIULI_VENEZIA_GIULIA: "Friuli Venezia Giulia",
    LAZIO: "Lazio",
    LIGURIA: "Liguria",
    LOMBARDIA: "Lombardia",
    MARCHE: "Marche",
    MOLISE: "Molise",
    PIEMONTE: "Piemonte",
    PUGLIA: "Puglia",
    SARDEGNA: "Sardegna",
    SICILIA: "Sicilia",
    TOSCANA: "Toscana",
    TRENTINO_ALTO_ADIGE: "Trentino-Alto Adige",
    UMBRIA: "Umbria",
    VALLE_D_AOSTA: "Valle d'Aosta",
    VENETO: "Veneto",
}
const findRegionByName = (regionString) => Object.keys(Regione).find(key => Regione[key] === regionString);

const nomiRegioni = Object.keys(Regione).map(key => Regione[key]);

const regioniToComuni = {
    ABRUZZO: ["PLACEHOLDER"],
    BASILICATA: ["PLACEHOLDER"],
    CALABRIA: ["PLACEHOLDER"],
    CAMPANIA: ['Caserta'],
    EMILIA_ROMAGNA: ["PLACEHOLDER"],
    FRIULI_VENEZIA_GIULIA: ["PLACEHOLDER"],
    LAZIO: ['Roma', 'Latina', 'Rieti', 'Viterbo', 'Frosinone'],
    LIGURIA: ["PLACEHOLDER"],
    LOMBARDIA: ["PLACEHOLDER"],
    MARCHE: ["PLACEHOLDER"],
    MOLISE: ["PLACEHOLDER"],
    PIEMONTE: ["PLACEHOLDER"],
    PUGLIA: ["PLACEHOLDER"],
    SARDEGNA: ["PLACEHOLDER"],
    SICILIA: ['Catania', 'Palermo'],
    TOSCANA: ["PLACEHOLDER"],
    TRENTINO_ALTO_ADIGE: ["PLACEHOLDER"],
    UMBRIA: ["PLACEHOLDER"],
    VALLE_D_AOSTA: ["PLACEHOLDER"],
    VENETO: ["PLACEHOLDER"],
}

const regioniToScaglioniIrpef = {
    ABRUZZO: {
        1_000_000_000: 0.0173,
    },
    BASILICATA: {
        55_000: 0.0123,
        75_000: 0.0173,
        1_000_000_000: 0.0233,
    },
    // "Regione"
    BOLZANO: {
        35_000: 0,
        75_000: 0.0123,
        1_000_000_000: 0.0173,
    },
    CALABRIA: {
        1_000_000_000: 0.0203,
    },
    CAMPANIA: {
        1_000_000_000: 0.0203,
    },
    EMILIA_ROMAGNA: {
        15_000: 0.0133,
        28_000: 0.0193,
        55_000: 0.0203,
        75_000: 0.0223,
        1_000_000_000: 0.0233,
    },
    FRIULI_VENEZIA_GIULIA: {
        15_000: 0.007,
        1_000_000_000: 0.0123,
    },
    // ~ Lazio: 1.73% flat under 35k
    LAZIO: {
        15_000: 0.0173,
        28_000: 0.0273,
        55_000: 0.0293,
        75_000: 0.0323,
        1_000_000_000: 0.0333,
    },
    // TODO: liguria, lombardia, marche, molise, piemonte, puglia
    SARDEGNA: {
        1_000_000_000: 0.0123
    },
    SICILIA: {
        1_000_000_000: 0.0123
    },
    TOSCANA: {
        15_000: 0.0142,
        28_000: 0.0143,
        55_000: 0.0168,
        75_000: 0.0172,
        1_000_000_000: 0.0173,
    },
    // "Regione"
    TRENTO: {
        15_000: 0.0123, // ~0
        28_000: 0.0123,
        55_000: 0.0123,
        75_000: 0.0173,
        1_000_000_000: 0.0173,
    },
    UMBRIA: {
        15_000: 0.0123,
        28_000: 0.0163,
        55_000: 0.0168,
        75_000: 0.0173,
        1_000_000_000: 0.0183,
    },
    VALLE_D_AOSTA: {
        1_000_000_000: 0.0123
    },
    VENETO: {
        1_000_000_000: 0.0123
    }
}

const comuniToIrpef = {
    'Roma': 0.009,
    'Rieti': 0.0076,
    'Viterbo': 0.008,
    'Frosinone': 0.008,
    'Catania': 0.008,
    'Palermo': 0.008,
    'Latina': undefined,
    'Caserta': 0.008,
    // ...
    // could be map {threashold: percentage, ...}
}

const soglieIrpefToPercentualeMarginale = {
    15_000: 0.23,
    28_000: 0.25,
    50_000: 0.35,
    1_000_000_000: 0.43,
}

const soglieInpsToPercentualeMarginale = {
    47_379: 0.0919,
    103_055: 0.1019,
    1_000_000_000: 0,
}

const RegolaImponibile = {
    STANDARD: 1,
    NORD: 0.3,
    MEZZOGIORNO: 0.1,
}

const regioneToRegola = {
    ABRUZZO: RegolaImponibile.MEZZOGIORNO,
    BASILICATA: RegolaImponibile.MEZZOGIORNO,
    CALABRIA: RegolaImponibile.MEZZOGIORNO,
    CAMPANIA: RegolaImponibile.MEZZOGIORNO,
    EMILIA_ROMAGNA: RegolaImponibile.NORD,
    FRIULI_VENEZIA_GIULIA: RegolaImponibile.NORD,
    LAZIO: RegolaImponibile.NORD,
    LIGURIA: RegolaImponibile.NORD,
    LOMBARDIA: RegolaImponibile.NORD,
    MARCHE: RegolaImponibile.NORD,
    MOLISE: RegolaImponibile.MEZZOGIORNO,
    PIEMONTE: RegolaImponibile.NORD,
    PUGLIA: RegolaImponibile.MEZZOGIORNO,
    SARDEGNA: RegolaImponibile.MEZZOGIORNO,
    SICILIA: RegolaImponibile.MEZZOGIORNO,
    TOSCANA: RegolaImponibile.NORD,
    TRENTINO_ALTO_ADIGE: RegolaImponibile.NORD,
    UMBRIA: RegolaImponibile.NORD,
    VALLE_D_AOSTA: RegolaImponibile.NORD,
    VENETO: RegolaImponibile.NORD,
}

// ral - inps - irpefTotale
function calcolaNetto(ral, regione, comune, hasAgevolazione, comuneDef) {
    var inps = calcolaInps(ral);
    var biEffettiva = baseImponibile(ral, regione, hasAgevolazione);
    var irpefTotale = calcolaIrpefTotale(biEffettiva, regione, comune, comuneDef);
    return ral - inps - irpefTotale;
}

// TODO: - inps 2 times
function baseImponibile(lordo, regione, hasAgevolazione) {
    var inps = calcolaInps(lordo);
    var imponibileStandard = lordo - inps;
    var regola = (hasAgevolazione) ? regioneToRegola[regione] : RegolaImponibile.STANDARD;
    return _calcolaBaseImponibile(imponibileStandard, regola);
}

function _calcolaBaseImponibile(imponibileStandard, regolaImponibile) {
    return imponibileStandard * regolaImponibile;
}

function calcolaInps(imponibile) {
    return calcolaTassa(imponibile, soglieInpsToPercentualeMarginale);
}

function calcolaIrpef(imponibile) {
    return calcolaTassa(imponibile, soglieIrpefToPercentualeMarginale);
}

function calcolaIrpefRegione(imponibile, regione) {
    return calcolaTassa(imponibile, regioniToScaglioniIrpef[regione]);
}

function calcolaIrpefComune(imponibile, comune, comuneDef) {
    let soglie = {1_000_000_000: comuniToIrpef[comune] ? comuniToIrpef[comune] : comuneDef};
    return calcolaTassa(imponibile, soglie);
}

function calcolaIrpefTotale(imponibile, regione, comune, comuneDef) {
    return calcolaTassa(imponibile, soglieIrpefToPercentualeMarginale) +
        calcolaIrpefRegione(imponibile, regione) +
        calcolaIrpefComune(imponibile, comune, comuneDef);
}

function calcolaTassa(lordo, soglieToPercentualeMarginale) {
    var tasseTotale = 0;
    var resto = lordo;
    var sogliaPrecedente = 0;
    for (const soglia in soglieToPercentualeMarginale) {
        var percentuale = soglieToPercentualeMarginale[soglia]
        var deltaSoglia = soglia - sogliaPrecedente;
        var used = Math.min(deltaSoglia, resto);
        resto -= used;
        tasseTotale += used * percentuale
    }
    return tasseTotale;
}
