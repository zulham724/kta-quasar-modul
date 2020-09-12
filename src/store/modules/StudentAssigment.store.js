/* Module1.store.js */
import axios from "axios";
// State object
const state = {
    assigments:[],
    items: []
};

// Mutations
const mutations = {
    set(state, payload) {
        let index=state.items.findIndex(e=>e.assigment_id==payload.assigment_id);
        if(index>-1){
            state.items[index] = payload.items;
        }else{
            state.items = [...state.items, payload.items];
        }
      
    },
    setAssigment(state, payload){
      
        state.assigments = [...state.assigments, payload.assigment];
    },
    setSessionById(state, payload){
        let index=state.items.findIndex(e=>e.assigment_id==payload.assigment_id);
        //alert(index)
        if(index>-1){
            
            let sessionIndex = state.items[index].sessions.data.findIndex(e=>e.id==payload.session_id);
            state.items[index].sessions.data[sessionIndex] = payload.session;
        }
    },
    remove() {
        const index = state.items.data.findIndex(item => item.id == payload.id);
        state.items.data.splice(index, 1);
    },
    add() {
        state.items.data = [payload.items, ...state.items.data];
    },
    next(state, payload) {
        let index=state.items.findIndex(e=>e.assigment_id==payload.assigment_id);
        state.items[index].sessions = {
            ...payload.sessions,
            data: [...state.items[index].sessions.data, ...payload.sessions.data]
        }
      
    },
    update() {}
};
// Actions
const actions = {
    getAssigment({commit, state}, payload){
        return new Promise((resolve, reject) => {

            let cek=state.assigments.find(e=>e.id==payload.assigment_id);
            //console.log(payload.isRefresh);
            if(cek && !payload.isRefresh){
                resolve(cek)
            }
            else{
                // console.log("cek");
                // console.log(state.assigments);
                axios
                    .get(`${this.state.Setting.url}/api/v1/assigments/getassigmentinfo/${payload.assigment_id}`)
                    .then(res => {
                        //if(isRefresh)
                        commit("setAssigment", { assigment: res.data });
                        resolve(res.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            }
        });
    },
    index({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            let cek=state.items.find(e=>e.assigment_id==payload.assigment_id);
            

            // console.log('a')
            // console.log(state.items)
            if(cek && !payload.isRefresh){
                resolve(cek);
            }else{
                axios
                    .get(`${this.state.Setting.url}/api/v1/assigments/getstudentassigments/${payload.assigment_id}`)
                    .then(res => {
                        let items={assigment_id:payload.assigment_id,sessions:res.data}
                        //console.log(items);
                        commit("set", {items:items, assigment_id:payload.assigment_id, isRefresh:payload.isRefresh});
                        resolve(items);
                    })
                    .catch(err => {
                        reject(err);
                    });
            }
            
        });
    },
    store({ commit }, access) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${this.state.Setting.url}/api/v1/assigment`, access)
                .then(res => {
                    commit("add", { items: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    update({ commit }, access) {
        return new Promise((resolve, reject) => {
            let access = {
                ...payload,
                _method: "put"
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/assigment/${access.id}`, access)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    next({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
           // console.log(session);
            axios
                .get(`${payload.sessions.next_page_url}`)
                .then(res => {
                    let items={assigment_id:payload.assigment_id, sessions:res.data}
                    commit("next", items);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    destroy({ commit }, id) {
        return new Promise((resolve, reject) => {
            let access = {
                _method: "delete"
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/assigment/${id}`, access)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    setSessionById({commit}, payload){
        return new Promise((resolve, reject) => {
            commit("setSessionById",{assigment_id:payload.assigment_id, session_id:payload.session.id, session:payload.session})
            resolve(payload.session)
        });
    }
};

// Getter functions
const getters = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
