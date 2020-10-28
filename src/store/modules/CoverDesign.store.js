/* Module1.store.js */
import axios from 'axios'
// State object
const state = {
    default_canvas_data: [{
        color: '#000000',
        size: 7,
        y: 200, //posisi awal y
    }, {
        color: '#000000',
        size: 8,
        y: 700, //posisi awal y
    }, {
        color: '#000000',
        size: 8,
        x: 150, //jika x terdefinisi, x_append akan dihiraukan
        y: 20, //posisi awal y
    }, {
        color: '#000000',
        size: 5,
        y: 900,
    }, {
        color: '#000000',
        size: 8,
        x_append: 400,
        y: 20, //posisi awal y
    }],
    canvas_image:null
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
    default_canvas_data:state=>{
        return state.default_canvas_data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}