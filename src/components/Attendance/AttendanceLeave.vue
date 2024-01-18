<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../../stores/userInfo';

export default{
    data(){
        return{
            //pinia 
            userData:[],

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

        //佐證圖片
        handleFileChange(event){
            // 獲取文件資料
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload =(e)=> {
                    // 將讀取到的照片賦予值給預覽img的src
                    const addFacility = document.getElementById('certificationIMG');
                    // 顯示預覽img
                    addFacility.src = e.target.result;
                    addFacility.style.display= 'block';

                    this.certification = e.target.result;
                    console.log(e.target.result)
                    console.log(typeof e.target.result)
                }
                // 讀取文件內容
                reader.readAsDataURL(file);
            }
        },
        

        //取消
        cancel(){
            this.$router.push('/Attendance')
        },

        //送出假單
        sendLeaveApply(){
            var appliedDateTime = new Date();

            const requestData = {
                employeeId: this.userData.id,
                employeeDepartment: this.userData.department,
                leaveType: this.leaveType,
                leaveStartDatetime: this.leaveStartDateTime,
                leaveEndDatetime: this.leaveEndDateTime,
                leaveReason : this.leaveReason,
                totalHour: this.totalHours,
                reviewerId: this.reviewerId,
                photoBase64:this.certification,
                appliedDatetime: appliedDateTime,
            }
            console.log(requestData)
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
                alert(data.rtnCode)
                if(data.rtnCode == "SUCCESSFUL"){
                    this.leaveType = "";
                    this.leaveStartDatetime = ""; 
                    this.leaveEndDatetime =  "";
                    this.leaveReason  =  "";
                    this.totalHour  =  0;
                    this.reviewerId =  "";
                    this.certification =  "";
                } 
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
            this.totalHours =  parseInt(totalHoursInHalfHourUnits.toFixed(2));
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
                <option value="OFFICIAL">公假</option>
                <option value="PERSONAL">事假</option>
                <option value="SICK">病假</option>
                <option value="ANNUAL">特休</option>
                <option value="FUNERAL">喪假</option>
                <option value="MATERNITY">產假</option>
                <option value="MENSTRUATION">生理假</option>
                <option value="PRE_MATERNITY">陪產假</option>
                <option value="MARITAL">婚假</option>
            </select>
        </div>
        <div>
            <label for="">請假原因:</label>
            <input type="text" name="" id="" required  v-model="leaveReason">
        </div>
        <div>
            <label for="">開始時間:</label>
            <input type="datetime-local" id="startTime" required v-model="leaveStartDateTime">
        </div>
        <div>
            <label for="">結束時間:</label>
            <input type="datetime-local"  id="endTime" required  v-model="leaveEndDateTime">
        <!-- </div>
        <label for="" id="totalHours">總時數:{{ this.totalHours }}</label>
        <div> -->
        </div>
        <div>
            <label for="">審核主管:</label>
            <select name="" id="" v-model="reviewerId">
                <option value="">選擇主管</option>
                <option v-for="(reviewer, index) in supervisorList" :key="index" :value="reviewer.id">
                    {{ reviewer.name }}
                </option>
            </select>

        </div>
        <div>
            <label for="">佐證文件:</label>
            <input type="file" name=""  @change="handleFileChange">
            <img id="certificationIMG" src="" ref="previewImg" style="display: none;  max-width: 200px; max-height: 200px;" >
        </div>
        <div>
            <button @click="sendLeaveApply" >送出</button>
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