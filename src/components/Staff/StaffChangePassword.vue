<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../../stores/userInfo';
export default{
    data(){
        return{
            oldPwd:"",
            newPwd:"",
            makeSurePwd:"",
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
    
    methods:{
        ...mapActions(userInfo ,["setUser",'getUser']),
        async fetchUser() {
        // 触发从后端获取用户数据的操作
        this.userData = this.getUser();
        // console.log('Fetched userData:', this.userData);
        },

        cancel(){
            this.$router.push('/SelectFuntionPage');
        },

        changePwd(){
            if(this.makeSurePwd != this.newPwd){
                alert("密碼不一致!!")
                return
            }

            const requestData = {
                id: this.userData.id,
                old_password:this.oldPwd,
                new_password:this.newPwd,
            };

            // 发送POST请求
            fetch('http://localhost:8080/api/attendance/employee/change_password', {
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
                // 处理API响应
                console.log(data);
                if(data.rtnCode =="SUCCESSFUL"){
                    alert(data.rtnCode)
                    this.newPwd = "";
                    this.oldPwd = "";
                    this.makeSurePwd = "";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // 处理错误
            });
        },
    }
}

</script>
<template>
    <div class="changePwdBody">
        <div class="inputArea">
            <label>員工編號: {{ this.userData.id  }}</label>
            <br/>
            <label>舊密碼:</label>
            <input type="text" v-model="this.oldPwd">
            <br/>
            <label>新密碼:</label>
            <input type="text" v-model="this.newPwd">
            <br/>
            <label>確認密碼:</label>
            <input type="text" v-model="this.makeSurePwd">
            <br/>
        </div>
        <button @click="changePwd()">確認</button>
        <button @click="cancel">取消</button>
    </div>
</template>
<style lang="scss" scoped>
.inputArea{
    width: 30%;
    display: flex;
    flex-direction: column;
}
label{
    color: whitesmoke;
}
.changePwdBody{
    width: 100vw;
    background-color: #092635;
}
</style>