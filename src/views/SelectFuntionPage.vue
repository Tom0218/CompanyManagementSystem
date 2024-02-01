<script>
import {mapState, mapActions} from 'pinia';
import userInfo  from'../stores/userInfo';
import { RouterLink, RouterView} from 'vue-router';
import Swal from 'sweetalert2'


export default{
    data(){
        return{
            userData:[],

            currentDate: "",
            DateTimeNow:"",

            content : "",

            currentIP:"",

        }
    },

    computed:{
    // 使用 mapState 将 state 映射到组件的计算属性
    //參數:  資料庫,要用的 state & getters
    ...mapState(userInfo ,["user"]),
    },

    mounted(){
        this.fetchUser();

        // 使用setInterval在每秒更新日期和时间
        setInterval(this.updateDate, 1000);

        // 确保组件挂载时即刻更新日期和时间
        this.updateDate();
        
    
    },


    methods:{
        ...mapActions(userInfo ,["setUser",'getUser']),
        async fetchUser() {
            // 触发从后端获取用户数据的操作
            this.userData = this.getUser();
            console.log('Fetched userData:', this.userData);    
        },

        closeSidebar(){
            this.sidebarControl = 'close'
            const body = document.querySelector("body");
            const sidebar = body.querySelector(".sidebar");
            sidebar.classList.toggle("close");
        },

        //darkmode
        darkMode(){
            const body = document.querySelector("body");
            const sidebar = body.querySelector(".sidebar");
            const toggle = body.querySelector(".toggle");
            const modeSwitch = body.querySelector(".toggle-switch");
            const modeText = body.querySelector(".mode-text");

            body.classList.toggle("dark");

            if(body.classList.contains("dark")){
                modeText.innerText = "Light Mode"
            } else {
                modeText.innerText = "Dark Mode"
            }

        },

        //點及簽到時顯示時間
        getcheckInTime(){
            const employeeId = this.userData.id;

            // 获取当前日期时间
            const now = new Date();
            const nextDay = new Date(now);
            nextDay.setDate(now.getDate() + 1);
            const startDate = this.timee(now);
            const endDate = this.timee(nextDay);

            console.log("startDate :"+startDate)
            console.log("endDate :"+endDate)

            // 构造 API 请求的 URL
            const url = `http://localhost:8080/api/attendance/SignInSheet/todaySheet?employeeId=${employeeId}&checkInTime=${startDate}&checkOutTime=${endDate}`;

            // 发送 GET 请求
            fetch(url)
            .then(response => {
                // 如果请求不成功，抛出异常
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // 解析 JSON 数据
                return response.json();
            })

            .then(data => {
                // 处理响应数据
                console.log(data);
            })
            .catch(error => {
                // 处理错误
                console.error('Error fetching data:', error.message);
            });
        },

        //時間
        time(){
            let newDate = new Date();
            let year = newDate.getFullYear();
            let month = newDate.getMonth() + 1;
            let days = newDate.getDate();
            let hour = newDate.getHours();
            let mins = newDate.getMinutes();
            let sec = newDate.getSeconds();

            return  `${year}/${month}/${days} ${hour}:${mins}:${sec}`;
        },

         //時間
        timee(currentDate) {
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },

        //轉換填寫時間單位
        formatDate(dateTime) {
            const formattedDate = new Date(dateTime).toLocaleString('zh-TW', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            });
        return formattedDate;
        },

         //時鐘
        updateDate() {
            let newDate = new Date();
            let year = newDate.getFullYear();
            let month = newDate.getMonth() + 1;
            let days = newDate.getDate();
            let hour = newDate.getHours();
            let mins = newDate.getMinutes();
            let sec = newDate.getSeconds();
            let clockJSRead = `${year}/${month}/${days} ${hour}:${mins}:${sec}`;
            this.currentDate = clockJSRead;

        },

        //簽到、簽退
        async signInAndsignOut(InorOut) {

            console.log(InorOut);

            try {
                // 获取当前时间
                const checkTime = this.time();
                console.log(checkTime);

                // 获取 IP 地址
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipResponse.json();
                this.currentIP = ipData.ip;
                console.log(`当前 IP ：${this.currentIP}`);

                // 构建表单数据
                const employeeId = this.userData.id;
                const name = this.userData.name;
                const department = this.userData.department;
                const formData = new FormData();
                formData.append('employeeId', employeeId);
                if(InorOut == 'SignIn'){
                    formData.append('name', name);
                    formData.append('department', department)
                    formData.append('checkInTime', checkTime); // 'In' -> 'checkInTime', 'Out' -> 'checkOutTime'
                    formData.append('checkInIp', this.currentIP); // 'In' -> 'checkInIp', 'Out' -> 'checkOutIp'

                } 

                else if(InorOut == 'SignOut'){
                    formData.append('checkOutTime', checkTime); // 'In' -> 'checkInTime', 'Out' -> 'checkOutTime'
                    formData.append('checkOutIp', this.currentIP); // 'In' -> 'checkInIp', 'Out' -> 'checkOutIp'
                }

                // 发送请求
                const apiUrl = `http://localhost:8080/api/attendance/SignInSheet/${InorOut}`;
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                });

                const responseData = await response.json();

                // 打印响应数据
                console.log(`${InorOut} Response:`, responseData);
                if(responseData.rtnCode == "SUCCESSFUL"){
                    Swal.fire({
                        title: responseData.rtnCode,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }

            } catch (error) {
                console.error(`${InorOut} Error:`, error);
            }
        },

        logout(){
            var url = "http://localhost:8080/api/attendance/logout";
            var data = {};
            fetch(url, {
                method: "POST", // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }),
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                console.log("logout", response,)
            });
        },
        goHomePage(){
            this.$router.push("/")
        },
        goSignIn(){
            this.$router.push("/SignIn")
        },
        goAttendance(){
            this.$router.push("/Attendance")
        },
        goPayRoll(){
            this.$router.push("/Payroll")
        },
        goLogIn(){
            this.$router.push("/LogIn")
        }

    },
    components:{
        RouterLink,
        RouterView
    }
}
</script>

