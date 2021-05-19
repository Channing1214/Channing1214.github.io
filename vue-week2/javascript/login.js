const url = 'https://vue3-course-api.hexschool.io/';
const loginAPI = `${url}admin/signin`;

document.getElementById('login').addEventListener('click', login);
function login(e){
  e.preventDefault();
  //帳號
  let username = document.getElementById('username').value;
  if(!username) {
    return alert("請輸入email");
  }
  //密碼
  let password = document.getElementById('password').value;
  if(!password) {
    return alert("請輸入password");
  }
  //登入參數
  const loginData = {
      username,
      password
  }
  //API
  axios.post(loginAPI, loginData)
    .then((res) => {
	if(res.data.success){
	  //存token
	  const {token, expired} = res.data;
	  document.cookie = `mytoken=${token}; expires=${new Date(expired)}`;
      window.location ='products.html';
    }else{
      alert(res.data.message);
    }})
    .catch((err) => {alert("登入失敗");});
}
