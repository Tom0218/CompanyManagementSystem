<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../stores/userInfo';
import { RouterLink } from 'vue-router';

export default{
    data(){
        return{
            employee:[],
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

    components:{
        RouterLink
    },

    methods:{
        ...mapActions(userInfo ,["setUser",'getUser']),
        async fetchUser() {
        // 触发从后端获取用户数据的操作
        this.employee = this.getUser();
        // console.log('Fetched userData:', this.employee);
        },
    }
}
</script>
<template>
    <div class="info">
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
                <th>特休(餘) :</th>
                <td>{{ this.employee.annualLeave }}</td>
            </tr>
            <tr>
                <th>病假(餘) :</th>
                <td>{{ this.employee.sickLeave }}</td>
            </tr>
        </table>
        <RouterLink to="/SelectFuntionPage" class="fnbox"><p>返回</p></RouterLink>
    </div>

</template>
<style lang="scss" scoped>
.info{
    width: 70vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

table{
    height: 60%;
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
</style>