<script>
import { RouterLink,RouterView } from 'vue-router';
import Header from '../components/Attendance/AttendanceHeader.vue'

export default{
    components:{
        Header,
        RouterLink,
        RouterView
    }
}

</script>
<template>
    <div class="AttendanceBody">
        <Header/>
        <RouterView/>
    </div>
</template>
<style lang="scss" scoped>
h1{
    color: whitesmoke;
}
.AttendanceBody{
    height: 100vh;
    width: 100vw;
    background-color: #092635;
}
</style>