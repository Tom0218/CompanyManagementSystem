<script >
import {mapState, mapActions} from 'pinia';
import userInfo  from'../stores/userInfo';
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      page:"未登入",
      id:"",
      employeeNum: "",
      pwd:"",
      newPwd:"",
      info:[],
      email:"",
      userInput:"",
      authCode:"",
    }
  },
  computed:{
    // 使用 mapState 将 state 映射到组件的计算属性
    //參數:  資料庫,要用的 state & getters
    ...mapState(userInfo ,["user"]),
  },

  methods:{
    ...mapActions(userInfo ,["setUser",'getUser']),

    changePwd(){
      const req = {
      id: this.employeeNum, // replace with the actual employee ID
      auth_code: this.authCode, // replace with the actual authentication code
      new_password: this.newPwd // replace with the actual new password
    };
    console.log(this.employeeNum+this.authCode+this.newPwd)
    const apiUrl = "http://localhost:8080/api/attendance/employee/change_password_by_auth_code";

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    };

    // Making the fetch request
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });

    },
    
    //傳送驗證碼(id/email)
    SendVerificationCode(){
      //判斷是email還是員工編號
      if(this.userInput.includes('@')){
        this.email = this.userInput
      } else {
        this.employeeNum = this.userInput
      }
      
      const requestData = {
        id: this.employeeNum,
        email: this.email
      };

      // 发起POST请求
      fetch('http://localhost:8080/api/attendance/employee/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 如果有其他必要的头部信息，可以在这里添加
        },
        body: JSON.stringify(requestData)
      })
      .then(response => response.json())
      .then(data => {
        // 处理从服务器返回的数据（data）
        console.log(data);
        this.employeeNum = "";
        this.email = ""
        
      })
      .catch(error => {
        // 处理请求过程中的错误
        console.error('Error:', error);
      });
    },
    
    search(){
      const id = this.id;
      const name = this.name;
      const department = this.selectedDepartment;
      const apiUrl = 'http://localhost:8080/api/employee/search';
      
      // Construct the URL with query parameters
      const urlWithParams = `${apiUrl}?id=${id}&name=${name}&department=${department}`;

      // Make a GET request
      fetch(urlWithParams, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json', // You can adjust the content type if needed
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
          },
          // Add other options if needed
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          this.employeeList = data.employeeList;
          console.log('employeeList:', this.employeeList);
      })
      .catch(error => {
          console.error('Fetch Error:', error);
      });
    },

    logout() {
      var url = "http://localhost:8080/api/attendance/logout";
      var data = {};
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
          .then((response) => {
              console.log("Logout return:", response,)
              localStorage.clear(); // 清除所有 localStorage 数据
              return
          });
    },

    login(){
      //判斷是否為空

			if(this.id==""||this.pwd==""){

        Swal.fire({
                title: '輸入不得為空',
                icon: 'warning',
                confirmButtonText: '確認'
              })

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
        .catch((error) => console.error("Error:", error)
        
          )
        .then((response) =>{ 
          console.log("Login response :", response,)   
            
          if(response.rtnCode == "SUCCESSFUL"){
            this.info = response;
            this.setUser(response.employee);
            this.$router.push("/SelectFuntionPage");
          
            return
          }

          Swal.fire({
              title: response.rtnCode,
              icon: 'error',
              confirmButtonText: '確認'
            })

          return
        });
    },


  }
}
</script>

<template>
  <div class="maimArea">
    <div class="topArea">
      <h1>差勤管理系統</h1>
      <label for=""> account :</label>
      <input type="text" v-model="id"  id="colorInput" >
      <br/>
      <label for="">password : </label>
      <input type="text"  v-model="pwd" id="colorInput">

      <div class="btnArea wrapper">
        <button @click="login" class='btn color_transition' >登入</button>
        <hr/>
      </div>
        <p click="forgotPwd"  data-bs-toggle="modal" data-bs-target="#exampleModal"  id="forgotPwd"  style="cursor: pointer"> Forgot Password ?</p>
      
    </div>
    <div>
      <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">忘記密碼</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="inputArea">
                  <div>
                    <label for="" class="lable">請輸入員工編號或電子信箱:</label>
                    <input type="text" v-model="userInput"  id="idAndEmailInputBox">
                    <button @click="SendVerificationCode()">送出驗證碼</button>
                  </div>
                  <br/>
                  <label class="lable">員工編號 :</label>
                  <input type="text" v-model="employeeNum">
                  <br/>
                  <label class="lable">驗證碼 :</label>
                  <input type="text" v-model="authCode">
                  <br/>
                  <label class="lable">新密碼 :</label>
                    <input type="text" v-model="newPwd">
                </div>
              </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                  <button type="button" class="btn btn-primary" @click="changePwd">完成</button>
                </div>
              </div>
            </div>
          </div>
    </div>
  </div>
    
</template>

<style lang="scss" scoped>


#forgotPwd{
  width: 36%;
  margin: 2% 32%;
  background-color: rgb(54, 82, 173);
  border: none;
  color: rgba(199, 194, 194, 0.703);
}

#forgotPwd:hover {
  color: whitesmoke;
}

/////////////////////////////////////////////btn
.wrapper {
  text-align: center;
  height: 80px;
}

.btn {
  -webkit-border-radius: 11;
  -moz-border-radius: 11;
  border-radius: 11px;
  font-family: Arial;
  color: #FFFFFF;
  font-size: 20px;
  padding: 15px 30px 15px 30px;
  text-decoration: none;
  border: none;
  // margin-top: 25px;
  cursor: pointer;
}

.color_transition {
  background-color: #00A0D6;
  transition: background-color 0.4s;
}

.color_transition:hover {
  background-color: #007DA7;
}
/////////////////////////////////////////////btn

input{
  border-radius: 10px;
  padding: 1% 3%;
  caret-color: black; /* 透明 */

}

.topArea{
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 25%;
}

#idAndEmailInputBox{
  width: 100%;
}
.inputArea{
  width: 70%;
  margin: 0 15%;
  display: flex;
  flex-direction: column;
  // align-items: center;
}
.modal-content{
  width: 115%;
}


.lable{
  color: black;
}

button{
  font-weight: bold;
  margin: 1% 0;
  border-radius: 10px;
}

.btnArea{
  margin: 2% 0;
  display: flex;
  flex-direction: column;
}

label{
  color: whitesmoke;
  font-weight: bold;
  width: auto;
}

h1{
  color: whitesmoke;
  text-align: center;
}

#account,#pwd{
  margin-left: 5px;
}

//架構
.maimArea{
  min-height: 100vh;
  height: auto;
  width: 70vw;
  background-color: rgb(54, 82, 173);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
