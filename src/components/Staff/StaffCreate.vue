<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../../stores/userInfo';

export default{
    data(){
        return{
            userData:[],
            departments:[], //search
            id :"",
            department:"",
            name:"",
            pwd:"",
            email:"",
            active:false,
            jobPosition:"",
            birthDate:"",
            arrivalDate:""
        }
    },
    computed:{
    // 使用 mapState 将 state 映射到组件的计算属性
    //參數:  資料庫,要用的 state & getters
    ...mapState(userInfo ,["user"]),

    },
    methods:{
        //Pinia
        ...mapActions(userInfo ,["setUser",'getUser']),
        async fetchUser() {
        // 触发从后端获取用户数据的操作
        this.userData = this.getUser();
        // console.log('Fetched userData:', this.userData);
        // 在这里你可以使用从后端获取的用户数据进行其他操作
        },

        goBack(){
            this.$router.push('Staff')
        },

        //create
        addNewEmployees(){
            if(this.userData.jobPosition == 'Getneral'){
                alert('Unauthorizated')
                return
            }
            console.log("id"+this.userData.id)
            const requestData = {
                creatorId:this.userData.id,
                id: this.id,
                department: this.department,
                name: this.name,
                password:this.pwd,
                email: this.email,
                active: this.active,
                jobPosition: this.jobPosition,
                birthDate: this.birthDate,
                arrivalDate:this.arrivalDate,
            };

            // 发送POST请求
            fetch('http://localhost:8080/api/attendance/employee/create', {
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
                    this.id ="",
                    this.department ="",
                    this.name = "",
                    this.pwd = "",
                    this.eamil = "",
                    this.active = false,
                    this.jobPosition = "",
                    this.birthDate = "",
                    this.arrivalDate = ""
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // 处理错误
            });
        },
        //搜尋所有部門(select)
        SearchAllDepartmentData() {
            const url = 'http://localhost:8080/api/department/searchAll';
            const queryParams = new URLSearchParams({
            });

            // 將查詢字串附加到 URL
            const urlWithParams = `${url}?${queryParams}`;

            fetch(urlWithParams, {
                method: "GET",
                headers: new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }),
            })
            .then(response => {
                // 將API回應轉換為JSON格式
                return response.json();
            })
            .then(data => {
                // 將API回應的JSON數據設置到組件的responseData數據屬性中
                this.departments = data.departments;
                // console.log(this.departments)
            })
        }
    },
    mounted(){
        this.SearchAllDepartmentData();
        this.fetchUser();
    }
}

</script>
<template>
    <div class="StaffCreateBody">
        <table>
            <label for="">編號 :</label>
            <input type="text" v-model="this.id">
            <br/>
            <label for="">部門 :</label>
            <select name="" id="" v-model="this.department">
                <option value="" disabled selected>選擇部門</option>
                <option v-for="(dep, index) in departments" :key="index" >
                    {{ dep.name }}
                </option>
            </select>
            <br/>
            <label for="" >姓名 :</label>
            <input type="text" v-model="this.name">
            <br/>
            <label for="">密碼 :</label>
            <input type="text" v-model="this.pwd">
            <br/>
            <label for="">信箱 :</label>
            <input type="text" v-model="this.email">
            <br/>
            <label for="">啟用 :</label>
            <label for="">是</label>
                <input type="radio" value = true name="active" v-model="this.active"><label for=""></label>
                <label for="">否</label>
                <input type="radio" value = false name="active" v-model="this.active"><label for=""></label>
            <br/>
            <label for="">職位 :</label>
            <input type="text" v-model="this.jobPosition">
            <br/>
            <label for="">生日 :</label>
            <input type="date" v-model="this.birthDate">
            <br/>
            <label for="">到職日期 :</label>
            <input type="date" v-model="this.arrivalDate">
            <br/>
            <button @click="addNewEmployees">新增員工</button>
            <button @click="goBack">取消</button>
        </table>
    </div>
</template>
<style lang="scss" scoped>


label{
    color: whitesmoke;
    font-weight: bold;
}
.StaffCreateBody{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

}
</style>