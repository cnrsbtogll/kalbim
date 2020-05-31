var app = new Vue({
    el: '#app',
    data: {
        patientDetails: {
            Name: datas.name,
            LastName: '',
            BirthDay: '',
            Weight: ''
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            console.log(datas.name);
         //   this.patientDetails.Name = datas.name;
            this.patientDetails.LastName = datas.lastName;
            this.patientDetails.BirthDay = datas.birthDay;
            this.patientDetails.Weight = datas.weight;
            console.log(this.patientDetails);
        }
    }
});

Vue.config.devtools = true;