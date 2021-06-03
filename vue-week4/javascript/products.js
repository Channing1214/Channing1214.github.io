let productModal = null;
let delProductModal = null;
const url = "https://vue3-course-api.hexschool.io/";
const path = "channing";
const app = Vue.createApp({
    data() {
        return {
            productData: {
                imagesUrl: [],
            },
            tempProduct: {
                imagesUrl: [],
            },
            isNew: false, //新增或編輯
            pagination: {}, //分頁
        }
    },
    methods: {
        getData(page = 1) {
            const getDataAPI = `${url}api/${path}/admin/products?page=${page}`;
            //API
            axios.get(getDataAPI)
                .then((res) => {
                    if (res.data.success) {
                        this.productData = res.data.products;
                        this.pagination = res.data.pagination;
                    } else {
                        alert("您尚未登入");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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
        }
    },
    mounted() {
        //token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        if (token === '') {
            alert('您尚未登入請重新登入。');
            window.location = 'login.html';
        }
        axios.defaults.headers.common.Authorization = token;
        this.getData();
    }
})
    //【新增】和【編輯】元件
    .component('productModal', {
        template: '#productModal',
        props: {
            tempProduct: {
                type: Object,
                default() {
                    return { imagesUrl: [], }
                }
            },
            isNew: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {

            };
        },
        mounted() {
            productModal = new bootstrap.Modal(document.getElementById('productModal'), {
                keyboard: false,
                backdrop: 'static'
            });
        },
        methods: {
            updateProduct() {
                if (this.isNew) {
                    //新增
                    const updateProductAPI = `${url}api/${path}/admin/product`;
                    axios.post(updateProductAPI, { data: this.tempProduct }).then((res) => {
                        if (res.data.success) {
                            this.$emit('update');
                        } else {
                            alert(res.data.message);
                        }
                        productModal.hide();
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    //編輯
                    const editProductAPI = `${url}api/${path}/admin/product/${this.tempProduct.id}`;
                    axios.put(editProductAPI, { data: this.tempProduct }).then((res) => {
                        if (res.data.success) {
                            this.$emit('update');
                        } else {
                            alert(res.data.message);
                        }
                        productModal.hide();
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            },
            createImages() {
                this.tempProduct.imagesUrl = [];
                this.tempProduct.imagesUrl.push('');
            },
        },
    })
    //【刪除】元件
    .component('delProductModal', {
        template: '#delProductModal',
        props: {
            tempProduct: {
                type: Object,
                default() {
                    return {

                    }
                }
            }
        },
        data() {
            return {

            };
        },
        mounted() {
            delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
                keyboard: false,
                backdrop: 'static',
            });
        },
        methods: {
            delProduct() {
                const delProductAPI = `${url}api/${path}/admin/product/${this.tempProduct.id}`;
                axios.delete(delProductAPI, { data: this.tempProduct }).then((res) => {
                    if (res.data.success) {
                        this.$emit('update');
                    } else {
                        alert(res.data.message);
                    }
                    delProductModal.hide();
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
    })
    //【分頁】元件
    .component('pagination', {
        template: '#pagination',
        props: {
            pages: {
                type: Object,
                default() {
                    return {

                    }
                }
            }
        },
        methods: {
            emitPages(item) {
                this.$emit('emit-pages', item);
            },
        },
    })
app.mount('#app')