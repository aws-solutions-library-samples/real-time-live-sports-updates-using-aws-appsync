const footballSportInput = {
  id:"so0102sim:sport:1",
  name:"Football Simulation"
};

const soccerSportInput = {
  id:"so0102sim:sport:2",
  name:"Soccer Simulation"
};

const nflInput = {
  id:"so0102sim:tournament:01",
  sportId:"so0102sim:sport:1",
  name:"NFL Simulation",
  type:"regular_season",
  country:"USA",
  countryCode:"USA"
};

const bundesligaInput = {
  id:"so0102sim:tournament:02",
  sportId:"so0102sim:sport:2",
  name:"Bundesliga Simulation",
  type:"regular_season",
  country:"Germany",
  countryCode:"DEU"
};

const serieAInput = {
  id:"so0102sim:tournament:03",
  sportId:"so0102sim:sport:2",
  name:"Serie A Simulation",
  type:"regular_season",
  country:"Italy",
  countryCode:"ITA"
};

const nflRegularSeasonInput = {
  id:"so0102sim:season:01",
  name:"NFL Regular Season 2019 Simulation",
  startDate:"2019-09-08",
  endDate:"2019-12-29",
  competitionId:"so0102sim:tournament:01",
  status:'started',
  year:"19/20"
};

const bundesligaSeasonInput = {
  id:"so0102sim:season:02",
  name:"Bundesliga 2019/2020 Simulation",
  startDate:"2019-09-08",
  endDate:"2020-06-29",
  competitionId:"so0102sim:tournament:02",
  status:'started',
  year:"19/20"
};

const serieASeasonInput = {
  id:"so0102sim:season:03",
  name:"Serie A 2019/2020 Simulation",
  startDate:"2019-09-08",
  endDate:"2020-06-29",
  competitionId:"so0102sim:tournament:03",
  status:'started',
  year:"19/20"
};

const nflStageInput = {
  id:"so0102sim:season:01:17",
  sequence:17,
  name:"Week 17",
  startDate: "2019-12-28",
  endDate: "2018-12-29",
  seasonId:"so0102sim:season:01"
};
  
const bundesligaStageInput = {
  id:"so0102sim:season:02:26",
  sequence:26,
  name:"26 round",
  startDate: "2020-05-16",
  endDate: "2020-05-18",
  seasonId:"so0102sim:season:02"
};

const serieAStageInput = {
  id:"so0102sim:season:03:16",
  sequence:16,
  name:"16 Giornata",
  startDate: "2019-12-14",
  endDate: "2019-12-16",
  seasonId:"so0102sim:season:03"
};

module.exports = {
  footballSportInput : footballSportInput,
  soccerSportInput : soccerSportInput,
  nflInput : nflInput,
  bundesligaInput : bundesligaInput,
  serieAInput : serieAInput,
  nflRegularSeasonInput: nflRegularSeasonInput,
  bundesligaSeasonInput : bundesligaSeasonInput,
  serieASeasonInput : serieASeasonInput,
  nflStageInput : nflStageInput,
  bundesligaStageInput : bundesligaStageInput,
  serieAStageInput : serieAStageInput
};