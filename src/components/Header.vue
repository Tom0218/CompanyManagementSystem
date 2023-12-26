<script>
import { RouterLink} from 'vue-router';
export default{
    components:{
    RouterLink
    }
}
</script>
<template>
    <nav>
        <RouterLink to="Home" class="Home Btn  shape-ex1"><p>首頁</p></RouterLink>
        <RouterLink to="SignIn" class="Home Btn  shape-ex1"><p>簽到</p></RouterLink>
        <RouterLink to="Staff" class="Home Btn  shape-ex1"><p>員工管理</p></RouterLink>
        <RouterLink to="Attendance" class="Home Btn  shape-ex1"><p>差勤管理</p></RouterLink>
        <RouterLink to="Payroll" class="Home Btn  shape-ex1"><p>薪資管理</p></RouterLink>
    </nav>
</template>
<style lang="scss" scoped>
p{
    font-size: 16pt;
    font-weight: bold;
    margin: 0;
}

nav{
    height: auto;
    background-color: #092635;
}

.Btn{
        color: whitesmoke;
        font-size: 16pt;
        margin:  0 20px;
        text-decoration: none;
        text-align: center;
    }
.shape-ex1{
    font-size: 18px;
    display: inline-block;   //以inline的方式呈現同時有block的屬性
    vertical-align: middle; //讓block垂直對齊到父元素
    position: relative; 
    margin-left: 20px;
    }
.shape-ex1:after{
    content: '';
    width: 0%;
    height: 2px;
    background-color:whitesmoke;
    position: absolute;     //絕對位置
    bottom: 0;              //最底部
    left: 0;                //由左開始
    transition: all .3s linear;   //所有css屬性於三秒內均速(lineat)變化完成
}
.shape-ex1:hover::after{  //當移動到.shape-ex1類別的元素上時寬度為父元素的100%
    width: 100%;
}
</style>