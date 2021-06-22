export default {
  template: '#userProductModal',
  props: ['product', 'loadingStatus'],
  data() {
    return {
      loadingStatus: {
        loadingItem: "",
      },
      status: {},
      tempProduct: {},
      modal: '',
      qty: 1,
    };
  },
  watch: {
    product(){
      this.tempProduct = this.product;
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
  methods: {
    openModal() {
      this.modal.show();
      
    },
    hideModal() {
      this.modal.hide();
    },
  },
}