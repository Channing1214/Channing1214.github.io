<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#/admin">首頁</a>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link"
            >後台產品列表</router-link
          >
        </li>
        <!-- <li class="nav-item">
          <router-link to="/" class="nav-link">登入</router-link>
        </li> -->
        <a href="#/front" @click.prevent="logout" class="nav-link">登出</a>
      </ul>
    </div>
  </nav>
  後台首頁
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      status: false,
    };
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    this.$http.defaults.headers.common.Authorization = token;

    const api = `${process.env.VUE_APP_API}/api/user/check`;
    this.$http.post(api).then((response) => {
      if (response.data.success) {
        this.status = true;
      } else {
        // this.$httpMessageState(response, "登入結果");
        this.$router.push("/");
      }
    });
  },
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          this.$router.push("/front");
        }
      });
    },
  },
};
</script>
