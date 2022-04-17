const regioniToComuni = {
    'Lazio': ['Roma', 'Latina', 'Rieti', 'Viterbo', 'Frosinone'],
    'Sicilia': ['Catania', 'Palermo'],
    'Campania': ['Caserta'],
}
var soglieIrpefToPercentualeMarginale = {
    15_000 : 0.23, 
    28_000 : 0.25,
    50_000 : 0.35,
    1_000_000_000: 0.43,
}
var regioniToIrpef = {
    'Lazio': 0.02,
    'Sicilia': 0.0123,
    'Abruzzo': 0.0173,
    'Calabria': 0.0203,
    'Campania': 0.0203,
    'Sardegna': 0.0123,
    // ...
    // 'Lazio': {15_000: 0.0173, 28_000: 0.0273, 55_000: 0.0293, 75_000: 0.0323, 75_000: 3.33}
    // could be map {threashold: percentage, ...}
}
var comuniToIrpef = {
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

var soglieInpsToPercentualeMarginale = {
    47_379 : 0.0919, 
    103_055 : 0.1019,
    1_000_000_000: 0,
}

const RegolaImponibile = {
    STANDARD: 1,
    NORD: 0.3,
    MEZZOGIORNO: 0.1,
}

const regioneToRegola = {
    'Lazio': RegolaImponibile.NORD,
    'Sicilia': RegolaImponibile.MEZZOGIORNO,
    'Campania': RegolaImponibile.MEZZOGIORNO,
    // ...
}

// ral- inps - irpefTotale
function calcolaNetto(ral, regione, comune, hasAgevolazione, comuneDef){
    var inps = calcolaInps(ral);    
    var biEffettiva = baseImponibile(ral, regione, hasAgevolazione);
    var irpefTotale = calcolaIrpefTotale(biEffettiva, regione, comune, comuneDef);
    return ral - inps - irpefTotale;
}

// TODO: - inps 2 times
function baseImponibile(lordo,regione,hasAgevolazione) {
    var inps = calcolaInps(lordo);
    var imponibileStandard = lordo - inps;
    var regola = (hasAgevolazione) ? regioneToRegola[regione] : RegolaImponibile.STANDARD;
    return _calcolaBaseImponibile(imponibileStandard, regola);
}

function _calcolaBaseImponibile(imponibileStandard, regolaImponibile) {
    return imponibileStandard * regolaImponibile;
}
function calcolaInps(imponibile){
    return calcolaTassa(imponibile, soglieInpsToPercentualeMarginale);
}
function calcolaIrpef(imponibile){
    return calcolaTassa(imponibile, soglieIrpefToPercentualeMarginale);
}
function calcolaIrpefRegione(imponibile, regione){
    soglie = {1_000_000_000: regioniToIrpef[regione]}
    return calcolaTassa(imponibile, soglie);
}
function calcolaIrpefComune(imponibile, comune, comuneDef){
    soglie = comuniToIrpef[comune] ? {1_000_000_000: comuniToIrpef[comune]} : {1_000_000_000: comuneDef};
    return calcolaTassa(imponibile, soglie);
}
function calcolaIrpefTotale(imponibile, regione, comune, comuneDef){
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
        tasseTotale += used*percentuale
    }
    return tasseTotale;
}
