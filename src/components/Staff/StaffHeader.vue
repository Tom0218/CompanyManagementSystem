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
        <RouterLink to="/Staff/StaffSearch" >員工查詢</RouterLink>
        <RouterLink to="/Staff/StaffCreate" >員工新增</RouterLink>
        <RouterLink to="/Staff/StaffDelete" >員工刪除</RouterLink>
        <RouterLink to="/Staff/StaffUpdate" >員工修改</RouterLink>
    </nav>
</template>

<style lang="scss" scoped> 
a{
    color: whitesmoke;
    margin:  0 10px;
}
nav{
    height: auto;
    width: 100vw;
    background-color: #092635;
}
</style>