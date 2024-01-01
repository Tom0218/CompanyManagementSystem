<script>
export default{
  data(){
    return{
      id:"",
      pwd:"",
    }
  },
  methods:{
    logIn(){
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
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) =>{ 
                console.log("Success:", response,)    
				// console.log(response)   
				this.loginResult=response
				return this.checkLoginSucess()
				// console.log(this.loginResult)   
            });
      // this.$router.push('Home')
    }
  }
}
</script>

<template>
<div class="body" >
  <label>帳號:</label>
  <input type="text" id="account" v-model="Id">
  <br/>
  <label>密碼:</label>
  <input type="text" id="pwd" v-model="pwd">
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
