<template>
  產品
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="120">明細</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="goToPage(item)"
              >
                產品明細
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emit-pages="getData" />
    <ProductModal
      @update-product="updateProduct"
      :product="tempProduct"
      :isNew="isNew"
      ref="productModal"
    />
    <DelProductModal
      @del-item="delProduct"
      :product="tempProduct"
      ref="delProductModal"
    />
  </div>
</template>
<script>
import DelProductModal from "@/components/DelProductModal.vue";
import Pagination from "@/components/Pagination.vue";
import ProductModal from "@/components/ProductModal.vue";
export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
      modal: {
        editModal: "",
        delModal: "",
      },
      currentPage: 1,
    };
  },
  components: {
    ProductModal,
    DelProductModal,
    Pagination,
  },
  methods: {
    goToPage(item) {
      this.$router.push(`/front/product/${item.id}`);
    },
    getData(page = 1) {
      const getDataAPI = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      console.log(getDataAPI);
      //API
      this.$http
        .get(getDataAPI)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          } else {
            alert("您尚未登入");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>
