<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../../stores/userInfo';

export default{
    data(){
        return{
            userData:[],
            applyList:[],
            apply:[],

            applicationNo:"",
            employeeId:"",
            userInput:"",
            rejectReason:""

        }
    },

    mounted(){
        this.fetchUser();
        this.getLeaveApply();
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
        },

        goBack(){
            this.$router.push('Attendance')
        },

        close(){
            this.apply = "";
            const img = document.getElementById('certificationIMG');
            img.src =  "";
            img.style.display = 'none'; // 顯示圖片
        },

        //查看請假單
        checkApply(index){
            this.apply = [] ;
            const img = document.getElementById('certificationIMG');
            img.src =  ""
            this.apply = this.applyList[index]
            console.log(this.applyList[index].leaveType)
            if (this.applyList[index].leaveType === 'OFFICIAL' || this.applyList[index].leaveType === 'SICK') {   
                this.apply = this.applyList[index] ;
                console.log (this.apply);
                img.src =  this.apply.certification;
                img.style.display = 'block'; // 顯示圖片
            }
            this.apply = this.applyList[index]
        },

        //審核
        review(){
    
            if (this.apply.leaveType === 'OFFICIAL' || this.apply.leaveType === 'SICK' && this.certification === null) {
                alert('Lack certification');
            }

               // Replace these values with actual reviewerId and applicationNo
            const reviewerId = this.userData.id;
            const applicationNo = this.apply.applicationNo;

            // Set the base URL of the API
            const baseUrl = 'http://localhost:8080'; // Replace with your actual API base URL

           // Set the endpoint URL
            const endpointUrl = `${baseUrl}/api/attendance/leaveApplication/review`;

            // Prepare the request body data
            const formData = new FormData();
            formData.append('reviewerId', reviewerId);
            formData.append('applicationNo', applicationNo);

            // Make the POST request using fetch
            fetch(endpointUrl, {
            method: 'POST',
            body: formData,
            })
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data
                alert(data.rtnCode);
            })
            .catch(error => {
                // Handle errors
                console.error(error);
            });
        },

        //日期格式
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

        //取得請假申請
        getLeaveApply(){
            if(this.userInput.length != ""){
                if(this.userInput.length > 15){
                    this.applicationNo = this.userInput
                }else if(this.userInput.length >= 1) {
                    this.employeeId = this.userInput
                }
            }

            const url = 'http://localhost:8080/api/attendance/leaveApplication/findApply';
            const reviewerId = this.userData.id;
            const applicationNo = this.applicationNo;
            const employeeId = this.employeeId; 

            // 将查询参数拼接到 URL
            // const urlWithParams = `${url}?reviewerId=${reviewerId}`;
            const urlWithParams = `${url}?reviewerId=${reviewerId}&applicationNo=${applicationNo}&employeeId=${employeeId}`;

            fetch(urlWithParams, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.applyList = data
                for(let i = 0; i < this.applyList.length; i++){
                    if(this.applyList[i].leaveType == "SICK" || this.applyList[i].leaveType == 'OFFICIAL'){
                        this.applyList[i].certification = "data:image/jpeg;base64,"+  this.applyList[i].certification;
                    }
                }
                console.log( this.applyList);

                // 处理返回的数据
                this.applicationNo = "";
                this.employeeId = "";
                this.userInput = "";
            })
            .catch(error => {
                console.error('Error fetching:', error);
            });

        }
    }
}
</script>
<template>
<div class="leaveApplicationReviewBody">
    <div>
        <input type="text" placeholder="員工編號/假單編號" v-model="userInput">
        <button @click="getLeaveApply">search </button>
        <button @click="this.userInput = ''"> clear</button>
        <button @click="goBack">返回</button>
    </div>
    <table>
        <tr>
            <td>假單編號</td>
            <td>狀態</td>
            <td>部門</td>
            <td>員工編號</td>
            <td>假別</td>
            <td>申請時間</td>
        </tr>
        <tr v-for=" (item,index) in applyList"  :key="index">
                <td>  
                    <button type="button" class="btn btn-primary button" data-bs-toggle="modal" data-bs-target="#exampleModal" :key="index"  @click="checkApply(index)">
                        {{ item.applicationNo }}
                    </button>
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">假單審核</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label >假單編號 : {{ this.apply.applicationNo }} </label>
                                    <br/>
                                    <label >員工編號 : {{ this.apply.employeeId }} </label>
                                    <br/>
                                    <label >員工部門 : {{ this.apply.employeeDepartment }} </label>
                                    <br/>
                                    <label >申請假別 : {{ this.apply.leaveType }} </label>
                                    <br/>
                                    <label >申請時間 : {{  formatDate(this.apply.appliedDatetime) }} </label>
                                    <br/>
                                    <label >總時數 : {{ this.apply.totalHour }} </label>
                                    <br/>
                                    <label for="">審核狀態 : </label>
                                    <label  :class="{ 'green-text':  this.apply.reviewStatus === 'Pass' }"> {{  this.apply.reviewStatus }} </label>
                                    <br/>
                                    <!-- 公假、事假需要佐證文件 -->
                                    <label>佐證文件 : </label>
                                    <img  id="certificationIMG" src="" ref="previewImg" style="display: none;  max-width: 200px; max-height: 200px;">
                                    <br/>
                                    <!-- <label>原因 : </label>
                                    <input type="text" v-model="this.rejectReason">
                                    <br/> -->
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Close</button>
                                    <button type="button" class="btn btn-secondary" @click="review">Pass</button>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="review" >Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td :class="{ 'green-text': item.reviewStatus === 'Pass' }" >{{ item.reviewStatus }}</td>
                <td>{{ item.employeeDepartment }}</td>
                <td>{{ item.employeeId}}</td>
                <td>{{ item.leaveType}}</td>
                <td>{{ formatDate( item.appliedDatetime) }}</td>
        </tr>
    </table>
</div>
</template>
<style lang="scss" scoped>
.red-text {
    color: red;
  /* You can adjust the styling based on your requirements */
}

.green-text {
    color: green;
  /* You can adjust the styling based on your requirements */
}

.button{
    color: black;
    background-color: whitesmoke;
    border: none;
}

td{
    color:black;
    border: 1px black solid;
    
}
table{
    width: 80%;
    // margin:  0 10%;
    background-color: whitesmoke;
}
.leaveApplicationReviewBody{
    width: 100vw;
    display:flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
}
</style>