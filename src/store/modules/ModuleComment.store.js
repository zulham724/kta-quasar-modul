/* Module1.store.js */
import axios from "axios";
// State object
const state = {
    items:[]
};

// Mutations
const mutations = {
    set(state, payload){
        const index=state.items.findIndex(e=>e.module.id==payload.module.id);
        if(index>-1){
            state.items[index]=payload;
        }else{
            state.items.push(payload)
        }
    },
    setModuleCommentLike(state, payload){
        const index=state.items.findIndex(e=>e.module.id==payload.comment_id);
        if(index>-1){
            const comment_index=state.items[index].comments.data.findIndex(e=>e.id==payload.id);
            if(comment_index>-1){
                state.items[index].comments.data[comment_index].liked_count = payload.liked_count;
                state.items[index].comments.data[comment_index].likes_count = payload.likes_count;
            }
            
        }
    },
    addComment(state,payload){
        const index=state.items.findIndex(e=>e.module.id==payload.comment_id);
        if(index>-1){
            const comment_index=state.items[index].comments.data.findIndex(e=>e.id==payload.id);
            if(comment_index==-1){
               state.items[index].comments.data.push(payload);
            }
            
        }
    }
};

// Actions
const actions = {
    show({commit}, payload){
        return new Promise((resolve, reject) => {
            axios
                .get(`${this.state.Setting.url}/api/v1/modules/${payload.module_id}/comments`)
                .then(res => {
                    commit("set",res.data)
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    store({ commit }, payload) {
        return new Promise((resolve, reject) => {
            const access = {
                module_id: payload.module_id,
                //user_id: payload.user_id,
                value: payload.value
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/modules/${access.module_id}/comments`, access)
                .then(res => {
                    commit('addComment', res.data);
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    destroy() {},
    like({ commit}, commentId) {
        return new Promise((resolve, reject) => {
            const access = {
                comment_id: commentId
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/commentlike`, access)
                .then(res => {
                    commit("setModuleCommentLike", res.data);
                    resolve(res);

                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    dislike({ commit }, commentId) {
        return new Promise((resolve, reject) => {
            const access = {
                _method: `delete`
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/commentlike/${commentId}`, access)
                .then(res => {
                    commit("setModuleCommentLike", res.data);
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