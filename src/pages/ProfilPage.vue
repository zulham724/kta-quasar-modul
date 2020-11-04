<template>
<div>
    <q-pull-to-refresh @refresh="refresh">
        <q-header>
            <q-toolbar style="background-color:#840000">
                <q-toolbar-title>
                    <div class="q-px-sm text-body2 text-weight-light" style="font-size:15px">
                        Profil
                    </div>
                </q-toolbar-title>
                <q-btn color="white" round flat icon="more_vert">
                    <q-menu>
                        <q-list style="width:150px;border:2px solid #840000">
                            <q-item clickable class="q-pt-none q-pb-none">
                                <q-item-section>
                                    <div clickable @click="onLogout">
                                        <span class="material-icons" style="padding-right:6px">
                                            logout
                                        </span>
                                        Log Out
                                    </div>
                                </q-item-section>
                            </q-item>

                        </q-list>
                    </q-menu>
                </q-btn>
                <!-- <q-btn color="white" round flat icon="more_vert">
          <q-menu> </q-menu>
        </q-btn> -->
            </q-toolbar>
        </q-header>
        <q-page class="column">
            <div class="col-3 q-pa-md">
                <q-item style="padding:0px">
                    <q-item-section avatar>
                        <q-avatar class=" text-center" rounded size="22vw">
                            <img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`" />
                        </q-avatar>
                    </q-item-section>
                    <q-item-section top>
                        <q-item-label>
                            <div class="text-h6 text-weight-bold">{{Auth.auth.name}}</div>
                        </q-item-label>
                        <q-item-label>
                            <div class="q-mb-sm">No anggota: {{Auth.auth.kta_id}}</div>
                            <div>{{Auth.auth.role.display_name}}</div>
                            <!--<div>admin</div>-->
                            <div v-linkified class="text-caption" style="overflow-wrap:break-word; white-space:pre-line">{{Auth.auth.profile.long_bio}}</div>
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <div class="row q-pt-md align-left" style="font-size:40px">
                    <div class="col-3 text-h5 text-bold q-mr-md" style="border-right:2px solid #eaeae1">
                        {{Module.modules_count!==null?Module.modules_count:'-'}}
                        <div class=" text-body2 text-grey-6">
                            Modul
                        </div>
                    </div>
                    <div class="col-4 text-h5 text-bold">
                        {{Module.liked_count!==null?Module.liked_count:'-'}}
                        <div class="text-body2 text-grey-6">
                            Disukai
                        </div>
                    </div>
                    <div class="col-4 text-h5 text-bold">
                        {{Module.likes_count!==null?Module.likes_count:'-'}}
                        <div class="text-body2 text-grey-6">
                            Menyukai
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <q-tabs v-model="tab" dense class="text-black" active-color="white" indicator-color="transparent" align="justify">
                    <div class="row full-width text-weight-medium">
                        <div class="col-6 " style="background-color:#d5d5c3; 
                        border-top-right-radius:10px;
                        border-top-left-radius:10px" :style="`${tab == 'modul'? 'background-color:#840000' : 'background-color:#d5d5c3'}`">
                            <q-tab class="q-pa-sm " no-caps name="modul" label="Modul Terpublikasi" />
                        </div>
                        <div class="col-6" style="background-color:#d5d5c3; 
                        border-top-right-radius:10px;
                        border-top-left-radius:10px" :style="`${tab == 'draft'? 'background-color:#840000' : 'background-color:#d5d5c3'}`">
                            <q-tab class="q-pa-sm " no-caps name="draft" label="Draft" />
                        </div>
                    </div>
                </q-tabs>
                <q-tab-panels v-model="tab" animated style="height:-webkit-fill-available">
                    <q-tab-panel name="modul" style="height:100%;background-color:#840000">
                        <div class="full-height" style="">
                            <q-intersection style="min-height:100px" v-for="(item, n) in publishedModules" :key="`published${n}`" class="q-pa-sm">
                                <modul-publication :module="item"></modul-publication>
                            </q-intersection>
                        </div>
                    </q-tab-panel>
                    <q-tab-panel name="draft" style="height:100%;background-color:#840000">
                        <div class="full-height" style="">
                            <q-intersection style="min-height:100px" v-for="(item,n) in unpublishedModules" :key="`draft${n}`" class="q-pa-sm">
                                <modul-draft :module="item"></modul-draft>
                            </q-intersection>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </q-page>
        <q-footer style="height:44px;background-color:rgba(0,0,0,0);">
            <div class="row">
                <div class="col-4" style="position:relative;height:px; background-color:#EEEE" clickable @click="$router.push('/')">
                    <div class="q-pt-xs text-center">
                        <span class="material-icons" style="color:#840000;font-size:44px">
                            home
                        </span>
                    </div>
                </div>
                <div class="col-4" style="height:50px;">
                    <div class="text-center">
                        <q-img src="~assets/mid-footer.png" class="items-center">
                        </q-img>
                        <div class="q-pa-xs q-mx-auto" style="border-radius:60px;
                height:60px;width:60px;
                background-color:#CC3636;
                transform:translate(0%,-140%)" clickable @click="$router.push('/create')">
                            <span class="material-icons" color="white" style="font-size:50px">
                                add
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-4" style="height:50px; background-color:#EEEE" clickable @click="$router.push('/profil')">
                    <div class="q-pt-xs text-center">
                        <span class="material-icons light" style="color:#333333;font-size:44px">
                            person
                        </span>
                    </div>
                </div>
            </div>
        </q-footer>
    </q-pull-to-refresh>

</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    components: {
        ModulPublication: () => import("components/Profil/ModulPublication.vue"),
        ModulDraft: () => import("components/Profil/ModulDraft.vue")
    },
    computed: {
        ...mapState(["Auth", "Setting", "Grade", "Module"]),
        publishedModules() {
            if (this.Module.published_modules.data) return this.Module.published_modules.data;
            else return [];
        },
        unpublishedModules() {
            if (this.Module.unpublished_modules.data) return this.Module.unpublished_modules.data;
            else return [];
        }
    },
    methods: {
        refresh: function (done) {
            Promise.all([this.$store.dispatch("Module/getModulesCount"),
                this.$store.dispatch("Module/getLikedCount"),
                this.$store.dispatch("Module/getLikesCount"),
                this.$store.dispatch("Module/getPublishedModules"),
                this.$store.dispatch("Module/getUnpublishedModules")
            ]).then(() => {
                done();
            })
        },
        onLogout() {
            this.$router.push("/login").then(() => {
                this.$store.dispatch("Auth/logout");
            });
        },
    },
    created: function () {
        if (this.Module.modules_count === null) {
            this.$store.dispatch("Module/getModulesCount");
        }
        if (this.Module.liked_count === null) {
            this.$store.dispatch("Module/getLikedCount");
        }
        if (this.Module.likes_count === null) {
            this.$store.dispatch("Module/getLikesCount");
        }
        if (!this.Module.published_modules.data) {
            this.$store.dispatch("Module/getPublishedModules");
        }
        if (!this.Module.unpublished_modules.data) {
            this.$store.dispatch("Module/getUnpublishedModules");
        }
    },
    data() {
        return {
            tab: "modul"
        };
    }
};
</script>
