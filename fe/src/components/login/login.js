Vue.component('login', {
    template: dynamicTemplates.login,
    data: function() {
        return {
            login: '',
            pass: '',
            loginError: '',
            loading: false
        };
    },
    methods: {
        submit: function() {
            let self = this;

            this.loading = true;

            if (!this.login || !this.pass) {
                this.loginError = 'Please fill in the form';
                this.loading = false;
                return false;
            }

            axios.post('http://dev.api.pcesports.com/login', {
                login: this.login,
                pass: this.pass
            })
            .then(function (response) {
                pce.storage('set', 'token', response.data, 604800000); // 7 days
                self.$parent.$parent.login();
                self.loading = false;
            })
            .catch(function (error) {
                self.loginError = error.response.data.message;
                self.loading = false;
            });
        }
    }
});