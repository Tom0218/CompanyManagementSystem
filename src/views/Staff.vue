<script>
import { RouterLink,RouterView } from 'vue-router';
import StaffHeader from '../components/Staff/StaffHeader.vue';
export default{
    data(){
        return{
            
        }
    },

    components:{
        RouterLink,
        RouterView,
        StaffHeader
    },
}
</script>

<template>
        <!-- <StaffHeader/> -->
        <div class="context">
            <RouterView/>
        </div>
</template>

<style lang="scss" scoped>
.context{
    height: 100vh;
}

label{
    color: whitesmoke;
    margin: 0 20px;
    font-weight: bold;
}

h1{
    color: whitesmoke;
}

</style>