<template>
    <body>
        <nav class="sidebar close">
            <header>
                <div class="image-text">
                    <span class="image">
                        <img src="../image/logo.png" alt="log">
                    </span>
        
                    <div class="text header-text">
                        <span class="name">CodingLab</span>
                        <span class="profession">Web developer</span>
                    </div>
                </div>
        
                <i class='bx bx-chevron-right toggle' @click="closeSidebar"></i>
            </header>
    
            <div class="menu-bar">
                <div class="menu">
                    <li class="nav-links">
                        <a href="">
                            <span class="text nav-text" >員工管理</span>
                            <RouterLink to=""></RouterLink>
                        </a>
                    </li>
                    <ul class="menu-links">
                        <li class="nav-links">
                            <a href="#">
                                <span class="text nav-text">考勤</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="menu-links">
                        <li class="nav-links">
                            <a href="#">
                                <span class="text nav-text">簽到</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="menu-links">
                        <li class="nav-links">
                            <a href="#">
                                <span class="text nav-text">薪資管理</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="menu-links">
                        <li class="nav-links">
                            <a href="#">
                                <span class="text nav-text">個人檔案</span>
                            </a>
                        </li>
                    </ul>
                </div>
    
                <div class="bottom-content">
                    <li class="nav-links" >
                        <a href="#">
                            <span class="text nav-text" @click="logout">登出</span>
                        </a>
                    </li>
    
                    <li class="mode">
                        <div class="moon-sun">
                            <i class='bx bx-moon icon moon' ></i>
                            <i class='bx bx-sun icon sun' ></i>
                        </div>
                        <span class="  mode-text text">Dark Mode</span>
                        <div class="toggle-switch" @click="darkMode">
                            <span class="switch"></span>
                        </div>
                    </li>
                </div>
            </div>
        </nav>

        <section class="home">
            <div class="text">Dashboard</div>
        </section>
    </body>
    
    <!-- Boxicons CSS -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <!-- =====google font===== -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

</template>

<style lang="scss" scoped>

*{
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box ;
}


// =====Resuable CSS=====
.sidebar .text {
    font-size: 16px;
    font-weight: bold;
    color: var(--text-color);
    white-space: nowrap;
    opacity: 1;
}

