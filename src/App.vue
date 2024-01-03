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
    min-height: 100vh;
    width: 100vw;
    background-color: #092635;
}

</style>
