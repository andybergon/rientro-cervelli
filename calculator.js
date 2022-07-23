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
    ABRUZZO: ['Chieti', "L'Aquila", 'Pescara', 'Teramo'],
    BASILICATA: ['Matera', 'Potenza'],
    CALABRIA: ['Catanzaro', 'Cosenza', 'Crotone', 'Reggio Calabria', 'Vibo Valentia'],
    CAMPANIA: ['Caserta', 'Avellino', 'Benevento', 'Napoli', 'Salerno'],
    EMILIA_ROMAGNA: ['Bologna', 'Ferrara', 'Forlì-Cesena', 'Modena', 'Parma', 'Piacenza', 'Ravenna', 'Reggio Emilia', 'Rimini'],
    FRIULI_VENEZIA_GIULIA: ['Gorizia', 'Pordenone', 'Trieste', 'Udine'],
    LAZIO: ['Roma', 'Latina', 'Rieti', 'Viterbo', 'Frosinone'],
    LIGURIA: ['Genova', 'Imperia', 'La Spezia', 'Savona'],
    LOMBARDIA: ['Bergamo', 'Brescia', 'Como', 'Cremona', 'Lecco', 'Lodi', 'Mantova', 'Milano', 'Monza e Brianza', 'Pavia', 'Sondrio', 'Varese'],
    MARCHE: ['Ancona', 'Ascoli Piceno', 'Fermo', 'Macerata', 'Pesaro e Urbino'],
    MOLISE: ['Campobasso', 'Isernia'],
    PIEMONTE: ['Alessandria', 'Asti', 'Biella', 'Cuneo', 'Novara', 'Torino', 'Verbano-Cusio-Ossola', 'Vercelli'],
    PUGLIA: ['Bari', 'Barletta-Andria-Trani', 'Brindisi', 'Lecce', 'Foggia', 'Taranto'],
    SARDEGNA: ['Cagliari', 'Nuoro', 'Oristano', 'Sassari', 'Sud Sardegna'],
    SICILIA: ['Catania', 'Palermo', 'Agrigento', 'Caltanissetta', 'Enna', 'Messina', 'Ragusa', 'Siracusa', 'Trapani'],
    TOSCANA: ['Arezzo', 'Firenze', 'Grosseto', 'Livorno', 'Lucca', 'Massa e Carrara', 'Pisa', 'Pistoia', 'Prato', 'Siena'],
    TRENTINO_ALTO_ADIGE: ['Bolzano', 'Trento'],
    UMBRIA: ['Perugia', 'Terni'],
    VALLE_D_AOSTA: ["Aosta"],
    VENETO: ['Belluno', 'Padova', 'Rovigo', 'Treviso', 'Venezia', 'Verona', 'Vicenza'],
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

