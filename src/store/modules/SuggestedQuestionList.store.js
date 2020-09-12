/* Module1.store.js */
import axios from "axios";
// State object
const state = {
    items: {}
};

// Mutations
const mutations = {
    set(state, payload) {
        state.items = payload.items;
    },
    reset(state) {
        state.items = {}
    },
    next(state, payload) {
        state.items = {
            ...payload.items,
            data: [...state.items.data, ...payload.items.data]
        };
    }
};

// Actions
const actions = {
    reset({commit}){
        commit("reset")
    },
    index({ commit }, payload) {
        return new Promise((resolve, reject) => {
            let search='';
            if(payload.search)search = payload.search

            axios
                .get(
                    `${this.state.Setting.url}/api/v1/assigments/questionlists/search/${payload.assigment_category_id}/${payload.educational_level_id}?q=${search}`
                ).then(res => {
                    commit("set", { items: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    next({ commit, state }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${state.items.next_page_url}`)
                .then(res => {
                    commit("next", { items: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
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
