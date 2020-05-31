var app = new Vue({
    el: '#app',
    data: {
        products: [],
        selectedProduct: null,
        newStock: {
            productId: 0,
            description: "Size",
            qty: 10
        }
    },
    mounted() {
        this.getStock();
    },
    computed: {
        stock: {
            set(value) {
                this.newStock.qty = (value === '' || value < 0) ? 0 : value;
            },
            get() {
                return this.newStock.qty;
            }
        }
    }
    ,

    methods: {
        getStock() {
            this.loading = true;
            axios.get('/Admin/stocks').
                then(res => {
                    console.log(res);
                    this.products = res.data;
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        updateStock() {
            this.loading = true;
            axios.put('/Admin/stocks', {
                stock:
                    this.selectedProduct.stock.map(x => {
                        return {
                            id: x.id,
                            description: x.description,
                            qty: x.qty,
                            productId: this.selectedProduct.id
                        };
                    })
            })
                .then(res => {
                    console.log(res);
                    this.selectedProduct.stock.splice(index, 1);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        deleteStock(id, index) {
            this.loading = true;
            axios.delete('/Admin/stocks/' + id)
                .then(res => {
                    console.log(res);
                    this.selectedProduct.stock.splice(index, 1);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    this.loading = false;
                });
        },
        addStock() {
            this.loading = true;
            console.log(typeof (this.newStock.qty));
            //    this.parseInt(this.newStock.qty);
            if (typeof (this.newStock.qty) != typeof (1)) {
                alert("Quantity should be number");
            }
            else {
                axios.post('/Admin/stocks', this.newStock).
                    then(res => {
                        console.log(res);
                        this.selectedProduct.stock.push(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .then(() => {
                        this.loading = false;
                    });
            }
        },
        selectProduct(product) {
            this.selectedProduct = product;
            this.newStock.productId = product.id
        }
    }
});

Vue.config.devtools = true;