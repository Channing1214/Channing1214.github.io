import productModal from './productModal.js';

const url = "https://vue3-course-api.hexschool.io";
const path = "channing";
const app = Vue.createApp({
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      products: [],
      product: {},
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      cart: {},
    };
  },
  methods: {
    //取得產品列表
    getProducts() {
      const getProductsUrl = `${url}/api/${path}/products`;
      axios.get(getProductsUrl).then((res) => {
        if (res.data.success) {
          this.products = res.data.products; //所有產品
        } else {
          alert(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    //查看更多按鈕
    openModal(productId){
      this.loadingStatus.loadingItem = productId;
      this.$refs.userProductModal.openModal();
      const openModalUrl = `${url}/api/${path}/product/${productId}`;
      axios.get(openModalUrl).then((res) => {
        this.loadingStatus.loadingItem = '';
        if (res.data.success) {
          this.product = res.data.product; //單一產品
        } else {
          alert(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    //加入購物車(post)
    addCart(id, qty = 1) {
      this.loadingStatus.loadingItem = id;
      this.$refs.userProductModal.loadingStatus.loadingItem= id;
      const addCartUrl = `${url}/api/${path}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      axios.post(addCartUrl, { data: cart }).then((res) => {
        this.loadingStatus.loadingItem = '';
        this.$refs.userProductModal.loadingStatus.loadingItem= '';
        this.$refs.userProductModal.hideModal();
        if (res.data.success) {
          this.getCart();
        } else {
          alert(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    //查看購物車(get)
    getCart() {
      const getCartUrl = `${url}/api/${path}/cart`;
      axios.get(getCartUrl).then((res) => {
        if (res.data.success) {
          this.cart = res.data.data;
        } else {
          alert(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    //按+/-號時更新購物車
    updateCart(item) {
      this.loadingStatus.loadingItem = item.id;
      const updateCartUrl = `${url}/api/${path}/cart/${item.id}`;
      const cart = {
        product_id: item.product.id,
        qty: item.qty
      };
      axios.put(updateCartUrl, { data: cart }).then((res) => {
        this.loadingStatus.loadingItem = '';
        if (res.data.success) {
          this.getCart();
        } else {
          alert(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    //刪除購物車項目
    deleteItem(id) {
      this.loadingStatus.loadingItem = id;
      const deleteItemUrl = `${url}/api/${path}/cart/${id}`;
      axios.delete(deleteItemUrl).then((res) => {
        if (res.data.success) {
          this.loadingStatus.loadingItem = '';
          this.getCart();
        } else {
          alert(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    //清空購物車
    deleteCart() {
      this.loadingStatus.loadingItem = true;
      const deleteCartUrl = `${url}/api/${path}/carts`;
      axios.delete(deleteCartUrl).then((res) => {
        this.loadingStatus.loadingItem = false;
        if (res.data.success) {
          this.getCart();
        } else {
          alert(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    //自定義規則，但無法與原生rules混用
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{2}-[0-9]{6}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    //送出訂單
    onSubmit() {
      const onSubmitUrl = `${url}/api/${path}/order`;
      const order = this.form;
      axios.post(onSubmitUrl, { data: order }).then((res) => {
        if (res.data.success) {
          alert("訂單送出");
          this.$refs.form.resetForm();
          this.getCart();
        } else {
          alert(res.data.message)
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
})
//表單驗證的東西
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.component('userProductModal', productModal);
app.mount("#app");
