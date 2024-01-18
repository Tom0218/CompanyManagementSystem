<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../../stores/userInfo';
import { RouterLink,RouterView } from 'vue-router';

export default{
    data(){
        return{
            userData:[],
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
        RouterLink,
    },

    methods:{
        ...mapActions(userInfo ,["setUser",'getUser']),
        async fetchUser() {
            // 触发从后端获取用户数据的操作
            this.userData = this.getUser();
            console.log('Fetched userData(leave):', this.userData);    
        },

    }
}

</script>
<template>
    <nav>
        <RouterLink to="/Attendance/AttendanceLeave" class="fnbox">假單申請</RouterLink>
        <RouterLink to="/Attendance/LeaveApplicationReview" class="fnbox" v-if="this.userData.jobPosition != 'General' ">假單審核</RouterLink>
        <RouterLink to="/SelectFuntionPage" class="fnbox">返回</RouterLink>
    </nav>
</template>
<style lang="scss" scoped>
.fnbox{
    height: 100%;
    background-color: #5C8374;
    margin: 0 5px ;
    padding: 5px;
}

a{
    height: 10vh;
    color: whitesmoke;
    text-decoration: none;
}

nav{
    height: auto;
    width: 100vw;
    background-color: #092635;
    display: flex;
}
</style>