<script>
import { RouterLink} from 'vue-router';
export default{
    methods:{
    },
    components:{
        RouterLink
    }
}
</script>
<template>
    <div class="mainArea">
        <div class="dropdown">
            <a class="btn btn-secondary " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                首頁
            </a>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-secondary " data-bs-toggle="dropdown" aria-expanded="false">
                簽到
            </button>
        </div>
        <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                員工管理
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a class="dropdown-item" href="/Staff/StaffSearch">查詢員工資料</a></li>
                <li><a class="dropdown-item" href="/Staff/StaffCreate">新增員工資料</a></li>
                <li><a class="dropdown-item" href="/Staff/StaffDelete">刪除員工資料</a></li>
                <li><a class="dropdown-item" href="/Staff/StaffUpdate">修改員工資料</a></li>
            </ul>
        </div>
        <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                差勤管理
            </a>
            <!-- <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul> -->
        </div>
        <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                薪資管理管理
            </a>
            <!-- <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul> -->
        </div>
        <div class="dropdown">
            <a class="btn btn-secondary " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                登入
            </a>
        </div>
        <!-- <RouterLink to="/" class="Home Btn  shape-ex1" ><p>首頁</p></RouterLink> -->
        <!-- <RouterLink to="/SignIn" class="Home Btn  shape-ex1"  ><p>簽到</p></RouterLink> -->
        <!-- <RouterLink to="/Staff" class="Home Btn  shape-ex1" ><p>員工管理</p></RouterLink> -->
        <!-- <RouterLink to="/Attendance" class="Home Btn  shape-ex1"  ><p>差勤管理</p></RouterLink>
        <RouterLink to="/Payroll" class="Home Btn  shape-ex1" ><p>薪資管理</p></RouterLink>
        <RouterLink to="/LogIn" class="Home Btn  shape-ex1"  ><p>登入</p></RouterLink> -->
    </div>
    
</template>
<style lang="scss" scoped>
p{
    font-size: 16pt;
    font-weight: bold;
    margin: 0;
}

.mainArea{
    display: flex;
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