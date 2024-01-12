<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../../stores/userInfo';

export default{
    data(){
        return{
            userData:[],
            applyList:[],

            applicationNo:"",
            employeeId:"",
            userInput:"",
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

        //審核
        revew(){

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
        <button @click="getLeaveApply">search</button>
        <button @click="this.userInput = ''">clear</button>
    </div>
    <table>
        <tr>
            <td>假單編號</td>
            <td>部門</td>
            <td>員工編號</td>
            <td>假別</td>
            <td>申請時間</td>
        </tr>
        <tr v-for="apply in this.applyList">
                <td @click="revew">{{ apply.applicationNo }}</td>
                <td>{{ apply.employeeDepartment }}</td>
                <td>{{ apply.employeeId}}</td>
                <td>{{ apply.leaveType}}</td>
                <td>{{ formatDate( apply.appliedDatetime) }}</td>
        </tr>
    </table>

</div>
</template>
<style lang="scss" scoped>
td{
    border: 1px black solid;
    
}
table{
    width: 80%;
    // margin:  0 10%;
    background-color: whitesmoke;
}
.leaveApplicationReviewBody{
width: 100vw;

}
</style>