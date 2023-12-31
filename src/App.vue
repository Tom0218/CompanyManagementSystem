<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
    <div class="header">
        <Header/>
        <RouterView />
    </div>
    
</template>

<style scoped>
.header{
    background-color: #092635;
}

</style>
