<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="header">
        <RouterView />
    </div>
    
</template>

<style scoped>
.header{
    display: flex;
    justify-content: center;
    min-height: 100vh;
    width: 100vw;
    background-color: rgb(40, 2, 116);
}

</style>
