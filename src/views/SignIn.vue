<script>

import {mapState, mapActions} from 'pinia';
import userInfo  from'../stores/userInfo';
import * as buffer from 'buffer';
import * as fs from 'node:fs';
import Swal from 'sweetalert2'

export default{
    data(){
        return {
            currentDate: "",
            DateTimeNow:"",

            //pinia 
            userData:[],

            //search
            leaveStartDateTime:"",
            leaveEndDateTime:"",
            signInRecords:[],
            inputId:"",
            inputName:"",
            inputDepartment:"",

        }
    },

    mounted() {

        // 使用setInterval在每秒更新日期和时间
        setInterval(this.updateDate, 1000);

        // 确保组件挂载时即刻更新日期和时间
        this.updateDate();

        this.fetchUser();
    },

    computed:{
    // 使用 mapState 将 state 映射到组件的计算属性
    //參數:  資料庫,要用的 state & getters
    ...mapState(userInfo ,["user"]),
    },

    methods:{

        //Pinia
        ...mapActions(userInfo ,["setUser",'getUser']),
        async fetchUser() {
        // 触发从后端获取用户数据的操作
        this.userData = this.getUser();

        console.log(this.userData);
        },

        //轉換填寫時間單位
        formatDate(dateTime) {
            const formattedDate = new Date(dateTime).toLocaleString('zh-TW', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            });
        return formattedDate;
        },

        //返回
        goBack(){
            this.$router.push('SelectFuntionPage')
        },

        //清除搜尋條件
        clear(){
            this.leaveStartDateTime = "";
            this.leaveEndDateTime = "";
            this.inputId = "";
        },

        //簽到記錄查詢第二版
        searchRecord(){
            const employeeId = this.inputId;
            const name = this.inputName;
            const department = this.inputDepartment;
            const startDate = this.leaveStartDateTime; 
            const endDate = this.leaveEndDateTime; 
            fetch(
                `http://localhost:8080/api/attendance/SignInSheet/findSignInSheet?employeeId=${employeeId}&name=${name}&department=${department}&startDateTime=${startDate}&endDateTime=${endDate}`
            )
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then((data) => {
            this.signInRecords = data;
            console.log(data)
            })
            .catch((error) => {
            console.error("Error fetching data:", error);
            });
        },

        //簽到記錄查詢
        searchSignInRecord(){
            const employeeId = this.inputId;
            const startDateTime = this.leaveStartDateTime; 
            const endDateTime = this.leaveEndDateTime; 
            console.log("startDateTime:"+startDateTime)

            fetch(
                `http://localhost:8080/api/attendance/SignInSheet/GetSignInRecord?employeeId=${employeeId}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`
            )
            .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then((data) => {
            this.signInRecords = data;
            console.log(data)
            })
            .catch((error) => {
            console.error("Error fetching data:", error);
            });
        },

        //時間
        time(){
            let newDate = new Date();
            let year = newDate.getFullYear();
            let month = newDate.getMonth() + 1;
            let days = newDate.getDate();
            let hour = newDate.getHours();
            let mins = newDate.getMinutes();
            let sec = newDate.getSeconds();

            return  `${year}/${month}/${days} ${hour}:${mins}:${sec}`;
        },

        //簽到、簽退
        async signInAndsignOut(InorOut) {

            console.log(InorOut);

            try {
                // 获取当前时间
                const checkTime = this.time();
                console.log(checkTime);

                // 获取 IP 地址
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipResponse.json();
                this.currentIP = ipData.ip;
                console.log(`当前 IP ：${this.currentIP}`);

                // 构建表单数据
                const employeeId = this.userData.id;
                const name = this.userData.name;
                const department = this.userData.department;
                const formData = new FormData();
                formData.append('employeeId', employeeId);
                if(InorOut == 'SignIn'){
                    formData.append('name', name);
                    formData.append('department', department)
                    formData.append('checkInTime', checkTime); // 'In' -> 'checkInTime', 'Out' -> 'checkOutTime'
                    formData.append('checkInIp', this.currentIP); // 'In' -> 'checkInIp', 'Out' -> 'checkOutIp'

                } 

                else if(InorOut == 'SignOut'){
                    formData.append('checkOutTime', checkTime); // 'In' -> 'checkInTime', 'Out' -> 'checkOutTime'
                    formData.append('checkOutIp', this.currentIP); // 'In' -> 'checkInIp', 'Out' -> 'checkOutIp'
                }

                // 发送请求
                const apiUrl = `http://localhost:8080/api/attendance/SignInSheet/${InorOut}`;
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                });

                const responseData = await response.json();

                // 打印响应数据
                console.log(`${InorOut} Response:`, responseData);
                if(responseData.rtnCode == "SUCCESSFUL"){
                    Swal.fire({
                        title: responseData.rtnCode,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }

            } catch (error) {
                console.error(`${InorOut} Error:`, error);
            }
        },

        //時鐘
        updateDate() {

            let newDate = new Date();
            let year = newDate.getFullYear();
            let month = newDate.getMonth() + 1;
            let days = newDate.getDate();
            let hour = newDate.getHours();
            let mins = newDate.getMinutes();
            let sec = newDate.getSeconds();
            let clockJSRead = `${year}/${month}/${days} ${hour}:${mins}:${sec}`;
            this.currentDate = clockJSRead;

    },

    }
}
</script >

