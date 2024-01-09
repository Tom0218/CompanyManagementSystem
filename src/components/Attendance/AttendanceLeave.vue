<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../../stores/userInfo';
export default{
    data(){
        return{
            //pinia 
            userData:[],

            employeeId:"",
            employeeDepartment:"",
            leaveType:"",
            leaveStartDateTime:"",
            leaveEndDateTime:"",
            totalHours:0,
            leaveReason:'',
            reviewerId:"",
            appliedDateTime:"",
            updateDateTime:"",
            certification:"",
            //searchsupervisor
            reviewerId:"",
            supervisorList : [],

        }
    },

    mounted(){
        this.fetchUser();
        this.searchSupervisor();
    },

    computed:{
    // 使用 mapState 将 state 映射到组件的计算属性
    //參數:  資料庫,要用的 state & getters
    ...mapState(userInfo ,["user"]),
    },
    watch: {
        leaveStartDateTime: function (newVal, oldVal) {
            this.calculateWorkHours();
        },
        leaveEndDateTime: function (newVal, oldVal) {
            this.calculateWorkHours();
        },
    },

    methods:{
        ...mapActions(userInfo ,["setUser",'getUser']),
        async fetchUser() {
        // 触发从后端获取用户数据的操作
        this.userData = this.getUser();
        },

        //送出假單
        sendLeaveApply(){
            const requestData = {
                employee_id: this.employeeId,
                employee_department: this.employeeDepartment,
                leave_type: this.leaveType,
                leave_start_datetime: this.leaveStartDateTime,
                leave_end_datetime: this.leaveEndDateTime,
                total_hour: this.totalHours,
                reviewer_id: this.reviewerId,
                certification:this.certification
            }
             // 发送POST请求
            fetch('http://localhost:8080/api/attendance/leaveApplication/apply', {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                //api session不同要加
                "Access-Control-Allow-Credentials":true  
            },
            credentials:'include',
            body: JSON.stringify(requestData),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
                // 处理错误
            });
        },
        //搜尋主管
        searchSupervisor() {
            const url = 'http://localhost:8080/api/employee/SearchSupervisor';
            const queryParams = new URLSearchParams({
                department: this.userData.department,
            });

            // 将查询字符串附加到 URL
            const urlWithParams = `${url}?${queryParams}`;

            fetch(urlWithParams, {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            })
                .then(response => {
                // 将API响应转换为JSON格式
                return response.json();
                })
                .then(data => {
                    this.supervisorList = data.employeeList
                    console.log(data)
                })
                .catch(error => {
                console.error('Error fetching supervisor:', error);
                });
        },

        //計算小時數
        calculateWorkHours() {
            const startTime = new Date(this.leaveStartDateTime);
            const endTime = new Date(this.leaveEndDateTime);

            // 計算時間差，單位為毫秒
            let timeDifference = endTime - startTime;

            // 驗證時間差是否為有效數字
            if (isNaN(timeDifference)) {
                this.totalHours = '日期和時間格式不正確';
                return;
            }

            // 每跨一天減去16小時
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            timeDifference -= daysDifference * (1000 * 60 * 60 * 24);
            const hours = timeDifference / (1000 * 60 * 60);


            // 減去16小時
            const adjustedHours = hours - (daysDifference * 16);

            // 將總時數轉換為半小時的倍數
            const totalHoursInHalfHourUnits = Math.ceil(adjustedHours * 2) / 2;

            // 更新 totalHours 數據
            this.totalHours = "總時數: " + totalHoursInHalfHourUnits.toFixed(2) + " 小時";
            console.log(this.totalHours);
        },
    }
}
</script>
<template>
    <div class="mainArea">
            <label for="">員工部門 : {{this.userData.department}}</label>
            <label for="">姓名 : {{ this.userData.name }}</label>
        <div>
            <label for="">假別 :</label>
            <select name="" id="" v-model="leaveType">
                <option value="">選擇假別</option>
                <option value="officialLeave">公假</option>
                <option value="personalLeave">事假</option>
                <option value="sickLeave">病假</option>
                <option value="annualLeave">年假</option>
                <option value="funeralLeave">喪假</option>
                <option value="maternityLeave">產假</option>
                <option value="menstruationLeave">生理假</option>
                <option value="Pre-MaternityLeave">陪產假</option>
                <option value="maritalLeave">婚假</option>
                <option value="特休">特休</option>
            </select>
        </div>
        <div>
            <label for="">請假原因:</label>
            <input type="text" name="" id="" required >
        </div>
        <div>
            <label for="">開始時間:</label>
            <input type="datetime-local" id="startTime" required v-model="this.leaveStartDateTime">
        </div>
        <div>
            <label for="">結束時間:</label>
            <input type="datetime-local"  id="endTime" required  v-model="this.leaveEndDateTime">
        <!-- </div>
        <label for="" id="totalHours">總時數:{{ this.totalHours }}</label>
        <div> -->
            <label for="">審核主管:</label>
            <select name="" id="" v-model="this.reviewerId">
                <option value="">選擇主管</option>
                <option v-for="(reviewer, index) in this.supervisorList" :key="index" value = reviewer.name>
                {{ reviewer.name }}
            </option>
            </select>
        </div>
        <div>
            <label for="">佐證文件:</label>
            <input type="file" name="" id="" >
        </div>
        <div>
            <button @click="sendLeaveApply">送出</button>
            <button @click="cancel">取消</button>
        </div>

    </div>
</template>
<style lang="scss">

.mainArea{
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
p{
    color: whitesmoke;
    margin: 0;
}
th{
    color: whitesmoke;
    border: 1px whitesmoke solid;
}
tr{
    color: whitesmoke;
    border: 1px whitesmoke solid;
}
td{
    color: whitesmoke;
    border: 1px whitesmoke solid;
}
label{
    color: whitesmoke;
}
ul{
    color:  whitesmoke;
}
li{
    color: whitesmoke;
}
</style>