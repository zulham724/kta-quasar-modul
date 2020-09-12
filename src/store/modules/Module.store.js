const state = {
    build: {
        is_publish: true,
        grade: null,
        description:null,
        contents:[],
        template_category:null,
        owned_template_category:null,
      
    },
};

const mutations = {
    set(state, payload) {
        state.items = payload.items;
    },
    setBuild(state, payload){
        state = {...payload.build}
    },
    setGrade(state, payload){
        state.build.grade={...payload.grade}
    },
    setDescription(state, payload){
        state.build.description = payload.description;
    },
    setContents(state, payload){
        state.build.contents = [...payload.contents.map(content=>{
            return {...content}
        })]
    },
    setTemplateCategory(state, payload){
        state.build.template_category = {...payload.template_category}
    },
    setOwnedTemplateCategory(state, payload){
        state.build.owned_template_category = {...payload.owned_template_category}
    },
};

const actions = {
    index({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/educationallevel/${this.state.Auth.auth.profile.educational_level_id}`
                )
                .then(res => {
                    commit("set", { items: res.data.grades });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
};

const getters = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};