<template>產品頁面{{ id }}</template>
<script>
export default {
  data() {
    return {
      id: [],
    };
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;
    // const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/${id}`;
    // this.$http.get(url).then((res) => {
    //   console.log(res);
    //   this.product = res.data.product;
    // });
  },
};
</script>
