import axios from 'axios'
const state = {
    items: [],
}

const mutations = {
    set(state, payload) {
        state.items = [...payload.items.map(item=>{
            return {...item}
        })]
    },
}

const actions = {
    index({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/templatecategory`).then(res => {
                commit('set', { items: res.data })
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