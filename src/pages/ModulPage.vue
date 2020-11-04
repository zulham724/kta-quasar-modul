<template>
<div style="background-color:#840000">
    <q-header>
        <q-toolbar style="background-color:#840000">
            <q-btn flat dense icon="arrow_back" @click="back()" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="font-size:15px">Baca Modul</div>
            </q-toolbar-title>
            <q-btn color="white" round flat icon="more_vert">
                <q-menu>
                    <q-list style="width:150px;border:2px solid #840000">
                        <q-item clickable class="q-pt-none q-pb-none">
                            <q-item-section>
                                <div clickable @click="$router.push('/modul/review')">
                                    <span class="material-icons" style="padding-right:6px">
                                        visibility
                                    </span>
                                    Lihat Penilai
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-item v-if="module.user.id==Auth.auth.id" clickable class="q-pt-none q-pb-none">
                            <q-item-section>
                                <div clickable @click="$router.push('/edit/'+moduleId)">
                                    <span class="material-icons" style="padding-right:6px">
                                        edit
                                    </span>
                                    Sunting
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-item clickable class="q-pt-none q-pb-none">
                            <q-item-section>
                                <div>
                                    <span class="material-icons" style="padding-right:6px">
                                        delete
                                    </span>
                                    Hapus
                                </div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </q-toolbar>
    </q-header>
    <q-page v-if="!show">
        <div class="row justify-center">
            <q-intersection style="height:300px;width:300px">
                <modul v-if="module.template" :module="module"></modul>
            </q-intersection>
        </div>
        <div class="col-4" style="min-height:100px;">
            <div class="q-pt-lg q-pb-none text-center">
                <div class="q-px-md text-weight-regular" style="color:white;font-size:18px">
                    {{module.name}}
                </div>
            </div>
            <!--            <div class="text-center q-py-none " style="color:#F2C94C;font-size:16px">
                <span class="q-pb-sm material-icons" style="font-size:24px;padding-right:5px">
                    star
                </span>
                <span style="font-size:22px"><b>90</b></span>/100
            </div>-->
        </div>
        <div class="col">
            <div class="q-px-md q-pb-lg q-pt-xs" style="background-color:white;
          max-height:80%;
          transform:translate(0%,0%); 
          border-top-left-radius: 30px;
          border-top-right-radius: 30px;">
                <q-item style="padding:0px;">
                    <q-item-section>
                        <q-tabs dense no-caps class="text-#8C2121" v-model="tab" indicator-color="red-10" style="font-size:16px">
                            <q-tab name="modul" label="Detail Modul" />
                            <q-tab name="ringkasan" label="Ringkasan" />
                        </q-tabs>
                    </q-item-section>
                    <q-item-section side>
                        <div v-ripple:red class="text-center q-pa-sm" style="height:55px;width:55px;
                background-color:white;
                border-radius:50px;
                transform:translate(0%,-60%)" clickable @click="$router.push('/modulecomments/'+moduleId)">
                            <span class="material-icons" style="font-size:24px">
                                comment
                            </span>
                            <div style="font-size:12px">{{module.comments_count}}</div>
                        </div>
                    </q-item-section>
                    <q-item-section side style="padding-left:10px">
                        <div v-ripple:red @click="module.liked_count ? dislike(module.id) : like(module.id)" class="text-center q-pa-sm" style="height:55px;width:55px;
                margin-right:10px;
                background-color:white;
                border-radius:50px;
                transform:translate(0%,-60%)">
                            <span :class="`material-icons ${module.liked_count?'text-red':''}`" style="font-size:24px">
                                {{module.liked_count?'favorite':'favorite_border'}}
                            </span>
                            <div style="font-size:12px">{{module.likes_count}}</div>
                        </div>
                    </q-item-section>
                </q-item>
                <q-item style="padding:0px;">
                    <q-tab-panels v-model="tab" animated style="height:-webkit-fill-available">
                        <q-tab-panel name="modul" class="width:100%" style="padding-top:10px;">
                            <q-item class="full-width q-pa-none">
                                <q-item-section avatar>
                                    <q-avatar rounded size="20vw">
                                        <img v-if="module.user.avatar" :src="`${Setting.storageUrl}/${module.user.avatar}`" />
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section>
                                    <div class="text-h6 text-weight-medium">
                                        {{module.user.name}}
                                    </div>
                                </q-item-section>
                            </q-item>
                            <q-item class="q-px-none q-py-sm">
                                <q-item-section>
                                    <q-item-label class="q-py-xs" style="margin-top:0px">
                                        <div class="text-body2 text-weight-bold">Tanggal dibuat</div>
                                        <div>{{module.created_at | moment("DD MMMM YYYY")}}</div>
                                    </q-item-label>
                                    <q-item-label class="q-py-xs" style="margin-top:0px">
                                        <div class="text-body2 text-weight-bold">Kelas</div>
                                        <div>{{module.grade.description}}</div>
                                    </q-item-label>
                                    <q-item-label class="q-py-xs" style="margin-top:0px">
                                        <div class="text-body2 text-weight-bold">Mata Pelajaran</div>
                                        <div>{{module.subject}}</div>
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                            <!-- <q-item style="padding:0px">
                                        <q-item-section avatar>
                                            <q-avatar class=" text-center" rounded size="20vw">
                                                <img src="https://cdn.quasar.dev/img/avatar.png" >
                                            </q-avatar>
                                        </q-item-section>
                                    </q-item>
                                    <q-item style="padding:0px">
                                        <q-item-section>
                                            <div class="q-pt-sm">
                                                <div class="text-subtitle1">Tanggal dibuat</div>
                                                <div class="text-weight-light">10 Januari 2020</div>
                                            </div>
                                            <div class="q-pt-sm">
                                                <div class="text-subtitle1">Kelas</div>
                                                <div class="text-weight-light">10 SMA</div>
                                            </div>
                                            <div class="q-pt-sm">
                                                <div class="text-subtitle1">Mata Pelajaran</div>
                                                <div class="text-weight-light">PKN</div>
                                            </div>
                                        </q-item-section>
                                    </q-item> -->
                        </q-tab-panel>
                        <q-tab-panel name="ringkasan" style="padding:0px">
                            <div class="q-py-sm q-px-md text-weight-medium" style="font-size:14px">
                                {{module.description}}
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </q-item>
            </div>
        </div>
    </q-page>
    <q-page class="column" style="min-height:0px" v-if="show">
        <div class="col-1 q-px-xl q-py-lg">
            <div class="text-body2 text-weight-light" style="color:white;font-size:16px">
                {{module.subject}}
            </div>
        </div>
        <div class="col">
            <div class="q-px-md q-pb-lg" style="background-color:white;
            max-height:80%;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;">
                <div class="row">
                    <div class="col-4"></div>
                    <div class="col-4 text-center">
                        <q-img no-default-spinner src="~assets/detail-button.png" clickable @click="close()"></q-img>
                    </div>
                    <div class="col-4"></div>
                </div>
                <q-item class="text-center q-pa-md">
                    <q-item-section class="">
                        <q-item-label class="q-px-xl q-py-md">
                            <q-select dense outlined class="" rounded bg-color="white" v-model="model" style="width:100%" option-label="name" option-value="id" :options="module.module_contents" label="Bab" />
                        </q-item-label>
                        <q-item-label>
                            <div class="q-mb-sm text-h5 text-weight-medium">
                                {{getModuleContent.name}}
                            </div>
                        </q-item-label>
                        <q-item-label>
                            <div v-html="getModuleContent.value">
                            </div>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div>
        </div>
    </q-page>
    <q-footer v-if="!show && loading" style="background-color:white; height:50px text-center">
        <div class="row">
            <div class="col-4"></div>
            <div clickable class="col-4 text-center">
                <!-- <item-component></item-component> -->
                <q-spinner color="primary" size="3em" :thickness="2" />
                <!-- <detail-modul></detail-modul> -->
            </div>
        </div>

    </q-footer>
    <q-footer v-else-if="!show && !loading" style="background-color:white; height:50px">
        <div class="row">
            <div class="col-4"></div>
            <div clickable class="col-4 text-center">
                <!-- <item-component></item-component> -->
                <q-img src="~assets/baca-button.png" clickable @click="open()"></q-img>
                <!-- <detail-modul></detail-modul> -->
            </div>
        </div>
    </q-footer>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    props: {
        moduleId: null
    },
    components: {
        DetailModul: () => import("components/Modul/DetailModul.vue"),
        Modul: () => import("../components/Modul.vue")

    },
    data() {
        return {
            tab: "modul",
            show: false,
            //module_content_options: [],
            model: null,
            loading: false,
            module: {
                is_publish: false,
                grade: {},
                subject: null,
                description: null,
                module_contents: [],
                template: null,
                user: {}
            }
        }
    },
    computed: {
        ...mapState(["Setting", "Auth"]),
        getModuleContent: function () {
            if (this.model) {
                const module_content = this.module.module_contents.find(e => e.id == this.model.id)
                if (module_content) return module_content
            } else {
                //console.log(this.model)
                return null;
            }
        },
    },
    created: function () {
        if (!this.moduleId) {
            this.$router.back();
        } else {
            this.loading = true;
            this.$store.dispatch("ModulesAll/show", {
                module_id: this.moduleId
            }).then(res => {
                this.module = {
                    ...res.data
                };
                console.log(this.module)
                this.model = this.module.module_contents.length > 0 ? this.module.module_contents[0] : null
                this.loading = false;
            }).catch(err => {
                this.$router.back('/');
            })
        }
    },
    methods: {
        like(moduleId) {
            this.$store.dispatch("Module/like", {
                module_id: moduleId
            }).then(res => {
                this.module.likes_count = res.data.likes_count;
                this.module.liked_count = res.data.liked_count;
            });
        },
        dislike(moduleId) {
            this.$store.dispatch("Module/dislike", {
                module_id: moduleId
            }).then(res => {
                this.module.likes_count = res.data.likes_count;
                this.module.liked_count = res.data.liked_count;
            });
        },

        // detail() {
        //     this.$q.dialog({
        //         component: DetailModul,
        //         parent: this, 
        //     })
        // },
        back() {
            if (this.show) {
                this.show = !this.show;
            } else this.$router.back();
        },
        open() {
            if (this.module.module_contents.length > 0) this.show = true
            else this.$q.notify('Modul ini tidak mempunyai konten, silahkan kontak pembuat modul')
        },
        close() {
            this.show = false
        },
    }
}
</script>
