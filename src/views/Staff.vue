<script>
import { RouterLink,RouterView } from 'vue-router';
export default{
    data(){
        return{
            page: "1",
        }
    },

    components:{
        RouterLink,
        RouterView,
    },

    methods:{
        //page control
        pageControl(){
            this.page = 2;
        },

        goSearch(){
            this.page = "search";
        },
        goCreate(){
            this.page = "create";
        },
        goDelete(){
            this.page = "delete";
        },
        goUpdate(){
            this.page = "update";
        }
    }
}
</script>

<template>
    <div class="StaffBody" v-if="this.page == 1">
        <nav>
            <!-- <label @click="goSearch" style="cursor: pointer;">員工查詢</label>
            <label @click="goCreate" style="cursor: pointer;">員工新增</label>
            <label @click="goDelete" style="cursor: pointer;">員工刪除</label>
            <label @click="goUpdate" style="cursor: pointer;">員工修改</label> -->
            <RouterLink to="/Staff/StaffSearch" @click="pageControl">員工查詢</RouterLink>
            <RouterLink to="/Staff/StaffCreate" @click="pageControl">員工新增</RouterLink>
            <RouterLink to="/Staff/StaffDelete" @click="pageControl">員工刪除</RouterLink>
            <RouterLink to="/Staff/StaffUpdate" @click="pageControl">員工修改</RouterLink>
        </nav>
    </div>
    <div v-if="this.page == 2">
        <RouterView/>
    </div>
</template>

<style lang="scss" scoped>
a{
    color: whitesmoke;
    margin: 0 10px;
}

label{
    color: whitesmoke;
    margin: 0 20px;
    font-weight: bold;
}

h1{
    color: whitesmoke;
}
.StaffBody{
    height: 100vh;
    width: 100vw;
    background-color: #092635;
}
</style>