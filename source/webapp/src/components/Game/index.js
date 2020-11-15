import React from 'react'
import { Card, Row, Col, Timeline, Typography} from 'antd';
import { getGame } from '../../graphql/queries';
import API, {graphqlOperation} from '@aws-amplify/api-graphql';

import './Game.css';

const { Text } = Typography;

const onCreateGameEventCustom = `
subscription OnCreateGameEvent ($gameId: ID){
    onCreateGameEvent (gameId : $gameId){
      id
      gameId
        game {
          id
          gameStatus {
            status
            clock
            clockStoppageAnnounced
            clockStoppagePlayer
            aggregateAwayScore
            aggregateHomeScore
            awayNormaltimeScore
            awayOvertimeScore
            awayScore
            homeNormaltimeScore
            homeOvertimeScore
            homeScore
            possession
            location
            play
            sections {
              name 
              sequence
              stats
            }
          }
        }
      homeScore
      awayScore
      clock
      commentary
      type
      players {
          id
          name
          jersey
          position
          country
          countryCode
      }
      scorer {
        id
        name
        jersey
        position
        country
        countryCode
      }
      assist {
        id
        name
        jersey
        position
        country
        countryCode
      }
    }
  }
            `;

class Game extends React.Component{

  constructor(props) {
    super(props);
    this.state = {game:null, gameEvents:[], lastGameEvent:null, lastGameStats:null, periodName:'period'};
  }

  fetchGame = async(gameId) => {
    console.log('fetchGame with id: ' + gameId);
    const game = await API.graphql(graphqlOperation(getGame, {id:gameId }));
    console.log('GAME IS: ', game.data.getGame);
    if(game.data.getGame != null) {
        this.setState({game: game.data.getGame}) 
        let competition = game.data.getGame.stage.season.competition.name;
        if(competition === "NFL Simulation") {
            this.setState({periodName: 'Quarter'});
        }
    }
  };

  componentDidMount() {
    console.log('componentDidMount');
    let gameId  = this.props.match.params.gameId;
    console.log('gameId: ' + gameId);
    this.fetchGame(gameId)
    const subscription = API.graphql(
      graphqlOperation(onCreateGameEventCustom, {
        gameId: gameId
      })
    ).subscribe({
        next: (gameEventData) => {
            console.log('GOT NEW DATA FOR GAME EVENT');
            console.log(gameEventData);
            let tempEvents = this.state.gameEvents;
            
            tempEvents.unshift(gameEventData.value.data.onCreateGameEvent);
            this.setState({gameEvents: tempEvents});
            this.setState({lastGameEvent: gameEventData.value.data.onCreateGameEvent});
            if(gameEventData.value.data.onCreateGameEvent.game.gameStatus?.sections != null && gameEventData.value.data.onCreateGameEvent.game.gameStatus?.sections.length > 0) {
                console.log('STATS string is: ');
                console.log(gameEventData.value.data.onCreateGameEvent.game.gameStatus.sections[0].stats);
                let tempStats = JSON.parse(gameEventData.value.data.onCreateGameEvent.game.gameStatus.sections[0].stats);
                console.log('STATS ARE: ');
                console.log(tempStats);
                this.setState({lastGameStats: tempStats});
            }
            
        }
    });


    this.setState({subscription: subscription});
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  };

getPeriodName(event) {
    if(event == null) {
        return "";
    }
    if(event.game?.gameStatus?.sections != null && event.game?.gameStatus?.sections.length > 0) {
        return event.game?.gameStatus?.sections[0]?.name != null ? event.game?.gameStatus?.sections[0]?.name : "";
    } else {
        return event.section?.name != null ? event.section?.name : (event.section?.sequence != null ? event.section?.sequence : "");
    }
  }

  render() {
    return (
      <div className="App">
      <h1>{this.state.game?.stage?.season.name}</h1>
      <h3 style={venueStyle}>{this.state.game?.stage?.name} - {this.state.game?.venue?.name}, {this.state.game?.venue?.city} &nbsp;kick-off: {new Date(this.state.game?.plannedKickoffTime).toLocaleTimeString()}</h3>
      <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <h2>{this.state.game?.away.name} <b>{this.state.lastGameEvent?.game?.gameStatus?.awayScore}</b> @ <b>{this.state.lastGameEvent?.game?.gameStatus?.homeScore}</b> {this.state.game?.home.name}</h2>
      </Col>
      <Col span={4}></Col>
      </Row>
      <Row>
          <Col span={16} offset={4}>
            <label>{this.state.periodName}: {this.getPeriodName(this.state.lastGameEvent)} , Clock: {this.state.lastGameEvent?.game?.gameStatus.clock}</label>
          </Col>
      </Row>
      <Row style={mainRowStyle}>
          <Col span={2}>
          </Col>
          <Col span={10}>
              <h3 style={subTitlesStyle}>Commentaries</h3>
                <Timeline mode="left">
                    {
                    this.state.gameEvents?.map(event => (
                            <Timeline.Item label={event.clock + ', ' + this.state.periodName + ' ' +  this.getPeriodName(event)} key={event.id}>
                                <b>{event.type}</b><br></br>{event.commentary}
                            </Timeline.Item>   
                        ))
                    }
                </Timeline> 
          </Col>
          <Col span={10}>
                <h3 style={subTitlesStyle}>Stats</h3>
                {
                    this.state.lastGameStats != null && (
                        
                        Object.keys(this.state.lastGameStats)?.map(stat => (
                        <Card hoverable title={this.state.lastGameStats[stat].stat_type} style={cardStyle} key={stat}>
                            {
                                Object.keys(this.state.lastGameStats[stat])?.map(singleStat=>(                                    
                                    <div key={singleStat} style={statStyle}>
                                        <b style={statKeyStyle}>{singleStat}:&nbsp;</b>
                                        {
                                            singleStat === 'team' && (
                                                <Text mark>{this.state.lastGameStats[stat][singleStat]['name']}</Text>
                                            )
                                        }
                                        {
                                            singleStat === 'player' && (
                                                <Text code>{this.state.lastGameStats[stat][singleStat]['name']}</Text>
                                            )
                                        }
                                        {
                                            Object.keys(this.state.lastGameStats[stat][singleStat]).length === 0 && (
                                                this.state.lastGameStats[stat][singleStat]
                                                
                                            )
                                        } 
                                        
                                    </div>
                                 ))
                            }    
                        </Card>
                        ))
                    )
                }
          </Col>
    </Row>
    <Row style={spacerStyle}>

    </Row>
    </div>
    );
  }

}

const cardStyle = { width :'60%', marginLeft: '20%', marginBottom: '10px'}
const statKeyStyle = {textTransform: 'uppercase', color: '#1890ff'}
const statStyle = {textAlign: 'center', fontSize: '12px'}
const subTitlesStyle = { color: '#f5222d', paddingBottom: '20px' } 
const venueStyle = { color: '#1890ff'  } 
const mainRowStyle = { marginTop: 50, background: '#f9f9f9', padding:20}
const spacerStyle = {minHeight: '50px'}



export default Game;

