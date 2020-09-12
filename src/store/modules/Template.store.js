import axios from 'axios'
const state = {
    items: [],
    owned_items:[]
}

const mutations = {
    set(state, payload) {
        state.items = payload.items
    },
    set_owned(state, payload){
        state.owned_items = [...payload.items.map(item=>{
            return {...item}
        })];
    }
}

const actions = {
    index({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/template`).then(res => {
                commit('set', { items: res.data })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    index_owned({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/template?owned=yes`).then(res => {
                commit('set_owned', { items: res.data })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
}

const getters = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};