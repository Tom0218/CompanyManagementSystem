<script>

export default{
    data(){
        return{
            departments:[],
            active:""
        }
    },
    methods:{
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
                console.log(this.departments)
            })
        }
    },
    mounted(){
        this.SearchAllDepartmentData()
    }
}

</script>
<template>
    <div class="StaffCreateBody">
        <label for="">編號 :</label>
        <input type="text">
        <br/>
        <label for="">部門 :</label>
        <select name="" id="">
            <option value="" disabled selected>選擇部門</option>
                    <option v-for="(dep, index) in departments" :key="index" >
                        {{ dep.name }}
                    </option>
        </select>
        <br/>
        <label for="">姓名 :</label>
        <input type="text">
        <br/>
        <label for="">密碼 :</label>
        <input type="text">
        <br/>
        <label for="">信箱 :</label>
        <input type="text">
        <br/>
        <label for="">啟用 :</label>
        <label for="">是</label>
            <input type="radio" value = true name="active" v-model="this.active"><label for=""></label>
            <label for="">否</label>
            <input type="radio" value = false name="active" v-model="this.active"><label for=""></label>
        <br/>
        <label for="">職位 :</label>
        <input type="text">
        <br/>
        <label for="">生日 :</label>
        <input type="date">
        <br/>
        <label for="">到職日期 :</label>
        <input type="date">
        <br/>
        <button>新增員工</button>
        <button>取消</button>
    </div>
</template>
<style lang="scss" scoped>


label{
    color: whitesmoke;
    font-weight: bold;
}
.StaffCreateBody{
    height: 100vh;
    width: 100vw;
    background-color: #092635;
}
</style>