<script>
export default{
  data(){
    return{
      accound:"",
      pwd:"",
    }
  },
  methods:{
    logIn(){
      this.$router.push('Home')
    }
  }
}
</script>

<template>
<div class="body" >
  <h1>登入介面</h1>
  <label>帳號:</label>
  <input type="text" id="account">
  <br/>
  <label>密碼:</label>
  <input type="text" id="pwd">
  <br/>
  <button @click="logIn">登入</button>
  <button @click="register">註冊</button>
  <button @click="forgotPwd">忘記密碼</button>
</div>
</template>

<style lang="scss" scoped>

button{
  font-weight: bold;
}

label{
  color: whitesmoke;
  font-weight: bold;
}
//input
#account,#pwd{
  margin-left: 5px;
}
//文字

//架構
.body{
  height: 100vh;
  width: 100vw;
  background-color: #092635;
}
</style>
