var app = new Vue({
    el: '#doctorApp',
    data: {
        dr: {
            FirstName: '',
            LastName: '',
            Phone: '',
            Email: '',
            Degree: ''
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            axios.get('/Doctor/GetDoctor')
                .then(res => {
                    console.log(res);
                    var doctor = res.data;
                    this.dr = {
                        FirstName: doctor.firstName,
                        LastName: doctor.lastName,
                        Phone: doctor.phone,
                        Email: doctor.email,
                        Degree: doctor.degree
                    };
                })
                .catch(err => {
                    console.log(err)
                    toastr.error('Bilgiler yüklenirken bir hata oluştu.');
                });
        },
        save() {
            if (this.dr.FirstName != '' && this.dr.LastName != '' && this.dr.Degree != '') {
                axios.post('/Doctor/UpdateDoctor', this.dr)
                    .then(res => {
                        console.log(res);
                        toastr.success('Bilgiler Güncellendi');
                    })
                    .catch(err => {
                        console.log(err);
                        toastr.error('Bilgiler güncellenirken bir hata oluştu.');
                    });

            }
            else if (this.dr.FirstName == '') {
                toastr.warning('Ad alanı doldurulmalı');
            }
            else if (this.dr.LastName == '') {
                toastr.warning('Soyadı alanı doldurulmalı');
            }
            else if (this.dr.Degree == '') {
                toastr.warning('Diploma alanı doldurulmalı');
            }
        }
    }
});

Vue.config.devtools = true;