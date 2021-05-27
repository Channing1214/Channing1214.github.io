let productModal = null;
let delProductModal = null;
Vue.createApp({
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/",
            path: "channing",
            productData: [],
            isNew: false, //新增或編輯
            tempProduct: {
                imagesUrl: [],
            },
        }
    },
    methods: {
        getData(page = 1) {
            const getDataAPI = `${this.url}api/${this.path}/admin/products?page=${page}`;
            //API
            axios.get(getDataAPI)
                .then((res) => {
                    if (res.data.success) {
                        this.productData = res.data.products;
                    } else {
                        alert("您尚未登入");
                    }
                })
        },
        updateProduct() {
            if (this.isNew) {
                //新增
                const updateProductAPI = `${this.url}api/${this.path}/admin/product`;
                axios.post(updateProductAPI, { data: this.tempProduct }).then((res) => {
                    if (res.data.success) {
                        this.getData();
                    } else {
                        alert(res.data.message);
                    }
                    productModal.hide();
                })
            } else {
                //編輯
                const editProductAPI = `${this.url}api/${this.path}/admin/product/${this.tempProduct.id}`;
                axios.put(editProductAPI, { data: this.tempProduct }).then((res) => {
                    if (res.data.success) {
                        this.getData();
                    } else {
                        alert(res.data.message);
                    }
                    productModal.hide();
                })
            }
        },
        openModal(isNew, item) {
            if (isNew === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                productModal.show();
            } else if (isNew === 'edit') {
                this.tempProduct = { ...item };
                this.isNew = false;
                productModal.show();
            } else if (isNew === 'delete') {
                this.tempProduct = { ...item };
                delProductModal.show()
            }
        },
        delProduct() {
            const delProductAPI = `${this.url}api/${this.path}/admin/product/${this.tempProduct.id}`;
                axios.delete(delProductAPI, { data: this.tempProduct }).then((res) => {
                    if (res.data.success) {
                        this.getData();
                    } else {
                        alert(res.data.message);
                    }
                    delProductModal.hide();
                })
        },
        createImages() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        },
    },
    mounted() {
        //bootstrap 泡泡視窗
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });
        //token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        if (token === '') {
            alert('您尚未登入請重新登入。');
            window.location = 'login.html';
        }
        axios.defaults.headers.common.Authorization = token;
        this.getData();
    }
}).mount('#app')