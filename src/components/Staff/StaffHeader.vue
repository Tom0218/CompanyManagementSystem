<script>
import {mapState, mapActions} from 'pinia';
import { RouterLink,RouterView } from 'vue-router';
import userInfo  from'../../stores/userInfo';

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
        RouterView,
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
    <nav>
        <div class="fnbox" v-if="this.userData.jobPosition != 'General'"><RouterLink to="/Staff/StaffSearch" >員工查詢</RouterLink></div>
        <div class="fnbox" v-if="this.userData.department == 'HR' || this.userData.department == 'admin'"><RouterLink to="/Staff/StaffCreate" >員工新增</RouterLink></div>
        <div class="fnbox" v-if="this.userData.department == 'HR' || this.userData.department == 'admin'"><RouterLink to="/Staff/StaffUpdateActive" >帳號啟用/停用</RouterLink></div>
        <div class="fnbox"><RouterLink to="/Staff/StaffChangePassword" >變更密碼</RouterLink></div>
        <div class="fnbox"><RouterLink to="/SelectFuntionPage" >返回</RouterLink></div>    
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
    color: whitesmoke;
    margin:  0 10px;
    text-decoration: none;
}
nav{
    height: auto;
    width: 100vw;
    background-color: #092635;
    display: flex;
}
</style>