.sidebar .image {
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

// =====Sidebar=====

body{
    height: 100vh;
    width: 100vw;
    background-color: var(--body-color);
    transition: var(--tran-05);

}

.sidebar{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    padding: 10px 14px;
    background-color:var(--sidebar-color);
    transition: var(--tran-05);
    z-index: 100;
}

.close{
    width: 40px;
    background-color: black;
    transition: var(--tran-05);
}

.sidebar li{
    height: 50px;
    margin-top: 10px;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;

}

.sidebar li .text {
    color: var(--text-color);
    transition: var(--tran-02);
}

.close .text{
    opacity: 0;
}

.close .toggle-switch{
    opacity: 0;
}

.close .mode{
    opacity: 0;
}

.close .image{
    opacity: 0;
}


.sidebar header {
    position: relative;
}

.sidebar header .image-text img {
    width: 50px;
}

.sidebar .image-text {
    display: flex;
    align-items: center;
}

.image-text .header-text{
    display: flex;
    flex-direction: column;
    
}

.header-text .name{
    font-weight: 600;
}

.header-text .profession{
    margin-top: -2px;
}

.sidebar header .toggle {
    position: absolute;
    top: 50%;
    right: -13%;
    //這會使元素首先在垂直方向上上移（其高度的50%），然後以中心點為軸心進行逆時針旋轉180度。請確保在 translateY 和 rotate 之間有一個空格，這樣CSS解析器才能正確解釋這兩個變換。
    transform: translateY(-50%) rotate(180deg);
    height: 28px;
    width: 28px;
    background-color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;    
    border-radius: 50%;
    background: var(--primary-color);
    color: var(--sidebar-color);
    font-size: 22px;
    transition: var(--tran-04);
}

.sidebar.close header .toggle{
    // transform: translateY(-50%); 用於對元素進行垂直位移（垂直方向上的移動）。具體來說，它使用 translateY 函數將元素沿著 Y 軸（垂直方向）上移，-50% 表示移動的距離相對於元素自身的高度的50%。
    transform: translateY(-50%);
}

body.dark .sidebar header .toggle{
    color: var(--text-color);
}

.sidebar .menu{
    margin-top: 35px;
}

.sidebar li a {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border-radius: 6px;
    transition: var(--tran-04);
}

.sidebar li a:hover {
    background-color: var(--primary-color);
}

.sidebar li a:hover .text {
    color: var(--sidebar-color);

}

body.dark .sidebar li a:hover .text {
    color: var(--text-color);

}
.sidebar .menu-bar {
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.menu-bar .mode {
    background-color: var(--primary-color-light);
    position: relative;
    border-radius: 6px;
}

.menu-bar .mode .moon-sun{
    height: 50px;
    width: 40px;
    display: flex;
    align-items: center;
}

.menu-bar .mode i{
    position: absolute;
    transition: var(--tran-03);
}

.menu-bar .mode .sun {
    opacity: 0;
}

body.dark .menu-bar .mode .sun {
    color: var(--toggle-color);
    opacity: 1;
}

body.dark .menu-bar .mode .moon {
    opacity: 0;
}

.menu-bar .mode .toggle-switch {
    // position: absolute;
    right: 0;
    height: 100%;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 6px;
    background-color: var(--primary-color-light);

}

.toggle-switch .switch{
    position: absolute;
    height: 22px;
    width: 44px;
    border-radius: 25px;
    background: var(--toggle-color);
    transition: var(--tran-05);
 

}

.switch::before{
    content: '';
    position: absolute;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    background: var(--sidebar-color);
    transition: var(--tran-03);
    
}

body.dark .switch::before{
    left: 24px;
}

.home{
    position: relative;
    height: 100vh;
    left: 250px;
    width: calc(100% - 250px);
    background-color: var(--body-color);
    transition: var(--tran-05);

}

.home .text{
    font-size: 30px;
    font-weight: 500;
    color: var(--text-color);
    padding: 8px 40px;
}

.sidebar.close ~ .home{
    left: 40px;
    width: calc(100% - 40px);
}

</style>