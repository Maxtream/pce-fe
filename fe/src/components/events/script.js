const Events = {
    template: '#events-template',
    data: function() {
        return {
            loading: true,
            games: {},
            currentGame: '',
        };
    },
    created: function() {
        var self = this;

        this.currentGame = this.getGameData(this.$route.params.game);

        axios.get('https://api.pcesports.com/wp/wp-json/pce-api/tournaments/?game=' + this.currentGame.abbriviature + '&limit=20')
        .then(function (response) {
            self.games = response.data;

            self.loading = false;
        });
    },
    methods: {
        getGameData: function(gameName) {
            const abbr = '';
            const name = '';

            switch(gameName) {
                case 'league-of-legends':
                    abbr = 'lol';
                    name = 'League of Legends';
                break;
                case 'hearthstone':
                    abbr = 'hs';
                    name = 'Hearthstone';
                break;
                default:
                    abbr = 'lol';
                    name = 'League of Legends';
                break;
            }

            return { name: name, abbriviature: abbr };
        }
    }
};