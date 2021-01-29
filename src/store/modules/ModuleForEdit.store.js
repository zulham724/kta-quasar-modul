import axios from "axios";

const state = {
    build: {
        module_id: null,
        is_publish: false,
        grade: null,
        name: null,
        description: null,
        module_contents: [],
        template: null,
        template_category: null,
        owned_template_category: null,
        subject: null,
        canvas_data: {
            image: null,
            items: []
        },
        canvas_image: null
    }
    // modules_count:null,
    // likes_count:null,
    // liked_count:null,
    // published_modules:{},
    // unpublished_modules:{},
    // latest_modules:null
};

const mutations = {
    resetBuild(state) {
        state.build = {
            module_id: null,
            is_publish: true,
            grade: null,
            name: null,
            description: null,
            module_contents: [],
            template: null,
            template_category: null,
            owned_template_category: null,
            subject: null,
            canvas_data: {
                image: null,
                items: []
            },
            canvas_image: null
        };
    },
    set(state, payload) {
        state.items = payload.items;
    },
    setBuild(state, payload) {
        state = { ...payload.build };
    },
    setName(state, payload) {
        state.build.name = payload.name;
    },
    setGrade(state, payload) {
        state.build.grade = { ...payload.grade };
    },
    setDescription(state, payload) {
        state.build.description = payload.description;
    },
    setContents(state, payload) {
        state.build.module_contents = [
            ...payload.contents.map(content => {
                return { ...content };
            })
        ];
    },
    setTemplateCategory(state, payload) {
        state.build.template_category = { ...payload.template_category };
    },
    setOwnedTemplateCategory(state, payload) {
        state.build.owned_template_category = {
            ...payload.owned_template_category
        };
    },
    setTemplate(state, payload) {
        state.build.template = payload.template;
        //state.build.template.canvas_data = {}
    },
    setSubject(state, payload) {
        state.build.subject = payload.subject;
    },
    setIsPublish(state, payload) {
        state.build.is_publish = payload.is_publish;
    },
    setModuleContent(state, payload) {
        state.build.module_contents[payload.index].value = payload.value;
    },
    setModuleContentAudio(state, payload) {
        state.build.module_contents[payload.index].audio = payload.audio;
    },
    setModulesCount(state, payload) {
        state.modules_count = payload.modules_count;
    },
    setLikedCount(state, payload) {
        state.liked_count = payload.liked_count;
    },
    setLikesCount(state, payload) {
        state.likes_count = payload.likes_count;
    },
    setPublishedModules(state, payload) {
        state.published_modules = {
            ...payload.published_modules,
            data: [
                ...payload.published_modules.data.map(item => {
                    return { ...item };
                })
            ]
        };
    },
    setUnpublishedModules(state, payload) {
        state.unpublished_modules = {
            ...payload.unpublished_modules,
            data: [
                ...payload.unpublished_modules.data.map(item => {
                    return { ...item };
                })
            ]
        };
    },
    setLatestModules(state, payload) {
        state.latest_modules = [
            ...payload.latest_modules.map(item => {
                return { ...item };
            })
        ];
    },
    setModuleId(state, payload) {
        state.build.module_id = payload.module_id;
    },
    setCanvasData(state, payload) {
        state.build.canvas_data.items = [
            ...payload.canvas_data.map(item => {
                return { ...item };
            })
        ];
        state.build.canvas_data.image = payload.image;
    },
    setCanvasImage(state, payload) {
        state.build.canvas_image = payload.canvas_image;
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
    show({ commit, state }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${state.Setting.url}/api/v1/module/${payload.module_id}`)
                .then(res => {
                    //commit("set", { items: res.data.grades });
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    store({ state }, payload) {
        return new Promise((resolve, reject) => {
            console.log(payload);
            // return;
            let form = new FormData();
            payload.module_contents.forEach((v, k) => {
                console.log("cok");
                //jika blob, maka audio baru
                if (v.audio.blob) {
                    form.append(`audio[${k}]`, v.audio.blob);
                }
                //jika ada prop .src, maka data audio tidak berubah
                else if (v.audio.src) {
                    form.append(`audio[${k}]`, v.audio.src);
                }
                //jika object tidak ada property sama sekali {}, maka hapus audio
                else {
                    form.append(`audio[${k}]`, ""); //jika null, request di backend akan terdektsi sebagai string dengan value 'null', jdi hrus pke ''
                }
            });

            const data = {...payload};
            data.module_contents.forEach(v=>{
                delete v.audio;
            });

            form.append('data',JSON.stringify(data));
            form.append('_method','put');
            
            // payload._method="PUT";
            const module_id = state.build.module_id
                ? state.build.module_id
                : payload.id;
            axios
                .post(`${this.state.Setting.url}/api/v1/module/${module_id}`, form, {
                    headers: {
                      "content-type": "multipart/form-data"
                    }
                  })
                .then(res => {
                    
                    //commit("set", { items: res.data.grades });
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
