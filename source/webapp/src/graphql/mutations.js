/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSport = /* GraphQL */ `
  mutation CreateSport(
    $input: CreateSportInput!
    $condition: ModelSportConditionInput
  ) {
    createSport(input: $input, condition: $condition) {
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
export const updateSport = /* GraphQL */ `
  mutation UpdateSport(
    $input: UpdateSportInput!
    $condition: ModelSportConditionInput
  ) {
    updateSport(input: $input, condition: $condition) {
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
export const deleteSport = /* GraphQL */ `
  mutation DeleteSport(
    $input: DeleteSportInput!
    $condition: ModelSportConditionInput
  ) {
    deleteSport(input: $input, condition: $condition) {
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
export const createSeason = /* GraphQL */ `
  mutation CreateSeason(
    $input: CreateSeasonInput!
    $condition: ModelSeasonConditionInput
  ) {
    createSeason(input: $input, condition: $condition) {
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
export const updateSeason = /* GraphQL */ `
  mutation UpdateSeason(
    $input: UpdateSeasonInput!
    $condition: ModelSeasonConditionInput
  ) {
    updateSeason(input: $input, condition: $condition) {
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
export const deleteSeason = /* GraphQL */ `
  mutation DeleteSeason(
    $input: DeleteSeasonInput!
    $condition: ModelSeasonConditionInput
  ) {
    deleteSeason(input: $input, condition: $condition) {
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
export const createCompetition = /* GraphQL */ `
  mutation CreateCompetition(
    $input: CreateCompetitionInput!
    $condition: ModelCompetitionConditionInput
  ) {
    createCompetition(input: $input, condition: $condition) {
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
export const updateCompetition = /* GraphQL */ `
  mutation UpdateCompetition(
    $input: UpdateCompetitionInput!
    $condition: ModelCompetitionConditionInput
  ) {
    updateCompetition(input: $input, condition: $condition) {
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
export const deleteCompetition = /* GraphQL */ `
  mutation DeleteCompetition(
    $input: DeleteCompetitionInput!
    $condition: ModelCompetitionConditionInput
  ) {
    deleteCompetition(input: $input, condition: $condition) {
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
export const createStage = /* GraphQL */ `
  mutation CreateStage(
    $input: CreateStageInput!
    $condition: ModelStageConditionInput
  ) {
    createStage(input: $input, condition: $condition) {
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
export const updateStage = /* GraphQL */ `
  mutation UpdateStage(
    $input: UpdateStageInput!
    $condition: ModelStageConditionInput
  ) {
    updateStage(input: $input, condition: $condition) {
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
export const deleteStage = /* GraphQL */ `
  mutation DeleteStage(
    $input: DeleteStageInput!
    $condition: ModelStageConditionInput
  ) {
    deleteStage(input: $input, condition: $condition) {
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
export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
export const createGameEvent = /* GraphQL */ `
  mutation CreateGameEvent(
    $input: CreateGameEventInput!
    $condition: ModelGameEventConditionInput
  ) {
    createGameEvent(input: $input, condition: $condition) {
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
export const updateGameEvent = /* GraphQL */ `
  mutation UpdateGameEvent(
    $input: UpdateGameEventInput!
    $condition: ModelGameEventConditionInput
  ) {
    updateGameEvent(input: $input, condition: $condition) {
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
export const deleteGameEvent = /* GraphQL */ `
  mutation DeleteGameEvent(
    $input: DeleteGameEventInput!
    $condition: ModelGameEventConditionInput
  ) {
    deleteGameEvent(input: $input, condition: $condition) {
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
