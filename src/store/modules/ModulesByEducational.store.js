import axios from 'axios'

const state = {
   items:[]
};

const mutations = {
    set(state, payload) {
        const index=state.items.findIndex(e=>e.id==payload.educationalLevel.id)
        const data = {
            ...payload.educationalLevel,
            data:payload.pagination 
         }
        if(index==-1){
            state.items.push(data)
        }else{
            state.items[index] = {...data,data:{...payload.pagination,data:[...payload.pagination.data.map(e=>{
                return {...e}
            })]}}
            //state.items[index] = data
        }
        //console.log('asu')
        //console.log(state.items[0].data)
        //state.items = payload.items;
    },
    next(state, payload){
        const index=state.items.findIndex(e=>e.id==payload.educationalLevel.id)
        if(index>-1){
            const newData=[...state.items[index].data.data, ...payload.pagination.data]
            state.items[index].data = {
                ...payload.pagination,
                data:newData
            }
        }
    }
    
};

const actions = {
    index({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/modules/getbyeducationallevel/${payload.educationalLevelId}/${payload.search}`
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
    }
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