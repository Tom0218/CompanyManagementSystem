<script>
import {mapState, mapActions} from 'pinia';
import { RouterLink,RouterView } from 'vue-router';
import userInfo  from'../stores/userInfo';
import StaffHeader from '../components/Staff/StaffHeader.vue';
export default{
    data(){
        return{
            userData:[],
            page : "1",
        }
    },

    mounted(){
        this.fetchUser();
    },

    components:{
        RouterLink,
        RouterView,
        StaffHeader
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

        goStaffSearch(){
            this.$router.push('StaffSearch')
        },
        goStaffCreate(){
            this.$router.push('StaffCreate')
        },
        goAccountActive(){
            this.$router.push('StaffUpdateActive')
        },
        goChangePwd(){
            this.$router.push('StaffChangePassword')
        },
        goBack(){
            this.$router.push('SelectFuntionPage')
        }

    

    }
}
</script>

<template>
    <div class="staffManage">
        <nav>
            <button class="fnbox" v-if="this.userData.jobPosition != 'General'"  @click="goStaffSearch">員工查詢</button>
            <button class="fnbox" v-if="this.userData.department == 'HR' || this.userData.department == 'admin'"  @click="goStaffCreate">員工新增</button>
            <button class="fnbox" v-if="this.userData.department == 'HR' || this.userData.department == 'admin'"  @click="goAccountActive">帳號啟用/停用</button>
            <button class="fnbox"   @click="goChangePwd">變更密碼</button>
            <button class="fnbox" @click="goBack">返回</button>  
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


</style>