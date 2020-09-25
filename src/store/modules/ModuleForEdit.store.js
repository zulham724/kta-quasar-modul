import axios from 'axios'

const state = {
   
    build: {
        module_id:null,
        is_publish: true,
        grade: null,
        description:null,
        module_contents:[],
        template:null,
        template_category:null,
        owned_template_category:null,
        subject:null,
    },
    // modules_count:null,
    // likes_count:null,
    // liked_count:null,
    // published_modules:{},
    // unpublished_modules:{},
    // latest_modules:null
};

const mutations = {
    resetBuild(state){
        state.build =  {
            module_id:null,
            is_publish: true,
            grade: null,
            description:null,
            module_contents:[],
            template:null,
            template_category:null,
            owned_template_category:null,
            subject:null,
        }
    },
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
        state.build.module_contents = [...payload.contents.map(content=>{
            return {...content}
        })]
    },
    setTemplateCategory(state, payload){
        state.build.template_category = {...payload.template_category}
    },
    setOwnedTemplateCategory(state, payload){
        state.build.owned_template_category = {...payload.owned_template_category}
    },
    setTemplate(state, payload){
        state.build.template = payload.template
    },
    setSubject(state, payload){
        state.build.subject = payload.subject
    },
    setModuleContent(state, payload){
       state.build.module_contents[payload.index].value=payload.value;
    },
    setModulesCount(state, payload){
        state.modules_count=payload.modules_count;
    },
    setLikedCount(state, payload){
        state.liked_count=payload.liked_count;
    },
    setLikesCount(state, payload){
        state.likes_count=payload.likes_count;
    },
    setPublishedModules(state, payload){
        state.published_modules = {...payload.published_modules,data:[...payload.published_modules.data.map(item=>{
            return {...item} 
        })]}
    },
    setUnpublishedModules(state, payload){
        state.unpublished_modules = {...payload.unpublished_modules,data:[...payload.unpublished_modules.data.map(item=>{
            return {...item} 
        })]}
    },
    setLatestModules(state, payload){
        state.latest_modules = [...payload.latest_modules.map(item=>{
            return {...item}
        })]
    },
    setModuleId(state, payload){
        state.build.module_id=payload.module_id;
    }
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
    },
    show({commit}, payload){
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/module/${payload.module_id}`
                )
                .then(res => {
                    //commit("set", { items: res.data.grades });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    store({state}, payload){
        return new Promise((resolve, reject) => {
            payload._method="PUT";
            axios
                .post(
                    `${this.state.Setting.url}/api/v1/module/${state.build.module_id}`, payload
                )
                .then(res => {
                    //commit("set", { items: res.data.grades });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                    
                });
        });
    },
};

const getters = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};