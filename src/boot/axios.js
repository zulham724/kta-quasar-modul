import Vue from "vue";
import axios from "axios";
import store from "./../store";
import { Notify } from "quasar";

axios.interceptors.response.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    if(error.response.status==401){
        store().commit("Auth/setUnauthorized",true);
        store().dispatch("Auth/logout").then(res=>{
            Notify.create('Silahkan login kembali');
            

        })
        // console.log(router().currentRoute);
      
       
    }
    return Promise.reject(error);
  });
  
Vue.prototype.$axios = axios;
Vue.prototype.$http = axios;
const token = store().getters["Auth/token"];
if (token.access_token) {
    Vue.prototype.$http.defaults.headers.common.Accept = "application/json";
    Vue.prototype.$http.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
    // init
    //store().dispatch("Auth/getAuth");
}