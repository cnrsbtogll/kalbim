var app = new Vue({
    el: '#app',
    data: {
        isActive: true,
        isContentActive: false,
        isStatusActive: false,
        isChecked: false,
        measurementModel: {
            Rr: '',
            Pr: '',
            Qt: '',
            Qrs: '',
            Jtpeak: '',
            Tpeaktend: '',
            Tpeaktpeakp: '',
            Ates: '',
            BuyukTansiyon: '',
            KucukTansiyon: '',
            Oksijen: ''
        },
        avr: {},
        avl: {},
        avf: {},
        commentModel: {
            comment: {
                DrID: "",
                Comment: "",
                Date: Date.now.Date,
                Time: Date.now.Time,
            },
            MeasurementResultID: '',
            PatientID: '',
            commentId: ''
        },
        comments: [],
        diognasisModel: {
            IsMe: 'true',
            DiognasisDate: "",
            DiognasisTime: "",
            Emergancy: "",
            Status: "",
            Content: "",
            Doctor: "",
            MeasurementId: "",
            UID: "",
            olcOrder: "",
        },
        patientModel: {
            UID: "",
            Name: "",
            LastName: "",
            BirthDay: "",
            Weight: "",
            CurrentDoctor: "",
            Gender: ""
        },
    },
    mounted() {
        this.getPatient();
        this.getMeasurement();
    },
    methods: {
        togglePrice: function () {
            this.isActive = !this.isActive
        },
        getPatient() {
            this.loading = true;
            axios.get('/Doctor/GetPatient?id=' + datas.patientId + '&olcOrder=' + datas.olcOrder)
                .then(res => {
                    console.log(res);
                    var patient = res.data.result;
                    var diognasis = res.data.result.diagnoses;

                    this.patientModel = {
                        UID: patient.uid,
                        Name: patient.name,
                        LastName: patient.lastName,
                        BirthDay: patient.birthDay,
                        Weight: patient.weight,
                        CurrentDoctor: patient.currentDoctor,
                        Gender: patient.gender
                    };
                    this.commentModel.comment.DrID = this.patientModel.CurrentDoctor;

                    console.log(this.patientModel);

                    this.diognasisModel = {
                        IsMe: diognasis[0].isMe,
                        DiognasisDate: diognasis[0].diognasisDate,
                        DiognasisTime: diognasis[0].diognasisTime,
                        Emergancy: diognasis[0].emergancy,
                        Status: diognasis[0].status,
                        Content: diognasis[0].content,
                        Doctor: diognasis[0].doctor,
                        MeasurementId: diognasis[0].measurementId,
                        UID: this.patientModel.UID,
                        olcOrder: diognasis[0].olcOrder
                    };
                    this.commentModel.MeasurementResultID = datas.olcOrder;
                    this.commentModel.PatientID = datas.patientId;

                    this.comments = diognasis[0].comments;


                })
                .catch(err => {
                    console.log(err)
                })
                .then(() => {
                    this.loading = false;
                });
        },
        getMeasurement() {
            //this.loading = true;
            axios.get('/Doctor/GetMeasurement?id=' + datas.olcumId)
                .then(res => {
                    console.log("measurement");
                    console.log(res);
                    this.measurementModel = res.data;
                    this.avr = res.data.avr;
                    this.avl = res.data.avl;
                    this.avf = res.data.avf;
                    drawChart(this.avr, this.avl, this.avf);

                })
                .catch(err => {
                    console.log(err)
                })
                .then(() => {
                    this.loading = false;
                });
        },
        yorumYap() {
            this.loading = true;
            if (this.comments == null) {
                this.comments = [];
            }
            this.commentModel.commentId = this.comments.length;
            console.log(this.commentModel);
            axios.post('/Doctor/CreateComment', this.commentModel)
                .then(res => {
                    console.log(res);
                    if (this.comments.length != 0 && this.comments.length != 'undefined') {
                        this.comments.push(res.data.comment);

                        toastr.success('Yorum yapıldı.');
                        this.commentModel.comment.Comment = "";
                    }
                    else {
                        this.comments = [];
                        this.comments.push(res.data.comment);
                        toastr.success('Yorum yapıldı.');
                    }
                    //yeni bir comment create et ve içine yeni geleni pushla
                })
                .catch(err => {
                    console.log(err)
                })
                .then(() => {
                    this.loading = false;
                });
        },
        taniKoy() {

            if (this.isChecked == true && this.diognasisModel.Status != '' && this.diognasisModel.Content != '') {

                this.diognasisModel.Doctor = this.patientModel.CurrentDoctor;
                if (this.action === 'TanıKoy') {
                    axios.post('/Doctor/diagnoses', this.diognasisModel)
                        .then(res => {
                            console.log(res);
                            this.diognasisModel.IsMe = res.data.isMe;
                            this.diognasisModel.Doctor = res.data.doctor;
                            this.comments = new Array();
                            toastr.success('Tanı koyuldu.');
                        })
                        .catch(err => {
                            console.log(err);
                            toastr.error('Tanı konulurken bir hata oluştu.');
                        })
                        .then(() => {
                            this.loading = false;
                        });
                }
                else {
                    axios.put('/Doctor/diagnoses', this.diognasisModel)
                        .then(res => {
                            console.log(res);
                            this.diognasisModel.IsMe = res.data.isMe;
                            this.diognasisModel.Doctor = res.data.doctor;
                            toastr.success('Tanı güncellendi.');
                        })
                        .catch(err => {
                            console.log(err);
                            toastr.error('Tanı güncellenirken hata oluştu.');
                        })
                        .then(() => {
                            this.loading = false;
                        });
                }

            }
            else if (this.diognasisModel.Content == '') {
                this.isContentActive = true;
                toastr.warning('Yorum bilgisi girilmeli.');
            }
            else if (this.diognasisModel.Status == '') {
                this.isStatusActive = true;
                toastr.warning('Durum bilgisi girilmeli.');
            }
            else {
                //this.isActive = true;
                toastr.warning('Yazdıklarımı kontrol ettim seçeneği işaretlenmeli.');
            }
        }
    },
    computed: {
        action: {
            get() {
                return (this.diognasisModel.IsMe === 'true') ? "Güncelle" : "TanıKoy";
            }
        }
    }
});

