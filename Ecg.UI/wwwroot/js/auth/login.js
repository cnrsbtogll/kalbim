var app = new Vue({
    el: '#loginapp',
    data: {
        loginModel: {
            Email: "",
            Password: "",
            error:false
        }
    },
    methods: {
        login() {
            if (this.loginModel.Email != null && this.loginModel.Email != '' && this.loginModel.Password != null && this.loginModel.Password != '') {
                axios.post('/Authorization/authenticate', this.loginModel)
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
    }
});

Vue.config.devtools = true;