const comuniToIrpef = {
	'Chieti': 0.008,
	"L'Aquila": 0.006, // Esenzione per redditi imponibili fino a euro 15000.00
	'Pescara': 0.008, //Esenzione per redditi imponibili fino a euro 10000.00
	'Teramo': 0.008, // Esenzione per redditi imponibili fino a euro 10000.00
	
	'Matera': 0.008, // Esenzione per redditi imponibili fino a euro 10000.00
	'Potenza': 0.008,
	
	'Catanzaro': 0.008,
	'Cosenza': 0.008,
	'Crotone': 0.008,
	'Reggio Calabria': 0.008,
	'Vibo Valentia': 0.008, // Esenzione per redditi imponibili fino a euro 7000.00
	
    'Caserta': 0.008,
	'Avellino': 0.008, //Esenzione per redditi imponibili fino a euro 15000.00
	'Benevento': 0.008,
	'Napoli': 0.008, // Esenzione per redditi imponibili fino a euro 8000.00
	'Salerno': 0.008, // Esenzione per redditi imponibili fino a euro 10000.00
	
	'Bologna': 0.008, // Esenzione per redditi imponibili fino a euro 15000.00
	'Ferrara': undefined,
//	Ferrara: 0,6	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,7	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,75	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Forlì-Cesena': undefined,
//	Forli: 0	Esenzione per redditi imponibili fino a euro 15000.00
//0,55	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,6	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,79	Applicabile a scaglione di reddito oltre euro 50.000,00
//	Cesena: 0	Esenzione per redditi imponibili fino a euro 10000.00
//0,39	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,4	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,55	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 55.000,00
//0,78	Applicabile a scaglione di reddito da euro 55.000,01 fino a euro 75.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 75.000,00
	'Modena': undefined,
//	Modena: 0,5	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,64	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,75	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Parma': 0.008, // Esenzione per redditi imponibili fino a euro 12000.00
	'Piacenza': undefined,
//	Piacenza: 0	Esenzione per soggetti con reddito imponibile determinato ai fini IRPEF <o = euro 11,000,00
//0	Esenzione per soggetti facenti parte di un nucleo familiare che da attestazione ISEE risulta composto da almeno 5 componenti e risulta avere un reddito ISEE non superiore a 15.000,00 euro
//0,42	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,52	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,68	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Ravenna': undefined,
//	Ravenna: 0,55	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,57	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,59	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Reggio Emilia': undefined,
//	Reggio emilia: 0	Esenzione per redditi imponibili fino a euro 15000.00
//0,69	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,71	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Rimini': undefined,
//	Rimini: 0	Esenzione per redditi imponibili fino a euro 16000.00
//0,55	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,66	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	
	'Gorizia': 0,
	'Pordenone': 0.006, //	Esenzione per redditi imponibili fino a euro 15000.00
	'Trieste': 0.006, //	Esenzione per redditi imponibili fino a euro 12500.00
	'Udine': 0.002,
	
    'Roma': 0.009, //Esenzione per redditi imponibili fino a euro 12000.00
    'Rieti': 0.008,
    'Viterbo': 0.0076,
    'Frosinone': 0.008,
    'Latina': 0.008, //Esenzione per redditi imponibili fino a euro 7999.99
	
	'Genova': 0.008, //Esenzione per redditi imponibili fino a euro 10000.00
	'Imperia': 0.008,
	'La Spezia': 0.006, //Esenzione per redditi imponibili fino a euro 15000.00
	'Savona': 0.008,
	
	'Bergamo': 0.008,
	'Brescia': 0.008, //	Esenzione per redditi imponibili fino a euro 13000.00
	'Como': 0.008, // Esenzione per redditi imponibili fino a euro 15000.00
	'Cremona': 0.008, // Esenzione per redditi imponibili fino a euro 12000.00
	'Lecco': undefined,
//Lecco:	0	Esenzione per redditi imponibili fino a euro 15000.00
//0,25	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,4	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,6	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Lodi': undefined,
//	Lodi: 0	Esenzione per redditi imponibili fino a euro 15000.00
//0,6	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,7	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,75	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,75	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Mantova': undefined,
//	Mantova: 0	Esenzione per redditi imponibili fino a euro 22000.00
//0,38	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,39	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,62	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Milano': 0.008, //Esenzione per redditi imponibili fino a euro 23000.00
	'Monza e Brianza': 0.008, //Esenzione per redditi imponibili fino a euro 12000.00
	'Pavia': undefined,
//	Pavia: 0	Esenzione per redditi imponibili fino a euro 16000.00
//0,7	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,77	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 55.000,00
//0,79	Applicabile a scaglione di reddito da euro 55.000,01 fino a euro 75.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 75.000,00
	'Sondrio': 0.008, //Esenzione per redditi imponibili fino a euro 9999.99
	'Varese': 0.008, //Esenzione per redditi imponibili fino a euro 8000.00
	
	'Ancona': 0.008,
	'Ascoli Piceno': 0.008, //Esenzione per redditi imponibili fino a euro 8500.00
	'Fermo': 0.008, // Esenzione per redditi imponibili fino a euro 9000.00
	'Macerata': 0.008, //Esenzione per redditi imponibili fino a euro 8499.99
	'Pesaro e Urbino': undefined,
//	Pesaro: 0	Esenzione per redditi imponibili fino a euro 9000.00
//0,6	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,61	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
//	Urbino: 0.008, 	Esenzione per redditi imponibili fino a euro 8000.00
	
	'Campobasso': 0.008,
	'Isernia': 0.008,
	
	'Alessandria': 0.008,
	'Asti': undefined,
//	Asti: 0	Esenzione per redditi imponibili fino a euro 7500.00
//0,54	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,66	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,79	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Biella': 0.008,
	'Cuneo': undefined,
//	Cuneo: 0,7	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,73	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,76	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 55.000,00
//0,79	Applicabile a scaglione di reddito da euro 55.000,01 fino a euro 75.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 75.000,00
	'Novara': 0.008, //Esenzione per redditi imponibili fino a euro 12500.00
	'Torino': undefined,
//	Torino: 0	Esenzione per redditi imponibili fino a euro 11790.00
//0,8	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,8	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//1,1	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//1,2	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Verbano-Cusio-Ossola': undefined,
	'Vercelli': undefined,
//	Vercelli: 0	Esenzione per redditi imponibili fino a euro 16000.00
//0,7	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,8	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,8	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	
	'Bari': 0.008, // Esenzione per redditi imponibili fino a euro 15000.00 
	'Barletta-Andria-Trani': undefined, 
//	Barletta: 0	Esenzione per redditi imponibili fino a euro 9000.00
//0,5	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,6	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,7	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 55.000,00
//0,79	Applicabile a scaglione di reddito da euro 55.000,01 fino a euro 75.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 75.000,00
//	Andria: 0.008,	//Esenzione per redditi imponibili fino a euro 7500.00
//	Trani: 0	Esenzione per redditi imponibili fino a euro 7999.99
//0,7	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,75	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,8	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Brindisi': 0.008, // Esenzione per redditi imponibili fino a euro 10000.00 
	'Lecce': 0.008, 
//	Lecce: 0	Esenzione per REDDITO COMPLESSIVO AI FINI IRPEF NON SUPERIORE A EURO 12.500,00
//0	Esenzione per LE FAMIGLIE NEL CUI NUCLEO FAMILIARE VI E' PERSONA PORTATORE DI HANDICAP CON ASSEGNO DI ACCOMPAGNAMENTO FINO A UN REDDITO COMPLESSIVO DI EURO 28000,00. SI INTENDE REDDITO COMPLESSIVO FAMILIARE ESCLUSO ASSEGNO DI ACCOMPAGNAMENTO
	'Foggia': 0.008, 
	'Taranto': 0.008, // Esenzione per redditi imponibili fino a euro 15000.00 , 
	
	'Cagliari': undefined, 
//	Cagliari: 0	Esenzione per redditi imponibili fino a euro 10000.00
//0,66	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,72	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 55.000,00
//0,79	Applicabile a scaglione di reddito da euro 55.000,01 fino a euro 75.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 75.000,00
	'Nuoro': undefined, 
//	Nuoro: 0	Esenzione per redditi imponibili fino a euro 7999.99
//0,45	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,55	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,65	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Oristano': undefined, 
//	Oristano: 0	Esenzione per redditi imponibili fino a euro 10000.00
//0,69	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,72	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,76	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Sassari': 0.008, // Esenzione per redditi imponibili fino a euro 15000.00
	'Sud Sardegna': undefined, 
    
    
    'Catania': 0.008,	//Esenzione per redditi imponibili fino a euro 7500.00
    'Palermo': 0.008,
	'Agrigento': 0.008, //Esenzione per redditi imponibili fino a euro 7499.99
	'Caltanissetta': 0.008, 
	'Enna': 0.008, // Esenzione per redditi imponibili fino a euro 22999.99
	'Messina': 0.008, 
	'Ragusa': undefined, 
//	Ragusa: 0	Esenzione per redditi imponibili fino a euro 10000.00
//0,6	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,7	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,75	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Siracusa': 0.008, 
	'Trapani': 0.008, // Esenzione per redditi imponibili fino a euro 10000.00
	
	'Arezzo': undefined,
//	Arezzo: 0	Esenzione per redditi imponibili fino a euro 13500.00
//0,48	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,49	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,79	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Firenze': 0.002, //Esenzione per redditi imponibili fino a euro 25000.00 
	'Grosseto': 0.008, 
	'Livorno': 0.008, 
	'Lucca': undefined, 
//	Lucca: 0	Esenzione per redditi imponibili fino a euro 14500.00
//0,58	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,6	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,74	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 55.000,00
//0,79	Applicabile a scaglione di reddito da euro 55.000,01 fino a euro 75.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 75.000,00
	'Massa e Carrara': undefined, 
//	Massa: 0	Esenzione per redditi imponibili fino a euro 12000.00
//0,63	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,68	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,71	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
//	Carrara: 0.008, // Esenzione per redditi imponibili fino a euro 10000.00
	'Pisa': undefined, 
//	Pisa; 0	Esenzione per i contribuenti in possesso di soli redditi da lavoro dipendente e/o da pensione fino a euro 14.000,00
//0	Esenzione per gli altri contribuenti in possesso di redditi fino a euro 12.000,00
//0,5	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,6	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,7	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Pistoia': 0.008, // Esenzione per redditi imponibili fino a euro 15000.00 
	'Prato': 0.005, 
	'Siena': undefined, 
//	
	
	'Bolzano': 0, 
	'Trento': 0, 
   
    'Perugia': 0.008, // Esenzione per i contribuenti con reddito complessivo, ai sensi dell'art. 8 del D.P.R. n. 917/1986 (TUIR), inferiore/uguale ad euro 12.500,00
	'Terni': 0.008, // Esenzione per redditi imponibili fino a euro 12500.00
	
	'Aosta': 0.008, //Esenzione per redditi imponibili fino a euro 9999.99
	
	'Belluno': undefined, 
//	Belluno: 0	Esenzione per redditi imponibili fino a euro 10000.00
//0,72	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,73	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,78	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 50.000,00
	'Padova': 0.007, //Esenzione per redditi imponibili fino a euro 15000.00
	'Rovigo': 0.008, //Esenzione per redditi imponibili fino a euro 10000.00 
	'Treviso': undefined, 
//	Treviso: 0	Esenzione per redditi imponibili fino a euro 15000.00
//0,6	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,65	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,7	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 55.000,00
//0,75	Applicabile a scaglione di reddito da euro 55.000,01 fino a euro 75.000,00
//0,8	Applicabile a scaglione di reddito oltre euro 75.000,00
	'Venezia': 0.008, //Esenzione per redditi imponibili fino a euro 10000.00  
	'Verona': 0.008, //Esenzione per redditi imponibili fino a euro 10000.00   
	'Vicenza': undefined, 
//   Vicenza: 0	Esenzione per redditi imponibili fino a euro 15000.00
//0,6	Applicabile a scaglione di reddito fino a euro 15.000,00
//0,65	Applicabile a scaglione di reddito da euro 15.000,01 fino a euro 28.000,00
//0,7	Applicabile a scaglione di reddito da euro 28.000,01 fino a euro 50.000,00
//0,75	Applicabile a scaglione di reddito oltre euro 50.000,00

    // ...
    // could be map {threshold: percentage, ...}
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
    const inps = calcolaInps(ral);
    const biEffettiva = baseImponibile(ral, regione, hasAgevolazione);
    const irpefTotale = calcolaIrpefTotale(biEffettiva, regione, comune, comuneDef);
    return ral - inps - irpefTotale;
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
    const soglie = {1_000_000_000: comuniToIrpef[comune] ? comuniToIrpef[comune] : comuneDef};
    return calcolaTassa(imponibile, soglie);
}

function calcolaIrpefTotale(imponibile, regione, comune, comuneDef) {
    return calcolaTassa(imponibile, soglieIrpefToPercentualeMarginale) +
        calcolaIrpefRegione(imponibile, regione) +
        calcolaIrpefComune(imponibile, comune, comuneDef);
}

function calcolaTassa(lordo, soglieToPercentualeMarginale) {
    let tasseTotale = 0;
    let resto = lordo;
    const sogliaPrecedente = 0;

    for (const soglia in soglieToPercentualeMarginale) {
        const percentuale = soglieToPercentualeMarginale[soglia]
        const deltaSoglia = soglia - sogliaPrecedente;
        const used = Math.min(deltaSoglia, resto);
        resto -= used;
        tasseTotale += used * percentuale
    }
    return tasseTotale;
}
