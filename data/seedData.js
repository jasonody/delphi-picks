(function (seedData) {
	"use strict";

	seedData.tournaments = [{
		season: 2014,
		tournament: 1,
		name: "English Premier League (EPL)"
	}, {
		season: 2014,
		tournament: 2,
		name: "Major League Soccer (MLS)"
	}];

	seedData.rounds = [{
		season: 2014,
		tournament: 1,
		rounds: [{
			round: 1,
			name: "Week 1",
			isCurrent: false
		}, {
			round: 2,
			name: "Week 2",
			isCurrent: false
		}, {
			round: 3,
			name: "Week 3",
			isCurrent: true
		}, {
			round: 4,
			name: "Week 4",
			isCurrent: false
		}, {
			round: 5,
			name: "Week 5",
			isCurrent: false
		}]
	}, {
		season: 2014,
		tournament: 2,
		rounds: [{
			round: 1,
			name: "Week 1",
			isCurrent: true
		}, {
			round: 2,
			name: "Week 2",
			isCurrent: false
		}, {
			round: 3,
			name: "Week 3",
			isCurrent: false
		}]
	}];

	seedData.games = [
	{
		season: 2014,
		tournament: 1,
		round: 1,
		canDraw: true,
		games: [{
			game: 1,
			home: "Manchester United",
			away: "Liverpool",
			isComplete: true,
			hasStarted: true,
			result: 1,
			score: "1 - 0"
		}]
	}, {
		season: 2014,
		tournament: 1,
		round: 2,
		canDraw: true,
		games: [{
			game: 1,
			home: "Manchester United",
			away: "Liverpool",
			isComplete: true,
			hasStarted: true,
			result: 1,
			score: "1 - 0"
		}]
	}, {
		season: 2014,
		tournament: 1,
		round: 3,
		canDraw: true,
		games: [{
			game: 1,
			home: "Manchester United",
			away: "Liverpool",
			isComplete: false,
			hasStarted: true,
			result: 1,
			score: "1 - 0"
		}, {
			game: 2,
			home: "Southampton",
			away: "Manchester City",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}, {
			game: 3,
			home: "Crystal Palace",
			away: "West Ham United",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}, {
			game: 4,
			home: "Newcastle United",
			away: "Aston Villa",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}, {
			game: 5,
			home: "Arsenal",
			away: "Chelsea",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}] //games
	}, {
		season: 2014,
		tournament: 1,
		round: 4,
		canDraw: true,
		games: [{
			game: 1,
			home: "Manchester United",
			away: "Liverpool",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}]
	}, {
		season: 2014,
		tournament: 1,
		round: 5,
		canDraw: true,
		games: [{
			game: 1,
			home: "Manchester United",
			away: "Liverpool",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}]
	}, {
		season: 2014,
		tournament: 2,
		round: 1,
		canDraw: true,
		games: [{
			game: 1,
			home: "Seattle Sounders",
			away: "LA Galaxy",
			isComplete: false,
			hasStarted: true,
			result: 2,
			score: "1 - 1"
		}, {
			game: 2,
			home: "Chicago Fire",
			away: "D.C. United",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}, {
			game: 3,
			home: "Toronto FC",
			away: "New York Red Bulls",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}, {
			game: 4,
			home: "Chivas USA",
			away: "Real Salt Lake",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}, {
			game: 5,
			home: "Colorage Rapids",
			away: "FC Dallas",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}]
	}, {
		season: 2014,
		tournament: 2,
		round: 2,
		canDraw: true,
		games: [{
			game: 1,
			home: "Seattle Sounders",
			away: "LA Galaxy",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}]
	}, {
		season: 2014,
		tournament: 2,
		round: 3,
		canDraw: true,
		games: [{
			game: 1,
			home: "Seattle Sounders",
			away: "LA Galaxy",
			isComplete: false,
			hasStarted: false,
			result: 0,
			score: null
		}]
	}];

	seedData.picks = [
		{
			user: "10154460396405438",
			provider: "facebook",
			season: 2014,
			tournament: 1,
			round: 3,
			game: 1,
			pick: 1
		}, {
			user: "10154460396405438",
			provider: "facebook",
			season: 2014,
			tournament: 1,
			round: 3,
			game: 2,
			pick: 2
		}, {
			user: "10154460396405438",
			provider: "facebook",
			season: 2014,
			tournament: 1,
			round: 1,
			game: 1,
			pick: 2
		}, {
			user: "10154460396405438",
			season: 2014,
			tournament: 2,
			round: 1,
			game: 1,
			pick: 1
		}
	];

	seedData.users = [
		{
			id: "10154460396405438",
			username: "",
			displayName: "Jason Ody",
			name: {
				familyName: "",
				givenName: "",
				middleName: ""
			},
			gender: "male",
			profileUrl: "",
			provider: "facebook"
		}
	];

} (module.exports));