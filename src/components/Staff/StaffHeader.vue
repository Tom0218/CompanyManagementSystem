<script>
import { RouterLink,RouterView } from 'vue-router';
export default{
    components:{
        RouterLink,
        RouterView,
    },
}
</script>

<template>
    <nav>
        <div class="fnbox"><RouterLink to="/Staff/StaffSearch" >員工查詢</RouterLink></div>
        <div class="fnbox"><RouterLink to="/Staff/StaffCreate" >員工新增</RouterLink></div>
        <div class="fnbox"><RouterLink to="/Staff/StaffUpdate" >員工修改</RouterLink></div>
        <div class="fnbox"> <RouterLink to="/Staff/StaffDelete" >員工刪除</RouterLink></div>
        <div class="fnbox"><RouterLink to="/SelectFuntionPage" >返回</RouterLink></div>    
    </nav>
</template>

<style lang="scss" scoped> 
a{
    text-decoration: none;
}
.fnbox{
    height: 100%;
    background-color: #5C8374;
    margin: 0 5px ;
    padding: 5px;
}
a{
    color: whitesmoke;
    margin:  0 10px;
}
nav{
    height: auto;
    width: 100vw;
    background-color: #092635;
    display: flex;
}
</style>