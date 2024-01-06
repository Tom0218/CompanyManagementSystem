<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../../stores/userInfo';

export default{
    data(){
        return{
            page:"",
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
        this.fetchUser()
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
        console.log('Fetched userData:', this.userData);


        },
        goUpdateActive(){
            this.page = "updateActive"
        },
        updateActive(action){
            //判斷選擇啟用或停用
            if(action == "active"){
                this.active = true;
            }else{
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
            })
            .catch(error => {
                // 处理请求错误
                console.error('Fetch error:', error);
            });
        },
        search(){
            console.log(this.id)
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
                console.log(data);
                this.employee = data.employeeList;
            })
            .catch(error => {
                console.error('Fetch Error:', error);
            });
        },

    }
}
</script>
<template>
    <div class="StaffUpdateBody" >
        <button @click="goUpdateActive">帳號啟用/帳號停用</button>
        <div v-if="this.page == 'updateActive'">
            <label for="">員工編號 : </label>
            <input type="text" v-model="id">
            <button @click="search">搜尋</button>
            <button @click="updateActive('active')">啟用</button>
            <button @click="updateActive('deactivate')">停用</button>
            <table>
                <tr>
                    <th>員工編號</th>
                    <th>部門</th>
                    <th>職位</th>
                    <th>姓名</th>
                    <th>信箱</th>
                    <th>生日</th>
                    <th>到職日期</th>
                    <th>離職日期</th>
                    <th>離職原因</th>
                    <th>帳號狀態</th>
                    <th>特休</th>
                    <th>病假</th>
                </tr>
                <tr v-for="employee,index  in this.employee" :key="index">
                    <td :key="index">{{ employee.id }}</td>
                    <td :key="index">{{ employee.department }}</td>
                    <td :key="index">{{ employee.jobPosition }}</td>
                    <td :key="index">{{ employee.name }}</td>
                    <td :key="index">{{ employee.email }}</td>
                    <td :key="index" class="date">{{ employee.birthDate }}</td>
                    <td :key="index" class="date">{{ employee.arrivalDate }}</td>
                    <td :key="index">{{ employee.resignationDate }}</td>
                    <td :key="index">{{ employee.quitReason }}</td>
                    <td :key="index">{{ employee.active }}</td>
                    <td :key="index">{{ employee.annualLeave }}</td>
                    <td :key="index">{{ employee.sickLeave }}</td>
                </tr>
            </table>
        </div>
    </div>
    
</template>
<style lang="scss" scoped>
tr{
    text-align: center;
}
td{
    width: 5%;
    border: 1px black solid;
    text-align: left;
    font-weight: bold;
    padding: 0 1%;
    // margin: 0;
}
th{
    width: 5%;
    border: 1px black solid;
    font-weight: bold;
}
table{
    width: 100vw;
    background-color: whitesmoke;
    overflow: auto;
}
label{
    color: whitesmoke;
}
h1{
    color: whitesmoke;
}
.StaffUpdateBody{
    width: 100vw;
    background-color: #092635;
}
</style>