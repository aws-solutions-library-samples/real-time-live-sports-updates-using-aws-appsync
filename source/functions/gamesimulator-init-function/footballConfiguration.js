module.exports.config = {
  "feedId": "footballGame",
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
        "awayScore": "away_points",
        "clock": "clock",
        "commentary": "description",
        "createdAt": "wall_clock",
        "gameId": "gameId",
        "homeScore": "home_points",
        "id": "id",
        "section": {
          "name": "period.number",
          "sequence": "period.sequence"
        },
        "type": "play_type"
      },
      "UpdateGameInput": {
        "gameStatus": {
          "awayScore": "away_points",
          "clock": "clock",
          "homeScore": "home_points",
          "location": "start_situation.location.yardline",
          "play": "start_situation.down",
          "possession": "start_situation.possession.alias",
          "sections": [
            {
              "name": "period.number",
              "sequence": "period.sequence",
              "stats": {
                "stats0": "statistics.0",
                "stats1": "statistics.1",
                "stats2": "statistics.2",
                "stats3": "statistics.3",
                "stats4": "statistics.4"
              }
            }
          ],
          "status": "status"
        },
        "id": "gameId",
        "stats": {
          "stats0": "statistics.0",
          "stats1": "statistics.1",
          "stats2": "statistics.2",
          "stats3": "statistics.3",
          "stats4": "statistics.4"
        }
      }
    }
  }
};