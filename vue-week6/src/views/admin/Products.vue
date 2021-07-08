<template>
  產品
  <div class="container">
    <!-- <table class="table">
      <thead></thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.title }}</td>
          <td></td>
          <td></td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="goToPage(item)"
            >
              進入產品頁
            </button>
          </td>
        </tr>
      </tbody>
    </table> -->
    <div class="text-end mt-4">
      <button type="button" class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
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
      this.$router.push(`/product/${item.id}`);
    },
    getData(page = 1) {
      const getDataAPI = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
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
    openModal(isNew, item) {
      if (isNew === "new") {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        const productComponent = this.$refs.productModal;
        productComponent.openModal();
      } else if (isNew === "edit") {
        this.tempProduct = { ...item };
        this.isNew = false;
        const productComponent = this.$refs.productModal;
        productComponent.openModal();
      } else if (isNew === "delete") {
        this.tempProduct = { ...item };
        const delProductComponent = this.$refs.delProductModal;
        delProductComponent.openModal();
      }
    },
    updateProduct(item) {
      this.tempProduct = item;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = "post";
      // let stauts = "新增產品";
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = "put";
        // stauts = "更新產品";
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct }).then(
        (response) => {
          if (response.data.success) {
            // this.$httpMessageState(response, stauts);
            productComponent.hideModal();
            this.getData(this.currentPage);
          } else {
            // this.$httpMessageState(response, stauts);
          }
        }
      );
    },
    delProduct() {
      const delProductAPI = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http
        .delete(delProductAPI, { data: this.tempProduct })
        .then((res) => {
          if (res.data.success) {
            this.getData();
          } else {
            alert(res.data.message);
          }
          const delProductComponent = this.$refs.delProductModal;
          delProductComponent.hideModal();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    // const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`;
    // this.$http.get(url).then((res) => {
    //   console.log(res);
    //   this.products = res.data.products;
    // });
    this.getData();
  },
};
</script>
