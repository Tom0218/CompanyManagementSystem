import { defineStore } from 'pinia' //匯入pinia預設管理工具

//資料庫名稱,內容
export const userInfoStore  = defineStore('userInfo',  {

    //data
    state:()=>({
        user:[],
    }),
    //methods
    actions:{
        setUser(user){
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user)); //存在localStorage防止重整頁面資料被刷掉
        },
        clearUser() {
            this.user = null;
            localStorage.removeItem('user');
        },
        getUser() {
            const data = localStorage.getItem('user')
            this.user = JSON.parse(data);
            

            return this.user;
        },
    }
})
export default userInfoStore;