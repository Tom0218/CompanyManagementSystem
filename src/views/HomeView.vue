<script>
import Swal from 'sweetalert2'
export default{
    data(){
        return{
            id:"",
            pwd:"",
            alert:"", //SweetAlert Text
        }
    },
    methods:{
        //登入
        login(){
            // Make a POST request using fetch
            fetch('http://localhost:8081/api/attendance/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                id: this.id,
                pwd: this.pwd
                })
            })
            .then(response => {
                // Check if the response status is OK
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the successful response data
                console.log(data);
            })
            .catch(error => {
                // Handle errors, e.g., show an error message
                console.error('There was a problem with the fetch operation:', error);
            });
        }
    }
}
</script>
<template>
<div class="body">
<h1>登入頁面</h1>
<div>
    <label >帳號:</label>
    <input type="text" v-model="id" id="id">
    <br>
    
    <button @click="login">登入</button>
    <div>

<label >密碼:</label>
<input type="password" v-model="pwd" id="pwd">
<br>
</div>
</div>
</div>
</template>
<style lang="scss" scoped>
//button
button{
    font-weight: bold;
}
//input
#id,#pwd{
    margin-left: 5px;
}

//文字
label{
    color: whitesmoke;
    font-weight: bold;
}

h1{
    color: whitesmoke;
    font-weight: bold;
}
//架構
.body{
    height: 100vh;
    width: 100vw;
    background-color: rgb(9, 38, 53);
}
</style>
