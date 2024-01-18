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
    <div class="staffManage">
        <nav>
            <div class="fnbox" v-if="this.userData.jobPosition != 'General'" ><RouterLink to="/Staff/StaffSearch" ><p>員工查詢</p></RouterLink></div>
            <div class="fnbox" v-if="this.userData.department == 'HR' || this.userData.department == 'admin'"><RouterLink to="/Staff/StaffCreate" ><p>員工新增</p></RouterLink></div>
            <div class="fnbox" v-if="this.userData.department == 'HR' || this.userData.department == 'admin'"><RouterLink to="/Staff/StaffUpdateActive" ><p>帳號啟用/停用</p></RouterLink></div>
            <div class="fnbox"><RouterLink to="/Staff/StaffChangePassword" ><p>變更密碼</p></RouterLink></div>
            <div class="fnbox"><RouterLink to="/staff" ><p>返回</p></RouterLink></div>    
        </nav>
    </div>
</template>

<style lang="scss" scoped> 
.staffManage{
    width: 70vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fnbox{
    height: 100px;
    background-color: rgb(254, 122, 54);
    margin: 0 5px ;
    padding: 5px;
}

a{
    color: whitesmoke;
    margin:  0 10px;
    text-decoration: none;
}
nav{
    display: flex;
}

p{
    font-size: 16pt;
    font-weight: bold;
    margin: 0;
}
</style>