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
    ABRUZZO: ["L'Aquila", 'Chieti', 'Pescara', 'Teramo'],
    BASILICATA: ['Potenza', 'Matera'],
    CALABRIA: ['Catanzaro', 'Cosenza', 'Crotone', 'Reggio Calabria', 'Vibo Valentia'],
    CAMPANIA: ['Napoli', 'Avellino', 'Benevento', 'Caserta', 'Salerno'],
    EMILIA_ROMAGNA: ['Bologna', 'Cesena', 'Ferrara', 'Forlì', 'Modena', 'Parma', 'Piacenza', 'Ravenna', 'Reggio Emilia', 'Rimini'],
    FRIULI_VENEZIA_GIULIA: ['Trieste', 'Gorizia', 'Pordenone', 'Udine'],
    LAZIO: ['Roma', 'Frosinone', 'Latina', 'Rieti', 'Viterbo'],
    LIGURIA: ['Genova', 'Imperia', 'La Spezia', 'Savona'],
    LOMBARDIA: ['Milano', 'Bergamo', 'Brescia', 'Como', 'Cremona', 'Lecco', 'Lodi', 'Mantova', 'Monza e Brianza', 'Pavia', 'Sondrio', 'Varese'],
    MARCHE: ['Ancona', 'Ascoli Piceno', 'Fermo', 'Macerata', 'Pesaro e Urbino'],
    MOLISE: ['Campobasso', 'Isernia'],
    PIEMONTE: ['Torino', 'Alessandria', 'Asti', 'Biella', 'Cuneo', 'Novara', 'Verbano-Cusio-Ossola', 'Vercelli'],
    PUGLIA: ['Bari', 'Andria', 'Barletta', 'Brindisi', 'Lecce', 'Foggia', 'Taranto', 'Trani'],
    SARDEGNA: ['Cagliari', 'Nuoro', 'Oristano', 'Sassari', 'Sud Sardegna'],
    SICILIA: ['Palermo', 'Agrigento', 'Caltanissetta', 'Catania', 'Enna', 'Messina', 'Ragusa', 'Siracusa', 'Trapani'],
    TOSCANA: ['Firenze', 'Arezzo', 'Carrara', 'Grosseto', 'Livorno', 'Lucca', 'Massa', 'Pisa', 'Pistoia', 'Prato', 'Siena'],
    TRENTINO_ALTO_ADIGE: ['Trento', 'Bolzano'],
    UMBRIA: ['Perugia', 'Terni'],
    VALLE_D_AOSTA: ["Aosta"],
    VENETO: ['Venezia', 'Belluno', 'Padova', 'Rovigo', 'Treviso', 'Verona', 'Vicenza'],
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
    BOLZANO: { // "Regione"
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
    LAZIO: { // 1.73% flat under 35k
        15_000: 0.0173,
        28_000: 0.0273,
        55_000: 0.0293,
        75_000: 0.0323,
        1_000_000_000: 0.0333,
    },
    LIGURIA: {
        15_000: 0.0123,
        28_000: 0.0181,
        55_000: 0.0231,
        75_000: 0.0232,
        1_000_000_000: 0.0233,
    },
    LOMBARDIA: {
        15_000: 0.0123,
        28_000: 0.0158,
        55_000: 0.0172,
        75_000: 0.0173,
        1_000_000_000: 0.0174,
    },
    MARCHE: {
        15_000: 0.0123,
        28_000: 0.0153,
        55_000: 0.0170,
        75_000: 0.0172,
        1_000_000_000: 0.0173,
    },
    MOLISE: {
        15_000: 0.0203,
        28_000: 0.0223,
        55_000: 0.0243,
        75_000: 0.0253,
        1_000_000_000: 0.0263,
    },
    PIEMONTE: {
        15_000: 0.0162,
        28_000: 0.0213,
        55_000: 0.0275,
        75_000: 0.0332,
        1_000_000_000: 0.0333,
    },
    PUGLIA: {
        15_000: 0.0133,
        28_000: 0.0143,
        55_000: 0.0171,
        75_000: 0.0172,
        1_000_000_000: 0.0173,
    },
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
    TRENTO: { // "Regione"
        15_000: 0.0123, // ~0 contando detrazione
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

const comuniToScaglioniIrpef = {
    'Chieti': {
        15_000: 0,
        1_000_000_000: 0.008,
    },
    "L'Aquila": {
        15_000: 0,
        1_000_000_000: 0.006,
    },
    'Pescara': {
        10_000: 0,
        1_000_000_000: 0.008,
    }, 
    'Teramo': {
        10_000: 0,
        1_000_000_000: 0.008,
    },
    'Matera': {
        10_000: 0,
        1_000_000_000: 0.008,
    },
    'Potenza': {
        1_000_000_000: 0.008,
    },
    'Catanzaro': {
        1_000_000_000: 0.008,
    },
    'Cosenza': {
        1_000_000_000: 0.008,
    },
    'Crotone': {
        1_000_000_000: 0.008,
    },
    'Reggio Calabria': {
        1_000_000_000: 0.008,
    },
    'Vibo Valentia': {
        7_000: 0,
        1_000_000_000: 0.008,
    },
    'Caserta': {
        1_000_000_000: 0.008,
    },
    'Avellino': {
        15_000: 0,
        1_000_000_000: 0.008,
    },
    'Benevento': {
        1_000_000_000: 0.008,
    },
    'Napoli': {
        8_000: 0,
        1_000_000_000: 0.008,
    },
    'Salerno': {
        10_000: 0,
        1_000_000_000: 0.008,
    },
    'Bologna': {
        15_000: 0,
        1_000_000_000: 0.008,
    },
    'Ferrara': {
        15_000: 0.006,
        28_000: 0.007,
        50_000: 0.0075,
        1_000_000_000: 0.008,
    },
    'Forlì': {
        15_000: 0,
        28_000: 0.0055,
        50_000: 0.0078,
        1_000_000_000: 0.0079,
    },
    'Cesena': {
        10_000: 0,
        15_000: 0.0039,
        28_000: 0.004,
        55_000: 0.0055,
        78_000: 0.0078,
        1_000_000_000: 0.008,
    },
    'Modena': {
        15_000: 0.005,
        28_000: 0.0064,
        50_000: 0.0075,
        1_000_000_000: 0.008,
    },
    'Parma': {
        12_000: 0,
        1_000_000_000: 0.008,
    },
    'Piacenza': {
        11_000: 0,
        15_000: 0.0042,
        28_000: 0.0052,
        50_000: 0.0068,
        1_000_000_000: 0.008,
    },
//0	Esenzione per soggetti facenti parte di un nucleo familiare che da attestazione ISEE risulta composto da almeno 5 componenti e risulta avere un reddito ISEE non superiore a 15.000,00 euro
    'Ravenna': {
        15_000: 0.0055,
        28_000: 0.0057,
        50_000: 0.0059,
        1_000_000_000: 0.008,
    },
    'Reggio Emilia': {
       // 15_000: 0,
        15_000: 0.0069,
        28_000: 0.0071,
        50_000: 0.0078,
        1_000_000_000: 0.008,
    },
//	Reggio emilia: 0	Esenzione per redditi imponibili fino a euro 15000.00
//0,69	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,71	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
    'Rimini': {
        //16_000: 0,
        15_000: 0.0055,
        28_000: 0.0066,
        50_000: 0.0078,
        1_000_000_000: 0.008,
    },
//	Rimini: 0	Esenzione per redditi imponibili fino a euro 16000.00
//0,55	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,66	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00

    'Gorizia': {
        1_000_000_000: 0,
    },
    'Pordenone': {
        15_000: 0,
        1_000_000_000: 0.006,
    },
    'Trieste': {
        12_500: 0,
        1_000_000_000: 0.006,
    },
    'Udine': {
        1_000_000_000: 0.002,
    },
    'Roma': {
        12_000: 0,
        1_000_000_000: 0.009,
    },
    'Rieti': {
        1_000_000_000: 0.008,
    },
    'Viterbo': {
        1_000_000_000: 0.0076,
    },
    'Frosinone': {
        1_000_000_000: 0.008,
    },
    'Latina': {
        7_999: 0,
        1_000_000_000: 0.008,
    },
    'Genova': {
        10_000: 0,
        1_000_000_000: 0.008,
    },
    'Imperia': {
        1_000_000_000: 0.008,
    },
    'La Spezia': {
        15_000: 0,
        1_000_000_000: 0.006,
    },
    'Savona': {
        1_000_000_000: 0.008,
    },

    'Bergamo': {
        1_000_000_000: 0.008,
    },
    'Brescia': {
        13_000: 0,
        1_000_000_000: 0.008,
    },
    'Como': {
        15_000: 0,
        1_000_000_000: 0.008,
    },
    'Cremona': {
        12_000: 0,
        1_000_000_000: 0.008,
    },
    'Lecco': {
      //  15_000: 0,
        15_000: 0.0025,
        28_000: 0.004,
        50_000: 0.006,
        1_000_000_000: 0.008,
    },
//Lecco:	0	Esenzione per redditi imponibili fino a euro 15000.00
//0,25	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,4	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,6	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
    'Lodi': {
      //  15_000: 0,
        15_000: 0.006,
        28_000: 0.007,
        50_000: 0.0075,
        1_000_000_000: 0.0075,
    },
//	Lodi: 0	Esenzione per redditi imponibili fino a euro 15000.00
//0,6	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,7	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,75	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,75	Applicabile a scaglione di reddito oltre euro 50.000,00
    'Mantova': {
       // 22_000: 0,
        15_000: 0.0038,
        28_000: 0.0039,
        50_000: 0.0062,
        1_000_000_000: 0.008,
    },
//	Mantova: 0	Esenzione per redditi imponibili fino a euro 22000.00
//0,38	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,39	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,62	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
    'Milano': {
        23_000: 0,
        1_000_000_000: 0.008,
    },
    'Monza e Brianza': {
        12_000: 0,
        1_000_000_000: 0.008,
    },
    'Pavia': {
      //  16_000: 0,
        15_000: 0.007,
        28_000: 0.0077,
        55_000: 0.0078,        
        75_000: 0.0079,
        1_000_000_000: 0.008,
    },
//	Pavia: 0	Esenzione per redditi imponibili fino a euro 16000.00
//0,7	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,77	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 55.000,00
//0,79	Applicabile a scaglione di reddito da euro 55.000,01 fino a euro 75.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 75.000,00
    'Sondrio': {
        99_999: 0,
        1_000_000_000: 0.008,
    },
    'Varese': {
        8_000: 0,
        1_000_000_000: 0.008,
    },
    'Ancona': {
        1_000_000_000: 0.008,
    },
    'Ascoli Piceno': {
        8_500: 0,
        1_000_000_000: 0.008,
    },
    'Fermo': {
        9_000: 0,
        1_000_000_000: 0.008,
    },
    'Macerata': {
        8_499: 0,
        1_000_000_000: 0.008,
    },
    'Pesaro': {
        9_000: 0,
        15_000: 0.006,
        28_000: 0.0061,
        50_000: 0.0078,
        1_000_000_000: 0.008,
    },
    'Urbino': {
        8_000: 0,
        1_000_000_000: 0.008,
    },

    'Campobasso': {
        1_000_000_000: 0.008,
    },
    'Isernia': {
        1_000_000_000: 0.008,
    },
    'Alessandria': {
        1_000_000_000: 0.008,
    },
    'Asti': {
        7_500: 0,
        15_000: 0.0054,
        28_000: 0.0066,
        50_000: 0.0078,
        1_000_000_000: 0.0079,
    },
    'Biella': {
        1_000_000_000: 0.008,
    },
    'Cuneo': {
        15_000: 0.007,
        28_000: 0.0073,
        55_000: 0.0076,
        75_000: 0.0079,
        1_000_000_000: 0.0079,
    },
    'Novara': {
        12_500: 0,
        1_000_000_000: 0.008,
    },
    'Torino': {
        11_790: 0,
        15_000: 0.008,
        28_000: 0.008,
        50_000: 0.011,
        1_000_000_000: 0.012,
    },
    'Verbano-Cusio-Ossola': undefined,
    'Vercelli': {
        16_000: 0,
        15_000: 0.007,
        28_000: 0.008,
        50_000: 0.008,
        1_000_000_000: 0.008,
    },
    'Bari': {
        15_000: 0,
        1_000_000_000: 0.008,
    },
    'Barletta': {
        9_000: 0,
        15_000: 0.005,
        28_000: 0.006,
        55_000: 0.007,
        75_000: 0.0079,
        1_000_000_000: 0.008,
    },
    'Andria': {
        7_500: 0,
        1_000_000_000: 0.008,
    },
    'Trani': {
        7_999: 0,
        15_000: 0.007,
        28_000: 0.0075,
        50_000: 0.008,
        1_000_000_000: 0.008,
    },
    'Brindisi': {
        10_000: 0,
        1_000_000_000: 0.008,
    },
    'Lecce': {
        1_000_000_000: 0.008,
    },
//	Lecce: 0	Esenzione per REDDITO COMPLESSIVO AI FINI IRPEF NON SUPERIORE A EURO 12.500,00
//0	Esenzione per LE FAMIGLIE NEL CUI NUCLEO FAMILIARE VI E' PERSONA PORTATORE DI HANDICAP CON ASSEGNO DI ACCOMPAGNAMENTO FINO A UN REDDITO COMPLESSIVO DI EURO 28000,00. SI INTENDE REDDITO COMPLESSIVO FAMILIARE ESCLUSO ASSEGNO DI ACCOMPAGNAMENTO
    'Foggia': {
        1_000_000_000: 0.008,
    },
    'Taranto': {
        15_000: 0,
        1_000_000_000: 0.008,
    },

    'Cagliari': {
        10_000: 0,
        15_000: 0.0066,
        28_000: 0.0072,
        55_000: 0.0078,
        75_000: 0.0079,
        1_000_000_000: 0.008,
    },
    'Nuoro': {
        7_999: 0,
        15_000: 0.0045,
        28_000: 0.0055,
        50_000: 0.0065,
        1_000_000_000: 0.008,
    },
    'Oristano': {
        10_000: 0,
        15_000: 0.0069,
        28_000: 0.0072,
        50_000: 0.0076,
        1_000_000_000: 0.008,
    },
    'Sassari': {
        15_000: 0,
        1_000_000_000: 0.008,
    },
    'Sud Sardegna': undefined,
    'Catania': {
        7_500: 0,
        1_000_000_000: 0.008,
    },
    'Palermo': {
        1_000_000_000: 0.008,
    },
    'Agrigento': {
        7_499: 0,
        1_000_000_000: 0.008,
    },
    'Caltanissetta': {
        1_000_000_000: 0.008,
    },
    'Enna': {
        22_999: 0,
        1_000_000_000: 0.008,
    },
    'Messina': {
        1_000_000_000: 0.008,
    },
    'Ragusa': {
        10_000: 0,
        15_000: 0.006,
        28_000: 0.007,
        50_000: 0.0075,
        1_000_000_000: 0.008,
    },
    'Siracusa': {
        1_000_000_000: 0.008,
    },
    'Trapani': {
        10_000: 0,
        1_000_000_000: 0.008,
    },
    'Arezzo': {
        13_500: 0,
        15_000: 0.0048,
        28_000: 0.0049,
        50_000: 0.0078,
        1_000_000_000: 0.0079,
    },
    'Firenze': {
        25_000: 0,
        1_000_000_000: 0.002,
    },
    'Grosseto': {
        1_000_000_000: 0.008,
    },
    'Livorno': {
        1_000_000_000: 0.008,
    },
    'Lucca': {
        14_500: 0,
        15_000: 0.0058,
        28_000: 0.006,
        55_000: 0.0074,
        75_000: 0.0079,
        1_000_000_000: 0.008,
    },
    'Massa': {
        12_000: 0,
        15_000: 0.0063,
        28_000: 0.0068,
        50_000: 0.0071,
        1_000_000_000: 0.008,
    },
    'Carrara': {
        10_000: 0,
        1_000_000_000: 0.002,
    },
    'Pisa': {
        12_000: 0,
        15_000: 0.005,
        28_000: 0.006,
        50_000: 0.007,
        1_000_000_000: 0.008,
    },
//	Pisa; 0	Esenzione per i contribuenti in possesso di soli redditi da lavoro dipendente e/o da pensione fino a euro 14.000,00
//0	Esenzione per gli altri contribuenti in possesso di redditi fino a euro 12.000,00
//0,5	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,6	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,7	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
    'Pistoia': {
        15_000: 0,
        1_000_000_000: 0.008,
    },
    'Prato': {
        1_000_000_000: 0.005,
    },
    'Siena': undefined,
    'Bolzano': {
        1_000_000_000: 0,
    },
    'Trento': {
        1_000_000_000: 0,
    },

    'Perugia': {
        // 12_500: 0,
        1_000_000_000: 0.008,
    }, // Esenzione per i contribuenti con reddito complessivo, ai sensi dell'art. 8 del D.P.R. n. 917/1986 (TUIR), inferiore/uguale ad euro 12.500,00
    'Terni': {
        12_500: 0,
        1_000_000_000: 0.008,
    },
    'Aosta': {
        9_999: 0,
        1_000_000_000: 0.008,
    },
    'Belluno': {
        10_000: 0,
        15_000: 0.0072,
        28_000: 0.0073,
        50_000: 0.0078,
        1_000_000_000: 0.008,
    },
    'Padova': {
        15_000: 0,
        1_000_000_000: 0.007,
    },
    'Rovigo': {
        10_000: 0,
        1_000_000_000: 0.008,
    },
    'Treviso': {
   // 15_000: 0,
    15_000: 0.006,
    28_000: 0.0065,
    55_000: 0.007,
    75_000: 0.0075,
    1_000_000_000: 0.008,
    },
//	Treviso: 0	Esenzione per redditi imponibili fino a euro 15000.00
//0,6	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,65	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,7	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 55.000,00
//0,75	Applicabile a scaglione di reddito da euro 55.000,01 fino a euro 75.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 75.000,00
    'Venezia': {
        10_000: 0,
        1_000_000_000: 0.008,
    },
    'Verona': {
        10_000: 0,
        1_000_000_000: 0.008,
    },
    'Vicenza': {
       // 15_000: 0,
        15_000: 0.006,
        28_000: 0.0065,
        50_000: 0.007,
        1_000_000_000: 0.0075,
    },
//   Vicenza: 0	Esenzione per redditi imponibili fino a euro 15000.00
//0,6	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,65	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,7	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,75	Applicabile a scaglione di reddito oltre euro 50.000,00
}

const soglieIrpefToPercentualeMarginale = {
    15_000: 0.23,
    28_000: 0.25,
    50_000: 0.35,
    1_000_000_000: 0.43,
}

const soglieInpsToPercentualeMarginale = {
    47_379: 0.0919, // 9.19% generalmente, 9.49% cassa integrazione guadagni straordinaria | ...
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

function calcolaNetto(ral, regione, comune, hasAgevolazione, comuneDef) {
    const inps = calcolaInps(ral);
    const baseImponibileEffettiva = baseImponibile(ral, regione, hasAgevolazione);
    const irpefTotale = calcolaIrpefTotale(baseImponibileEffettiva, regione, comune, comuneDef);
    const detrazioni = calcolaDetrazioni(baseImponibileEffettiva);
    const irpefNetto = calcolaIrpefNetto(irpefTotale, detrazioni);
    return ral - inps - irpefNetto;
}

// TODO: - inps calculated 2 times
function baseImponibile(lordo, regione, hasAgevolazione) {
    const inps = calcolaInps(lordo);
    const imponibileStandard = lordo - inps;
    const regola = (hasAgevolazione) ? regioneToRegola[regione] : RegolaImponibile.STANDARD;
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
    return calcolaTassa(imponibile, comuniToScaglioniIrpef[comune] ? comuniToScaglioniIrpef[comune] : comuneDef);
}

function calcolaIrpefTotale(imponibile, regione, comune, comuneDef) {
    return calcolaIrpef(imponibile) +
        calcolaIrpefRegione(imponibile, regione) +
        calcolaIrpefComune(imponibile, comune, comuneDef);
}

function calcolaDetrazioni(imponibile) {
    if (imponibile <= 15_000) {
        return 1_880;
    } else if (imponibile <= 28_000) {
        return 1_910 + 1_190 * (28_000 - imponibile) / 13_000;
    } else if (imponibile <= 50_000) {
        return 1_910 * (50_000 - imponibile) / (50_000 - 28_000);
    } else {
        return 0;
    }
}

function calcolaIrpefNetto(irpefTotale, detrazioni) {
    return Math.max(0, irpefTotale - detrazioni);
}

function calcolaTassa(lordo, soglieToPercentualeMarginale) {
    let tasseTotale = 0;
    let resto = lordo;
    let sogliaPrecedente = 0;

    for (const soglia in soglieToPercentualeMarginale) {
        const percentuale = soglieToPercentualeMarginale[soglia]
        const deltaSoglia = soglia - sogliaPrecedente;
        const used = Math.min(deltaSoglia, resto);
        sogliaPrecedente = soglia
        resto -= used;
        tasseTotale += used * percentuale
    }
    return tasseTotale;
}
