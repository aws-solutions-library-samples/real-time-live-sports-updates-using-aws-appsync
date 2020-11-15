const footballGame01 = {
    id:"so0102sim:match:01-",
    stageId:"so0102sim:season:01:17",
    plannedKickoffTime:"",
    away: {
      id: "so0102sim:competitor:0001",
      name: "San Francisco 49ers",
      country: "USA",
      countryCode: "USA",
      alias: "SF"
    },
    home:{
      id: "sr:competitor:0002",
      name: "Seattle Seahawks",
      country: "USA",
      countryCode:"USA",
      alias: "SEA"
    },
    venue:{
      id: "so0102sim:venue:001",
	    name: "CenturyLink Field",
      capacity: 68000,
      surface: "artificial",
      city:"Seattle, WA",
      country:"USA"
    },
    feedConfig: {
      providerId: 'SO0102Sim',
      feedId: 'footballGame'
    }
  };
 


const soccerGame01 = {
    id:"so0102sim:match:02-",
    stageId:"so0102sim:season:02:26",
    plannedKickoffTime:"",
    home: {
      id: "so0102sim:competitor:0003",
      name: "Eintracht Frankfurt",
      country: "Germany",
      countryCode: "DEU",
      alias: "SGE"
    },
    away:{
      id: "sr:competitor:0004",
      name: "Borussia Monchengladbach",
      country: "Germany",
      countryCode:"DEU",
      alias: "BMG"
    },
    venue:{
      id: "so0102sim:venue:002",
	    name: "Commerzbank Arena",
      capacity: 51500,
      surface: "grass",
      city:"Frankfurt",
      country:"Germany"
    },
    feedConfig: {
      providerId: 'SO0102Sim',
      feedId: 'soccerGame'
    }
  };
  
const soccerGame02 = {
    id:"so0102sim:match:03-",
    stageId:"so0102sim:season:02:26",
    plannedKickoffTime:"",
    home: {
      id: "so0102sim:competitor:0005",
      name: "1. FC Cologne",
      country: "Germany",
      countryCode: "DEU",
      alias: "KOE"
    },
    away:{
      id: "sr:competitor:0006",
      name: "RB Leipzig",
      country: "Germany",
      countryCode:"DEU",
      alias: "RBL"
    },
    venue:{
      id: "so0102sim:venue:003",
	    name: "Rheinenergiestadion",
      capacity: 50000,
      surface: "grass",
      city:"Cologne",
      country:"Germany"
    },
    feedConfig: {
      providerId: 'SO0102Sim',
      feedId: 'soccerGame'
    }
  };
  
const soccerGame03 = {
    id:"so0102sim:match:04-",
    stageId:"so0102sim:season:03:16",
    plannedKickoffTime:"",
    home: {
      id: "so0102sim:competitor:0007",
      name: "Brescia Calcio",
      country: "Italy",
      countryCode: "ITA",
      alias: "BRE"
    },
    away:{
      id: "sr:competitor:0008",
      name: "US Lecce",
      country: "Italy",
      countryCode:"ITA",
      alias: "LEC"
    },
    venue:{
      id: "so0102sim:venue:004",
	    name: "Stadio Mario Rigamonti",
      capacity: 16743,
      surface: "grass",
      city:"Brescia",
      country:"Italy"
    },
    feedConfig: {
      providerId: 'SO0102Sim',
      feedId: 'soccerGame'
    }
  };
 
 
module.exports.allGames = [footballGame01, soccerGame01, soccerGame02, soccerGame03];