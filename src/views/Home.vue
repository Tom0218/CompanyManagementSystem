<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../stores/userInfo';

export default{
  data(){
    return{
      page:"未登入",
      id:"",
      pwd:"",
      info:[],
    }
  },
  computed:{
    // 使用 mapState 将 state 映射到组件的计算属性
    //參數:  資料庫,要用的 state & getters
    ...mapState(userInfo ,["user"]),
  },

  methods:{
    ...mapActions(userInfo ,["setUser",'getUser']),

    logout() {
            var url = "http://localhost:8080/api/attendance/logout";
            var data = {};
            fetch(url, {
                method: "POST", // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }),
            })
                .then((res) => res.json())
                .catch((error) => console.error("Error:", error))
                .then((response) => {
                    console.log("Logout return:", response,)
                    return
                });
    },
    login(){
      //判斷是否為空
			if(this.id==""||this.pwd==""){
				alert("Cannot be null!!")
				return
			}
      var url = "http://localhost:8080/api/attendance/login";
            var data = {
				"id":this.id,
				"password":this.pwd
			};

            fetch(url, {
            method: "POST", // or 'PUT'
            credentials:'include',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                //api session不同要加
                "Access-Control-Allow-Credentials":true  
            }),
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) =>{ 
              alert(response.rtnCode)
                console.log("Login:", response,)   
                if(response.rtnCode == "SUCCESSFUL"){
                  this.info = response;
                  this.setUser(response.employee);
                  this.$router.push("/SelectFuntionPage");
                  return
                }
                return
            });
    }
  }

}
</script>
<template>
<div class="homeBody">
  <div class="body">
  <label>帳號:</label>
  <input type="text" id="account" v-model="id">
  <br/>
  <label>密碼:</label>
  <input type="text" id="pwd" v-model="pwd">
  <br/>
  <button @click="login">登入</button>
  <!-- <button @click="register">註冊</button> -->
  <button @click="forgotPwd">忘記密碼</button>
</div>
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
  min-height: 100vh;
  height: auto;
  width: 100vw;
  background-color: #092635;
}
</style>
