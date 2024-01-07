<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../../stores/userInfo';

export default{
    data(){
        return{
            userData:[],
            employee:"",
            id :"",
            department:"",
            selectedDepartment:"",
            name:"",
            pwd:"",
            email:"",
            active:false,
            jobPosition:"",
            birthDate:"",
            arrivalDate:""
        }
    },
    mounted(){
        this.fetchUser();
    },
    computed:{
    // 使用 mapState 将 state 映射到组件的计算属性
    //參數:  資料庫,要用的 state & getters
    ...mapState(userInfo ,["user"]),
    },
    methods:{
        ...mapActions(userInfo ,["setUser",'getUser']),
        async fetchUser() {
        // 触发从后端获取用户数据的操作
        this.userData = this.getUser();
        // console.log('Fetched userData:', this.userData);
        },

        updateActive(action){
            if(this.userData.jobPosition == 'Getneral'){
                alert('Unauthorizated')
                return
            }
            //判斷選擇啟用或停用
            if(action == "active"){
                this.active = true;
            }else if(action == "deactivate"){
                this.active = false;
            }
            // 定义请求参数
            const executorId = this.userData.id;
            const employeeId = this.id;
            const isActive = this.active;

            // 构建 API 地址
            const apiUrl = `http://localhost:8080/api/attendance/employee/updateActive?executorId=${executorId}&employeeId=${employeeId}&isActive=${isActive}`;

            // 发起 fetch 请求
            fetch(apiUrl, {
            method: 'POST', // 或者 'GET'，根据你的 API 需求
            headers: {
                'Content-Type': 'application/json', // 根据实际需要设置请求头
            },
            })
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // 处理返回的数据
                console.log(data);
                alert(data.rtnCode)
                if(data.rtnCode == 'SUCCESSFUL'){
                    this.search()
                    return
                }
            })
            .catch(error => {
                // 处理请求错误
                console.error('Fetch error:', error);
            });
        },
        search(){
            if(this.userData.jobPosition == 'Getneral'){
                alert('Unauthorizated')
                return
            }
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
                this.employee = data.employeeList[0];
                console.log(this.employee);
            })
            .catch(error => {
                console.error('Fetch Error:', error);
            });
        },
    },
}
</script>
<template>
    <div class="StaffUpdateBody" >
        <div >
            <label for="" id="employeeNum">員工編號 : </label>
            <input type="text" v-model="id">
            <button @click="search">搜尋</button>
            <button @click="updateActive('active')">啟用</button>
            <button @click="updateActive('deactivate')">停用</button>
            <br/>
            <table>
                <tr>
                    <th>員工編號 :</th>
                    <td>{{ this.employee.id }}</td>
                </tr>
                <tr>
                    <th>部門 :</th>
                    <td>{{ this.employee.department }}</td>
                </tr>
                <tr>
                    <th>職位 :</th>
                    <td>{{ this.employee.jobPosition }}</td>
                </tr>
                <tr>
                    <th>姓名 :</th>
                    <td>{{ this.employee.name }}</td>
                </tr>
                <tr>
                    <th>信箱 :</th>
                    <td>{{ this.employee.email }}</td>
                </tr>
                <tr>
                    <th>生日 :</th>
                    <td>{{ this.employee.birthDate }}</td>
                </tr>
                <tr>
                    <th>到職日期 :</th>
                    <td>{{ this.employee.arrivalDate }}</td>
                </tr>
                <tr>
                    <th>離職日期 :</th>
                    <td>{{ this.employee.requestData }}</td>
                </tr>
                <tr>
                    <th>離職原因 :</th>
                    <td>{{ this.employee.quitReason }}</td>
                </tr>
                <tr>
                    <th>帳號狀態 :</th>
                    <td>{{ this.employee.active }}</td>
                </tr>
                <tr>
                    <th>特休 :</th>
                    <td>{{ this.employee.annualLeave }}</td>
                </tr>
                <tr>
                    <th>病假 :</th>
                    <td>{{ this.employee.sickLeave }}</td>
                </tr>
            </table>
        </div>
        <div class="img">
            <img src="" alt="顯示失敗" width="100px" height="200px">
        </div>
        
    </div>
    
</template>
<style lang="scss" scoped>
#employeeNum{
    color: whitesmoke;
}
.img{
    width: 5%;
    height: 5%;
}

table{
    margin-top: 2%;
    width: 40%;
    background-color: whitesmoke;
}
td{
    color: black;
    width: 50%;
    border: 1px black solid;
    text-align: left;
    font-weight: bold;
    padding: 0 1%;
}
th{
    color: black;
    width: 20%;
    border: 1px black solid;
    font-weight: bold;
}

h1{
    color: whitesmoke;
}
.StaffUpdateBody{
    width: 100vw;
    background-color: #092635;
}
</style>