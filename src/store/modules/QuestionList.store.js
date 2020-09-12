/* Module1.store.js */
import axios from "axios";
// State object
const state = {};

// Mutations
const mutations = {

};

// Actions
const actions = {
    index() {
        return new Promise((resolve, reject) => {});
    },
    reset({commit}){
        commit("reset");
    },
    search({ commit }, key) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/assigmentquestionlists/search/${key}`
                )
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
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
