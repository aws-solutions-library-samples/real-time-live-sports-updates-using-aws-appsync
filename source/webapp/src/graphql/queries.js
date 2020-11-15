/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSport = /* GraphQL */ `
  query GetSport($id: ID!) {
    getSport(id: $id) {
      id
      name
      competitions {
        items {
          id
          name
          type
          sport {
            id
            name
            createdAt
            updatedAt
          }
          sportId
          seasons {
            nextToken
          }
          country
          countryCode
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSports = /* GraphQL */ `
  query ListSports(
    $filter: ModelSportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        competitions {
          items {
            id
            name
            type
            sportId
            country
            countryCode
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSeason = /* GraphQL */ `
  query GetSeason($id: ID!) {
    getSeason(id: $id) {
      id
      name
      year
      competition {
        id
        name
        type
        sport {
          id
          name
          competitions {
            nextToken
          }
          createdAt
          updatedAt
        }
        sportId
        seasons {
          items {
            id
            name
            year
            competitionId
            startDate
            endDate
            status
            createdAt
            updatedAt
          }
          nextToken
        }
        country
        countryCode
        createdAt
        updatedAt
      }
      competitionId
      startDate
      endDate
      status
      stages {
        items {
          id
          startDate
          endDate
          name
          sequence
          season {
            id
            name
            year
            competitionId
            startDate
            endDate
            status
            createdAt
            updatedAt
          }
          seasonId
          games {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSeasons = /* GraphQL */ `
  query ListSeasons(
    $filter: ModelSeasonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSeasons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        year
        competition {
          id
          name
          type
          sport {
            id
            name
            createdAt
            updatedAt
          }
          sportId
          seasons {
            nextToken
          }
          country
          countryCode
          createdAt
          updatedAt
        }
        competitionId
        startDate
        endDate
        status
        stages {
          items {
            id
            startDate
            endDate
            name
            sequence
            seasonId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCompetition = /* GraphQL */ `
  query GetCompetition($id: ID!) {
    getCompetition(id: $id) {
      id
      name
      type
      sport {
        id
        name
        competitions {
          items {
            id
            name
            type
            sportId
            country
            countryCode
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      sportId
      seasons {
        items {
          id
          name
          year
          competition {
            id
            name
            type
            sportId
            country
            countryCode
            createdAt
            updatedAt
          }
          competitionId
          startDate
          endDate
          status
          stages {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      country
      countryCode
      createdAt
      updatedAt
    }
  }
`;
export const listCompetitions = /* GraphQL */ `
  query ListCompetitions(
    $filter: ModelCompetitionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompetitions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        sport {
          id
          name
          competitions {
            nextToken
          }
          createdAt
          updatedAt
        }
        sportId
        seasons {
          items {
            id
            name
            year
            competitionId
            startDate
            endDate
            status
            createdAt
            updatedAt
          }
          nextToken
        }
        country
        countryCode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStage = /* GraphQL */ `
  query GetStage($id: ID!) {
    getStage(id: $id) {
      id
      startDate
      endDate
      name
      sequence
      season {
        id
        name
        year
        competition {
          id
          name
          type
          sport {
            id
            name
            createdAt
            updatedAt
          }
          sportId
          seasons {
            nextToken
          }
          country
          countryCode
          createdAt
          updatedAt
        }
        competitionId
        startDate
        endDate
        status
        stages {
          items {
            id
            startDate
            endDate
            name
            sequence
            seasonId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      seasonId
      games {
        items {
          id
          stage {
            id
            startDate
            endDate
            name
            sequence
            seasonId
            createdAt
            updatedAt
          }
          stageId
          plannedKickoffTime
          venue {
            id
            name
            capacity
            city
            country
            surface
            roofType
          }
          home {
            id
            name
            country
            countryCode
            alias
          }
          away {
            id
            name
            country
            countryCode
            alias
          }
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
          }
          scoringDrives {
            scoreName
            score
            playsCount
            duration
            quarter
            gain
            penalty
          }
          events {
            nextToken
          }
          stats
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listStages = /* GraphQL */ `
  query ListStages(
    $filter: ModelStageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        startDate
        endDate
        name
        sequence
        season {
          id
          name
          year
          competition {
            id
            name
            type
            sportId
            country
            countryCode
            createdAt
            updatedAt
          }
          competitionId
          startDate
          endDate
          status
          stages {
            nextToken
          }
          createdAt
          updatedAt
        }
        seasonId
        games {
          items {
            id
            stageId
            plannedKickoffTime
            stats
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      stage {
        id
        startDate
        endDate
        name
        sequence
        season {
          id
          name
          year
          competition {
            id
            name
            type
            sportId
            country
            countryCode
            createdAt
            updatedAt
          }
          competitionId
          startDate
          endDate
          status
          stages {
            nextToken
          }
          createdAt
          updatedAt
        }
        seasonId
        games {
          items {
            id
            stageId
            plannedKickoffTime
            stats
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      stageId
      plannedKickoffTime
      venue {
        id
        name
        capacity
        city
        country
        surface
        roofType
      }
      home {
        id
        name
        country
        countryCode
        alias
      }
      away {
        id
        name
        country
        countryCode
        alias
      }
      gameStatus {
        status
        clock
        clockStoppageAnnounced
        clockStoppagePlayer
        winner {
          id
          name
          country
          countryCode
          alias
        }
        aggregateAwayScore
        aggregateHomeScore
        aggregateWinner {
          id
          name
          country
          countryCode
          alias
        }
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
          awayScore
          homeScore
          sequence
          name
          type
          stats
        }
      }
      scoringDrives {
        scoreName
        score
        playsCount
        duration
        quarter
        gain
        penalty
        team {
          id
          name
          country
          countryCode
          alias
        }
      }
      events {
        items {
          id
          game {
            id
            stageId
            plannedKickoffTime
            stats
            createdAt
            updatedAt
          }
          gameId
          type
          clock
          section {
            awayScore
            homeScore
            sequence
            name
            type
            stats
          }
          competitor {
            id
            name
            country
            countryCode
            alias
          }
          homeScore
          awayScore
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
          playerIn {
            id
            name
            jersey
            position
            country
            countryCode
          }
          playerOut {
            id
            name
            jersey
            position
            country
            countryCode
          }
          commentary
          players {
            id
            name
            jersey
            position
            country
            countryCode
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      stats
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        stage {
          id
          startDate
          endDate
          name
          sequence
          season {
            id
            name
            year
            competitionId
            startDate
            endDate
            status
            createdAt
            updatedAt
          }
          seasonId
          games {
            nextToken
          }
          createdAt
          updatedAt
        }
        stageId
        plannedKickoffTime
        venue {
          id
          name
          capacity
          city
          country
          surface
          roofType
        }
        home {
          id
          name
          country
          countryCode
          alias
        }
        away {
          id
          name
          country
          countryCode
          alias
        }
        gameStatus {
          status
          clock
          clockStoppageAnnounced
          clockStoppagePlayer
          winner {
            id
            name
            country
            countryCode
            alias
          }
          aggregateAwayScore
          aggregateHomeScore
          aggregateWinner {
            id
            name
            country
            countryCode
            alias
          }
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
            awayScore
            homeScore
            sequence
            name
            type
            stats
          }
        }
        scoringDrives {
          scoreName
          score
          playsCount
          duration
          quarter
          gain
          penalty
          team {
            id
            name
            country
            countryCode
            alias
          }
        }
        events {
          items {
            id
            gameId
            type
            clock
            homeScore
            awayScore
            commentary
            createdAt
            updatedAt
          }
          nextToken
        }
        stats
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGameEvent = /* GraphQL */ `
  query GetGameEvent($id: ID!) {
    getGameEvent(id: $id) {
      id
      game {
        id
        stage {
          id
          startDate
          endDate
          name
          sequence
          season {
            id
            name
            year
            competitionId
            startDate
            endDate
            status
            createdAt
            updatedAt
          }
          seasonId
          games {
            nextToken
          }
          createdAt
          updatedAt
        }
        stageId
        plannedKickoffTime
        venue {
          id
          name
          capacity
          city
          country
          surface
          roofType
        }
        home {
          id
          name
          country
          countryCode
          alias
        }
        away {
          id
          name
          country
          countryCode
          alias
        }
        gameStatus {
          status
          clock
          clockStoppageAnnounced
          clockStoppagePlayer
          winner {
            id
            name
            country
            countryCode
            alias
          }
          aggregateAwayScore
          aggregateHomeScore
          aggregateWinner {
            id
            name
            country
            countryCode
            alias
          }
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
            awayScore
            homeScore
            sequence
            name
            type
            stats
          }
        }
        scoringDrives {
          scoreName
          score
          playsCount
          duration
          quarter
          gain
          penalty
          team {
            id
            name
            country
            countryCode
            alias
          }
        }
        events {
          items {
            id
            gameId
            type
            clock
            homeScore
            awayScore
            commentary
            createdAt
            updatedAt
          }
          nextToken
        }
        stats
        createdAt
        updatedAt
      }
      gameId
      type
      clock
      section {
        awayScore
        homeScore
        sequence
        name
        type
        stats
      }
      competitor {
        id
        name
        country
        countryCode
        alias
      }
      homeScore
      awayScore
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
      playerIn {
        id
        name
        jersey
        position
        country
        countryCode
      }
      playerOut {
        id
        name
        jersey
        position
        country
        countryCode
      }
      commentary
      players {
        id
        name
        jersey
        position
        country
        countryCode
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGameEvents = /* GraphQL */ `
  query ListGameEvents(
    $filter: ModelGameEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        game {
          id
          stage {
            id
            startDate
            endDate
            name
            sequence
            seasonId
            createdAt
            updatedAt
          }
          stageId
          plannedKickoffTime
          venue {
            id
            name
            capacity
            city
            country
            surface
            roofType
          }
          home {
            id
            name
            country
            countryCode
            alias
          }
          away {
            id
            name
            country
            countryCode
            alias
          }
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
          }
          scoringDrives {
            scoreName
            score
            playsCount
            duration
            quarter
            gain
            penalty
          }
          events {
            nextToken
          }
          stats
          createdAt
          updatedAt
        }
        gameId
        type
        clock
        section {
          awayScore
          homeScore
          sequence
          name
          type
          stats
        }
        competitor {
          id
          name
          country
          countryCode
          alias
        }
        homeScore
        awayScore
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
        playerIn {
          id
          name
          jersey
          position
          country
          countryCode
        }
        playerOut {
          id
          name
          jersey
          position
          country
          countryCode
        }
        commentary
        players {
          id
          name
          jersey
          position
          country
          countryCode
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
