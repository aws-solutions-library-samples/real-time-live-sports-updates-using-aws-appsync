import React from 'react'
import { Card, Row, Col } from 'antd';
import { listGames } from './graphql/queries';
import API, {graphqlOperation} from '@aws-amplify/api-graphql';

import './App.css';

const onCreateGameEventCustom = `
        subscription OnCreateGameEvent {
          onCreateGameEvent{
            id
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

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {games:[]};
  }

  fetchGames = async() => {
    var today = new Date();
    var todayString = today.toISOString().slice(0,10);
    const games = await API.graphql(graphqlOperation(listGames, {filter: {
      plannedKickoffTime: {
        beginsWith: todayString
      }
    }}));
    console.log('GAMES ARE: ', games.data.listGames.items);
    if(games.data.listGames.items.length > 0) {
        this.setState({games: games.data.listGames.items}) 
    }
  };

  componentDidMount() {
    this.fetchGames()
    
    const subscription = API.graphql(
      graphqlOperation(onCreateGameEventCustom)
  ).subscribe({
      next: (gameEventData) => {
        console.log('GOT NEW DATA FOR GAME EVENT');
        console.log(gameEventData);
        // Do something with the data
        let tempGames = this.state.games;
        tempGames.forEach(async game => {
          if(game.id === gameEventData.value.data.onCreateGameEvent.game.id) {
            console.log('updating game: ' + game.id);
            game.events.items.push(gameEventData.value.data.onCreateGameEvent)
            game.gameStatus = gameEventData.value.data.onCreateGameEvent.game.gameStatus;
            game.lastType = gameEventData.value.data.onCreateGameEvent.type;
            game.lastCommentary = gameEventData.value.data.onCreateGameEvent.commentary;
          }
        });
        console.log('now updating gamelist');
        console.log('GAMES ARE: ', this.state.games);
        this.setState({games:tempGames});
      }
  });
    this.setState({subscription: subscription});
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  };

  render() {
    return (
      <div className="App">
      <h1>Today's Games</h1>
      <Row style={mainRowStyle}>
      {
          this.state.games?.map(game => (
            <Col span={6} key={game.id}>
              <Card hoverable title={game.stage.season.name} extra={<a href={'/games/' + game.id}>More</a>} style={cardStyle}>
                <b style={competitorStyle}>{game.home.name}</b><br></br>vs<br></br><b style={competitorStyle}>{game.away.name}</b>
                <p>Stage: {game.stage.name}</p>
                <p>KickOff: {new Date(game.plannedKickoffTime).toLocaleTimeString()}</p>
                <p style={venueStyle}>Venue: {game.venue.name}, {game.venue.city}</p>
                {game.gameStatus?.status !== 'started' && (
                  <p>{game.gameStatus?.status}</p>
                )}
                {
                  game.events.items[game.events.items.length -1] != null && (
                    <p>{game.events.items[game.events.items.length -1].clock}</p>
                  )
                }
                <p>{game.gameStatus?.homeScore} - {game.gameStatus?.awayScore}</p>
                {
                  game.lastType != null && (
                    <p>Last Event: <b>{game.lastType}</b></p>
                  )
                }
                {
                  game.lastCommentary != null && (
                    <p><i>{game.lastCommentary}</i></p>
                  )
                }
              </Card>
            </Col>      
          ))
        }
    </Row>
    </div>
    );
  }

}

const cardStyle = { width :'90%'}
const competitorStyle = { color: '#f5222d'  } 
const venueStyle = { fontSize: 11, color: '#1890ff'  } 
const mainRowStyle = { marginTop: 50, marginBottom: 150}



export default App;

