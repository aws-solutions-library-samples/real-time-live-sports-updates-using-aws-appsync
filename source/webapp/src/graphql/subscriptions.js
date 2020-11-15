/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSport = /* GraphQL */ `
  subscription OnCreateSport {
    onCreateSport {
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
export const onUpdateSport = /* GraphQL */ `
  subscription OnUpdateSport {
    onUpdateSport {
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
export const onDeleteSport = /* GraphQL */ `
  subscription OnDeleteSport {
    onDeleteSport {
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
export const onCreateSeason = /* GraphQL */ `
  subscription OnCreateSeason {
    onCreateSeason {
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
export const onUpdateSeason = /* GraphQL */ `
  subscription OnUpdateSeason {
    onUpdateSeason {
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
export const onDeleteSeason = /* GraphQL */ `
  subscription OnDeleteSeason {
    onDeleteSeason {
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
export const onCreateCompetition = /* GraphQL */ `
  subscription OnCreateCompetition {
    onCreateCompetition {
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
export const onUpdateCompetition = /* GraphQL */ `
  subscription OnUpdateCompetition {
    onUpdateCompetition {
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
export const onDeleteCompetition = /* GraphQL */ `
  subscription OnDeleteCompetition {
    onDeleteCompetition {
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
export const onCreateStage = /* GraphQL */ `
  subscription OnCreateStage {
    onCreateStage {
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
export const onUpdateStage = /* GraphQL */ `
  subscription OnUpdateStage {
    onUpdateStage {
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
export const onDeleteStage = /* GraphQL */ `
  subscription OnDeleteStage {
    onDeleteStage {
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
export const onCreateGameEvent = /* GraphQL */ `
  subscription OnCreateGameEvent {
    onCreateGameEvent {
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
export const onUpdateGameEvent = /* GraphQL */ `
  subscription OnUpdateGameEvent {
    onUpdateGameEvent {
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
export const onDeleteGameEvent = /* GraphQL */ `
  subscription OnDeleteGameEvent {
    onDeleteGameEvent {
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
