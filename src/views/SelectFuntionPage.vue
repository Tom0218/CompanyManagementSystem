<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../stores/userInfo';
import { RouterLink} from 'vue-router';

export default{
    data(){
        return{
            userData:[],
        }
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

        logout(){
            var url = "http://localhost:8080/api/attendance/logout";
            var data = {};
            fetch(url, {
                method: "POST", // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }),
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                console.log("logout", response,)
            });
        },
        goHomePage(){
            this.$router.push("/")
        },
        goSignIn(){
            this.$router.push("/SignIn")
        },
        goAttendance(){
            this.$router.push("/Attendance")
        },
        goPayRoll(){
            this.$router.push("/Payroll")
        },
        goLogIn(){
            this.$router.push("/LogIn")
        }

    },
    components:{
        RouterLink
    }
}
</script>
<template>
    <div class="mainArea">
        <div class="fnArea">
            <div class="fnbox"><RouterLink to="/PersonalInformation" class="Btn"><p>個人檔案</p></RouterLink> </div>
            <div class="fnbox"><RouterLink to="/SignIn" class="Btn"><p>簽到(未完成)</p></RouterLink> </div>
            <div class="fnbox"><RouterLink to="/Staff" class="Btn"><p>員工管理</p></RouterLink></div>
            <div class="fnbox"><RouterLink to="/Attendance" class="Btn "><p>差勤管理(未完成)</p></RouterLink></div>
            <div class="fnbox"><RouterLink to="/Payroll" class="Btn"><p>薪資管理(未完成)</p></RouterLink></div>
            <div class="fnbox"><RouterLink to="/" class="Btn" @click="logout"><p>登出</p></RouterLink></div>         
        </div>
    </div>
    
</template>
<style lang="scss" scoped>
.fnArea{
        height: 50vh;
    width: 70vw;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: rgb(54, 82, 173);
    
}
.fnbox{
    height: 100px;
    background-color: rgb(254, 122, 54);
    margin: 0 5px ;
    padding: 5px;
}

p{
    font-size: 16pt;
    font-weight: bold;
    margin: 0;
}

.mainArea{
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(40, 2, 116);
}

.Btn{
    color: whitesmoke;
    font-size: 16pt;
    margin:  0 20px;
    text-decoration: none;
    text-align: center;
    }

</style>