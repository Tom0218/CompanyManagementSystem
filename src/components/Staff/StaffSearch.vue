<script>
export default{
    data(){
        return{
            id:"",
            name:"",
            departments:"",
            selectedDepartment:"",
            employeeList :[],
        }
    },
    mounted(){
        this.SearchAllDepartmentData();
        this.search();
    },
    methods:{
        //清空搜尋條件
        clear(){
            this.name = "";
            this.id = "";
            this.selectedDepartment = "";
        },

        //search
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

        //select(部門使用)
        SearchAllDepartmentData() {
            const url = 'http://localhost:8080/api/department/searchAll';
            const queryParams = new URLSearchParams({
            });

            // 將查詢字串附加到 URL
            const urlWithParams = `${url}?${queryParams}`;

            fetch(urlWithParams, {
                method: "GET",
                headers: new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }),
            })
            .then(response => {
                // 將API回應轉換為JSON格式
                return response.json();
            })
            .then(data => {
                // 將API回應的JSON數據設置到組件的responseData數據屬性中
                this.departments = data.departments;
                // console.log(this.departments)
            })
        }
    }
}
</script>

<template>
<!-- ▪ 員工資料查詢
▪ 可以員編、姓名、部門模糊查詢，全部無值則顯示全部；相關權限如前頁所示
▪ 一般員工只能查詢自己的個人資料 -->
    <div class="StaffSearchBody">
        <div class="funtionArea">
            <div class="info">
                <label for="">員工編號 :</label>
                <input type="text" name="" id="id" v-model="id">
            </div>
            <div class="info">
                <label for="">員工姓名 :</label>
                <input type="text" name="" id="name" v-model="name">
            </div>
            <div class="info">
                <label for="">員工部門 :</label>
                <select v-model="this.selectedDepartment" id="select">選擇部門
                    <option value="" disabled selected>選擇部門</option>
                    <option v-for="(dep, index) in departments" :key="index" >
                        {{ dep.name }}
                    </option>
                </select>
            </div>
            <div>
                <button @click="search">搜尋</button>
                <button @click="clear">清空條件</button>
            </div>
        </div>
        <div id="contextArea">
            <table>
                <tr>
                    <th>編輯</th>
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
                <tr v-for="employee,index  in this.employeeList" :key="index">
                    <td :key="index"><button>編輯</button></td>
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

#contextArea{
    width: 100%;
    padding: 1% 0;
    overflow: auto;
}
table{
    width: 100vw;
    background-color: whitesmoke;
    overflow: auto;
}
.date{
    width: 7%;
}
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

button{
    font-weight: bold;
    margin-left: 10px;
    font-weight: bold;
}

select{
    height: 30px;
}
input{
    height: 30px;
}

#id,#name,#department,#select{
    margin: 0px 0 0 5px;
    font-weight: bold;
}

label{
    margin: 0 5px;
    font-weight: bold;
    color: whitesmoke;
}
.funtionArea{
    display: flex;
}
.StaffSearchBody{
    padding: 1% 0 0 0;
    background-color: #092635;
    width: 100vw;
}
</style>