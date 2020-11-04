import axios from 'axios'

const state = {
   data:{}
};

const mutations = {
    set(state, payload) {
  
        state.data = {...payload,data:[...payload.data.map(e=>{
            return {...e}
        })]}
        //console.log('asu')
        //console.log(state.items[0].data)
        //state.items = payload.items;
    },
    next(state, payload){
        const previousData = state.data.data;
        state.data = {...payload,data:[...previousData, ...payload.data.map(e=>{
            return {...e}
        })]}
        //const index=state.items.findIndex(e=>e.id==payload.educationalLevel.id)
        // if(index>-1){
        //     const newData=[...state.items[index].data.data, ...payload.pagination.data]
        //     state.items[index].data = {
        //         ...payload.pagination,
        //         data:newData
        //     }
        // }
    }
    
};

const actions = {
    index({ commit }, payload) {
        return new Promise((resolve, reject) => {
            const search=payload.search?payload.search:'';
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/module?q=${search}`
                )
                .then(res => {
                    commit("set", res.data);
                   // console.log('babi')
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    search({commit}, payload){
        return new Promise((resolve, reject) => {
            const search=payload.search?payload.search:'';
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/module?q=${search}`
                )
                .then(res => {
                    //commit("set", res.data);
                   // console.log('babi')
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    nextSearch({commit}, url){
        return new Promise((resolve, reject) => {
            axios
                .get(`${url}`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    next({commit}, payload){
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${payload.next_page_url}`
                )
                .then(res => {
                    commit("next", res.data);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    show({commit}, payload){
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/modules/read/${payload.module_id}`
                )
                .then(res => {
                    //commit("set", { items: res.data.grades });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
};

const getters = {
    items:state=>{
        return state.items
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};