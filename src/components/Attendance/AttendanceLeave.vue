<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../../stores/userInfo';
export default{
    data(){
        return{
            userData:[],//pinia 
            serialNum:"",
            applicationNum:"",
            employeeId:"",
            employeeDepartment:"",
            leaveType:"",
            leaveStartDateTime:"",
            leaveEndDateTime:"",
            totalHour:0,
            leaveReason:'',
            reviewerId:"",
            reviewDateTime:"",
            reviewStatus:"",
            rejectReason:"",
            appliedDateTime:"",
            updateDateTime:"",
            certification:"",




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
        console.log('Fetched userData:', this.userData);
        },
    }
}
</script>
<template>
    <table>
        <tr>
            <th>流水號 :</th>
            <td>{{ this.employee.id }}</td>
        </tr>
    </table>

</template>
<style lang="scss">
</style>