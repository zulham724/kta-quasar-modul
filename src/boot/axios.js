import Vue from "vue";
import axios from "axios";
import store from "./../store";
import moment from "moment";
import { Notify } from "quasar";

Vue.prototype.$axios = axios;
Vue.prototype.$http = axios;
const token = store().getters["Auth/token"];
if (token.access_token) {
    Vue.prototype.$http.defaults.headers.common.Accept = "application/json";
    Vue.prototype.$http.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
    // init
    //store().dispatch("Auth/getAuth");
}