var app = new Vue({
    el: '#logout',
    data: {
    },
    methods: {
        logout() {
            axios.get('/Authorization/logout')
                .then(res => {
                    window.location.assign(res.data.url);
                    console.log(res.data.url);
                })
                .catch(err => {
                    console.log(err);
                    this.loginModel.error = true;
                });

        }
    }
});

Vue.config.devtools = true;