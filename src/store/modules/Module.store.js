import axios from 'axios'

const state = {
    build: {
        is_publish: true,
        grade: null,
        name:null,
        description:null,
        contents:[],
        selected_template:null,
        template_category:null,
        owned_template_category:null,
        subject:null,
        canvas_data:[],
        canvas_image:null
    },
    owned:{},
    modules_count:null,
    likes_count:null,
    liked_count:null,
    published_modules:{},
    unpublished_modules:{},
    latest_modules:null
};

const mutations = {
    resetBuild(state){
        state.build =  {
            is_publish: true,
            grade: null,
            name:null,
            description:null,
            contents:[],
            selected_template:null,
            template_category:'',
            owned_template_category:null,
            subject:null,
            canvas_data:[],
            canvas_image:null
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
    setSelectedTemplate(state, payload){
        state.build.selected_template = payload.selected_template
        //console.log('asu');
        //state.build.selected_template.canvas_data = {}
    },
    setName(state, payload){
        state.build.name = payload.name
    },
    setSubject(state, payload){
        state.build.subject = payload.subject
    },
    setModuleContent(state, payload){
       state.build.contents[payload.index].value=payload.value;
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
    setCanvasData(state, payload){
        state.build.canvas_data = [...payload.canvas_data.map(item=>{
            return {...item}
        })]
    },
    setCanvasImage(state, payload){
        state.build.canvas_image = payload.canvas_image
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
    store({commit}, payload){
        return new Promise((resolve, reject) => {
            axios
                .post(
                    `${this.state.Setting.url}/api/v1/module`, payload
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
    getModulesByEducationalLevel(){
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/modules/getmodulescount`
                )
                .then(res => {
                    commit("setModulesCount", { modules_count: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                    
                });
        });
    },
    getModulesCount({commit}){
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/modules/getmodulescount`
                )
                .then(res => {
                    commit("setModulesCount", { modules_count: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                    
                });
        });
    },
    getLikedCount({commit}){
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/modules/getlikedcount`
                )
                .then(res => {
                    commit("setLikedCount", { liked_count: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                    
                });
        });
    },
    getLikesCount({commit}){
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/modules/getlikescount`
                )
                .then(res => {
                    commit("setLikesCount", { likes_count: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                    
                });
        });
    },
    getPublishedModules({commit}){
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/modules/getpublish`
                )
                .then(res => {
                    commit("setPublishedModules", { published_modules: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                    
                });
        });
    },
    getUnpublishedModules({commit}){
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/modules/getunpublish`
                )
                .then(res => {
                    commit("setUnpublishedModules", { unpublished_modules: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                    
                });
        });
    },
    getLatestModules({commit}){
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${this.state.Setting.url}/api/v1/modules/getalllatest`
                )
                .then(res => {
                    commit("setLatestModules", { latest_modules: res.data });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                    
                });
        });
    },
    like({commit}, payload){
        return new Promise((resolve, reject) => {
            const access = {
                module_id: payload.module_id
            };
            axios
                .post(`${this.state.Setting.url}/api/v1/modules/${access.module_id}/likes`)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    dislike({commit}, payload){
        return new Promise((resolve, reject) => {
            const access = {
                module_id: payload.module_id
            };
            axios
                .delete(`${this.state.Setting.url}/api/v1/module/${access.module_id}/dislike`)
                .then(res => {
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