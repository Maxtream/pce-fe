const Events = {
    template: '#events-template',
    data: function() {
        return {
            loading: true,
            games: {},
            currentGame: {},
            status: {
                name: 'Status',
                list: ['Started', 'Starting soon', 'Upcoming'],
                open: false,
                current: null
            },
            region: {
                name: 'Region',
                list: {},
                open: false,
                current: null
            }
        };
    },
    created: function() {
        return this.fetchEventData();
    },
    watch: {
        $route: 'fetchEventData'
    },
    methods: {
        fetchEventData: function() {
            this.loading = true;

            let self = this;
            let filter = '?';

            if (this.$route.params.game) {
                this.currentGame = this.getGameData(this.$route.params.game);
                filter += '&game=' + this.currentGame.abbriviature;
                this.region.list = this.currentGame.regions;
            } else {
                this.currentGame.name = 'All';
            }

            filter += '&limit=40';

            if (this.region.current) {
                filter += '&region='+this.region.current;
            }

            if (this.status.current) {
                filter += '&status='+this.status.current.toLowerCase();
            }

            axios.get('https://api.pcesports.com/wp/wp-json/pce-api/tournaments/' + filter)
            .then(function (response) {
                self.games = response.data;

                let currentDate = new Date();
                let timezoneOffset = currentDate.getTimezoneOffset() * 60;

                for (let i = 0; i < self.games.length; i++) {
                    let date = new Date((self.games[i].startTime - timezoneOffset) * 1000);

                    self.games[i].name = self.games[i].name
                        .replace(/&amp;/g, "&")
                        .replace(/&gt;/g, ">")
                        .replace(/&lt;/g, "<")
                        .replace(/&quot;"/g, "\"");
                    self.games[i].startTime = date.toUTCString().replace(':00 GMT', '');
                }

                self.loading = false;
            });
        },
        getGameData: function(gameName) {
            const game = {};

            switch(gameName) {
                case 'hearthstone':
                    game.abbriviature = 'hs';
                    game.name = 'Hearthstone';
                    game.regions = {
                        'na': 'North America',
                        'eu': 'Europe',
                    };
                break;
                default:
                    game.abbriviature = 'lol';
                    game.name = 'League of Legends';
                    game.regions = {
                        'na': 'North America',
                        'euw': 'Europe West',
                        'eune': 'Europe East'
                    };
                break;
            }

            return game;
        },
        getGameLink: function(gameAbbriviature) {
            let link = '';

            switch(gameAbbriviature) {
                case 'lol':
                    link = 'league-of-legends';
                break;
                case 'hs':
                    link = 'hearthstone';
                break;
            }

            return link;
        }
    }
};