<script>
import { RouterLink } from 'vue-router';
import Header from '../components/Attendance/AttendanceHeader.vue'

export default{
    components:{
        Header,
        RouterLink,
    },
    methods:{
        goBack(){
            this.$router.push('SelectFuntionPage');
        },

        goApply(){
            this.$router.push('AttendanceLeave');
        },

        goReview(){
            this.$router.push('LeaveApplicationReview');
        }
    }
}

</script>
<template>
    <div class="staffManage">
        <nav>
            <button class="fnbox"  @click="goApply">假單申請</button>
            <button class="fnbox"  @click="goReview">假單審核</button>
            <button class="fnbox"  @click="goBack">返回</button>  
        </nav>
    </div>
</template>
<style lang="scss" scoped>
.fnbox{
    height: 100px;
    background-color: rgb(254, 122, 54);
    margin: 0 5px ;
    padding: 5px;
}

h1{
    color: whitesmoke;
}
.AttendanceBody{
    height: 100vh;
    width: 100vw;
    background-color: rgb(40, 2, 116);
}

.staffManage{
    width: 70vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>