/* Module1.store.js */
import axios from "axios";

// State object
const state = {
    auth: null,
    client_id: 2,
    client_secret: "RM0SqcmpoatgzQ5JXi6aeEXYI6dSaPiWDSbTW79s",
    token: {},
    publish_assigments:{},
    unpublish_assigments:{},
};

// Mutations
const mutations = {
    auth_success(state, payload) {
        state.token = payload.token;
        state.auth = payload.auth;
    },
    setAuth(state, payload) {
        state.auth = payload.auth;
    },
    logout(state) {
        state.token = {}
        state.auth = ''
        state.publish_assigments={}
        state.unpublish_assigments={}
    },
    setAssigment(state, payload){
         //assigment yang ada di state.auth.publish_assigments
        // let index = state.auth.publish_assigments.findIndex(item => item.id == payload.assigment.id);
        // if(index>-1){
        //     payload.field.forEach(v=>{
        //         state.auth.publish_assigments[index][v] = payload.assigment[v]
        //     })
        // }
        //assigment yang ada di state.publish_assigments
        let index = state.publish_assigments.data.findIndex(item => item.id == payload.assigment.id);
        if(index>-1){
            payload.field.forEach(v=>{
                state.publish_assigments.data[index][v] = payload.assigment[v]
            })
        }
       
    },
    /////////////////////////////////////////
    setPublishAssigments(state, payload){
        state.publish_assigments = payload;
    },
    setUnpublishAssigments(state, payload){
        state.unpublish_assigments = payload;
    },
    ///////////////////////////////////////
    PublishAssigmentsNext(state, payload) {
        // payload.posts.data.map(item => item.isReadMore = false)

        // let fileredposts = payload.posts.data.filter(item=>{
        //     return state.posts.data.find(e=>e.id==item.id)?false:true;
        // })
        state.publish_assigments = {
            ...payload.assigments,
            data: [...state.publish_assigments.data, ...payload.assigments.data]
        };
    },
    UnpublishAssigmentsNext(state, payload) {
        // payload.posts.data.map(item => item.isReadMore = false)

        // let fileredposts = payload.posts.data.filter(item=>{
        //     return state.posts.data.find(e=>e.id==item.id)?false:true;
        // })
        state.unpublish_assigments = {
            ...payload.posts,
            data: [...state.unpublish_assigments.data, ...payload.assigments.data]
        };
    }
};

// Actions
const actions = {
    login({ commit }, credential) {
        return new Promise((resolve, reject) => {
            const access = {
                grant_type: "password",
                client_id: this.state.Auth.client_id,
                client_secret: this.state.Auth.client_secret,
                ...credential
            };
            axios
                .post(`${this.state.Setting.url}/oauth/token`, access)
                .then(resp => {
                    const token = resp.data;
                    axios.defaults.headers.common.Accept = "application/json";
                    axios.defaults.headers.common.Authorization = `${token.token_type} ${token.access_token}`;
                    axios
                        .get(`${this.state.Setting.url}/api/v1/auth/assigment_lite`)
                        .then(res => {
                            const auth = res.data;
                            // Add the following line:
                            const payload = {
                                token: token,
                                auth: auth
                            };
                            commit("auth_success", payload);
                            
                            resolve(resp);
                        })
                        .catch(err => {
                            reject(err);
                        });
                })
                .catch(err => {
                    reject(err);
                    localStorage.clear();
                });
        });
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit("logout")
            delete axios.defaults.headers.common.Authorization
            resolve()
        })
    },
    getAuth({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/auth/assigment_lite`)
                .then(res => {
                    const auth = res.data
                        // Add the following line:
                    const payload = {
                        auth: auth
                    }
                    commit("setAuth", payload)
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    updateProfile({ commit, dispatch }, user) {
        return new Promise((resolve, reject) => {
            const access = {
                _method: "put",
                ...user
            };
            axios
                .post(
                    `${this.state.Setting.url}/api/v1/user/${this.state.Auth.auth.id}`,
                    access
                )
                .then(res => {
                    // commit("setProfile", { profile: res.data.profile });
                    dispatch('getAuth')
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    setAssigment({commit}, payload){
        return new Promise((resolve, reject) => {
            commit("setAssigment", {assigment:payload.assigment, field:payload.field});
        });
    },
    /////////////////////////////////////////////////////////////////////
    PublishAssigmentsIndex({commit}, payload){
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/auth/assigments/published`)
                .then(res => {
                  
                    commit("setPublishAssigments", res.data)
                    console.log(res.data);
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    PublishAssigmentsNext({commit,state}, payload){
        return new Promise((resolve, reject) => {
            // console.log(state.posts.next_page_url);
            axios
                .get(`${state.publish_assigments.next_page_url}`)
                .then(res => {
                    commit("PublishAssigmentsNext", { assigments: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    UnpublishAssigmentsIndex({commit}, payload){
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/auth/assigments/unpublished`)
                .then(res => {
                   
                    commit("setUnpublishAssigments", res.data)
                    console.log('asu')
                    console.log(res.data);
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    UnpublishAssigmentsNext({commit, state}, payload){
        return new Promise((resolve, reject) => {
            // console.log(state.posts.next_page_url);
            //alert(state.unpublish_assigments.next_page_url)
            axios
                .get(`${state.unpublish_assigments.next_page_url}`)
                .then(res => {
                    commit("UnpublishAssigmentsNext", { assigments: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
};

// Getter functions
const getters = {
    isLoggedIn: state => !!state.token.access_token,
    auth: state => state.auth,
    token: state => state.token
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};