module.exports.config = {
  "feedId": "soccerGame",
  "mapping": {
    "stats": {
      "type": "AWSJSON"
    }
  },
  "providerId": "SO0102Sim",
  "required": [
    "CreateGameEventInput.id",
    "CreateGameEventInput.gameId",
    "UpdateGameInput.id",
    "UpdateGameInput.gameStatus.awayScore",
    "UpdateGameInput.gameStatus.homeScore",
    "UpdateGameInput.gameStatus.status"
  ],
  "transform": {
    "defaults": {
      "status": "started"
    },
    "item": {
      "CreateGameEventInput": {
        "awayScore": "away_score",
        "clock": "match_clock",
        "commentary": "commentaries.0.text",
        "competitor": {
          "id": "team",
          "name": "team"
        },
        "createdAt": "time",
        "gameId": "gameId",
        "homeScore": "home_score",
        "id": "id",
        "players": [
          "player"
        ],
        "scorer": {
          "id": "goal_scorer.id",
          "name": "goal_scorer.id"
        },
        "section": {
          "name": "period",
          "sequence": "period"
        },
        "type": "type"
      },
      "UpdateGameInput": {
        "gameStatus": {
          "awayScore": "away_score",
          "clock": "match_clock",
          "homeScore": "home_score",
          "status": "status"
        },
        "id": "gameId"
      }
    }
  }
}