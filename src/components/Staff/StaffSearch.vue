<script>
export default{
    data(){
        return{
            id:"",
            name:"",
            department:"",
        }
    }
}
</script>

<template>
<!-- ▪ 員工資料查詢
▪ 可以員編、姓名、部門模糊查詢，全部無值則顯示全部；相關權限如前頁所示
▪ 一般員工只能查詢自己的個人資料 -->
    <div class="StaffSearchBody">
        <h1>員工搜尋</h1>
        <label for="">員工編號 :</label>
        <input type="text" name="" id="id" v-model="id">
        <br/>
        <label for="">員工姓名 :</label>
        <input type="text" name="" id="name" v-model="name">
        <br/>
        <label for="">員工部門 :</label>
        <input type="text" name="" id="department" v-model="department">
        <br/>
        <button @click="search">搜尋</button>
        <button @click="clear">清空條件</button>
    </div>
    <div>

    </div>
</template>
<style lang="scss" scoped>
#id,#name,#department{
    margin-left: 5px;
}

label{
    color: whitesmoke;
}
.StaffSearchBody{
    height: 100vh;
    width: 100vw;
    background-color: #092635;
}
</style>