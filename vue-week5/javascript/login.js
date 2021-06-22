Vue.createApp({
  data(){
    return{
    url : 'https://vue3-course-api.hexschool.io/',
    loginData: { //登入參數
      username: '',
      password: '',
    },
  }},
  methods:{
    login(){
      const loginAPI = `${this.url}admin/signin`;
      //API
      axios.post(loginAPI, this.loginData).then((res) => {
        if(res.data.success){
          //存token
          const {token, expired} = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          window.location ='products.html';
        }else{
          alert(res.data.message);
        }})
      .catch((err) => {alert("登入失敗");});
    }
  },
}).mount('#app');