function drawChart(avr, avl, avf) {

    var keys = Object.keys(avr);
    var beginPartKeys = keys.slice(0, 400);
    var lastPartKeys = keys.slice(401);
    var all = lastPartKeys.concat(beginPartKeys);

    var valuesAvr = Object.values(avr);
    var beginPartAvr = valuesAvr.slice(0, 400);
    var lastPartAvr = valuesAvr.slice(401);
    var allAvr = lastPartAvr.concat(beginPartAvr);

    var valuesAvl = Object.values(avl);
    var beginPartAvl = valuesAvl.slice(0, 400);
    var lastPartAvl = valuesAvl.slice(401);
    var allAvl = lastPartAvl.concat(beginPartAvl);

    var valuesAvf = Object.values(avf);
    var beginPartAvf = valuesAvf.slice(0, 400);
    var lastPartAvf = valuesAvf.slice(401);
    var allAvf = lastPartAvf.concat(beginPartAvf);

    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: all,
            datasets: [{
                label: "AVR",
                data: allAvr,
                backgroundColor: 'rgba(240, 52, 52, 1)',
                borderColor: 'rgba(240, 52, 52, 1)',
                fill: false,
            },
            {
                label: "AVL",
                data: allAvl,
                backgroundColor: 'rgba(44, 130, 201, 1)',
                borderColor: 'rgba(44, 130, 201, 1)',
                fill: false,
            }
                ,
            {
                label: "AVF",
                data: allAvf,
                backgroundColor: 'rgba(118, 93, 105, 1)',
                borderColor: 'rgba(118, 93, 105, 1)',
                fill: false,
            }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Kalp Akım Grafiği'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Zaman'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Değer'
                    }
                }]
            }
        }
    });
}


Vue.config.devtools = true;



