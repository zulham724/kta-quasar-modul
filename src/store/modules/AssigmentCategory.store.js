/* Module1.store.js */
import axios from 'axios'
// State object
const state = {
    assigment_categories: []
}

// Mutations
const mutations = {
    setassigment_categories(state, payload) {
        state.assigment_categories = payload.assigment_categories
    }
}

// Actions
const actions = {
    index({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/assigmentcategory`).then(res => {
                commit('setassigment_categories', {
                    assigment_categories: res.data.map(item => {
                        item.assigment_types.forEach(item => {
                            item.display = true
                        })
                        return item
                    })
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

// Getter functions
const getters = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