<template>
    <div class="SignInBody">
        <div class="mainArea">
            <p id="date">{{ currentDate }}</p>
            <div id="btnArea">
                <button class="fnbox" @click="signInAndsignOut('SignIn')">簽到</button>
                <button class="fnbox" @click="signInAndsignOut('SignOut')">簽退</button>
                <button class="fnbox" @click="goBack()">返回</button>
            </div>
            <div class="searchArea">
                <label for="">打卡紀錄</label>
                <div id="search-inputArea">
                    <div>
                        <label for="">員工編號:</label>
                        <input type="text"  v-model = " inputId " >
                    </div>
                    <div>
                        <label for="">員工姓名:</label>
                        <input type="text"  v-model = " inputName " >
                    </div>
                    <div>
                        <label for="">員工部門:</label>
                        <input type="text"  v-model = " inputDepartment " >
                    </div>
                    <div>
                        <label for="">開始時間:</label>
                        <input type="datetime-local" id="startTime" required v-model=" leaveStartDateTime">
                    </div>
                    <div>
                        <label for="">結束時間:</label>
                        <input type="datetime-local"  id="endTime" required  v-model=" leaveEndDateTime">
                    </div>
                </div>
                    <div class="searchbtnArea">
                        <button @click="searchSignInRecord">search</button>
                        <button @click="searchRecord">search2</button>
                        <button @click="clear">clear</button>
                    </div>
                <div class="showArea">
                    <table>
                        <tr>
                            <th>員工編號</th>
                            <th>簽到時間</th>
                            <th>簽退時間</th>
                            <th>簽到IP</th>
                            <th>簽退IP</th>
                            <th>工作時數</th>
                            <th>出勤狀況</th>
                        </tr>
                        <tr v-for="item in this.signInRecords">
                            <td>{{ item.employeeId }}</td>
                            <td>{{ formatDate(item.checkInTime) }}</td>
                            <td>{{ formatDate(item.checkOutTime) }}</td>
                            <td>{{ item.checkInIp }}</td>
                            <td>{{ item.checkOutIp }}</td>
                            <td>{{ item.attendanceHours }}</td>
                            <td>{{ item.attendanceStatus }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.searchArea{
    width: 100%;
    height: auto;
    
    label{
        color: whitesmoke;
    }

    #search-inputArea{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .searchbtnArea{
        display: flex;
        justify-content: center;
        margin: 2% 0;
    }

    button{
        margin: 0 10px;
    }

    .showArea{
        width: 100%;


        table{
            height: 100%;
            width: 100%;
            background-color: whitesmoke;
        }

        td{
            border: 1px black solid;
        }

        th{
            border: 1px black solid;
        }
    }
}

#btnArea{
    margin-top: 2%;
}

.mainArea{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2%;
}

#date {
	font-family: Arial, Helvetica, sans-serif;
	width:750px;
	margin: 100px auto 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 70px;
	padding: 35px;
	background-color: #3652AD;
	border-radius: 20px;
	border: 5px solid #E9F6FF;
	color: #E9F6FF;
	height: 100px;
	box-shadow: 0 0 10px #333;
}


.fnbox{
    width: 100px;
    height: 100px;
    background-color: rgb(254, 122, 54);
    margin: 0 5px ;
    padding: 5px;
}

.SignInBody{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;

}
</style>