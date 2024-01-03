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
        },
        getUser(){    
            return this.user;
        },
    }
})
export default userInfoStore;