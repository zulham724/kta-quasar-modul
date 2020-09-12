/* Module1.store.js */
import axios from 'axios'
// State object
const state = {
    educationallevels: []
}

// Mutations
const mutations = {
    setEducationalLevels(state, payload) {
        state.educationallevels = [...payload.educationallevels]
    }
}

// Actions
const actions = {
    index({ commit }) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.state.Setting.url}/api/v1/educationallevel`).then(res => {
                // commit('setEducationalLevels', { educationallevels: res.data })
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