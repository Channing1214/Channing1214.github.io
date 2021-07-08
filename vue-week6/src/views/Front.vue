<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#/front">首頁</a>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/front/products" class="nav-link"
            >產品列表</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">登入後台</router-link>
        </li>
      </ul>
    </div>
  </nav>
  前台首頁
  <router-view></router-view>
</template>
