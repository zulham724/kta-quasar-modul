<template>
<div>
    <q-pull-to-refresh @refresh="refresh">
        <q-header>
            <q-toolbar style="background-color:#840000">
                <q-btn flat dense icon="arrow_back" @click="$router.back()" />
                <q-toolbar-title>
                    <div class="text-body2 text-weight-light" style="font-size:15px">Komentar</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page class="q-pa-md" style="width:100%">
            <q-item class="" style="border-bottom:2px solid #eaeae1; 
        padding-left:0px; 
        padding-right:0px;
        padding-top: 0px
        width:100%">
                <q-item-section avatar v-if="module_.module">
                    <q-avatar class=" text-center" rounded size="18vw">
                        <img :src="`${Setting.storageUrl}/${module_.module.user.avatar}`">
                    </q-avatar>
                </q-item-section>
                <q-item-section top v-if="module_.module">
                    <div class="text-weight-bold" style="font-size:16px">{{module_.module.user.name}}</div>
                    <q-item-label class="text-weight-regular text-subtitle2" style="font-size:12px" v-if="module_.module">
                        {{module_.module.name}}
                    </q-item-label>
                </q-item-section>
            </q-item>
            <div class="q-py-sm text-weight-bold">
                Komentar
            </div>
            <q-item class="" style="padding-left:0px;padding-top: 0px; padding-right:0px">
                <q-item-section avatar>
                    <q-avatar class=" text-center" rounded size="18vw">
                        <q-img :src="`${Setting.storageUrl}/${Auth.auth.avatar}`"></q-img>
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    <div class="text-weight-bold" style="font-size:15px">{{Auth.auth.name}}</div>
                    <q-input :disable="loading" v-model="value" rounded dense outlined label="Tulis Komentar...">
                        <template v-slot:after>
                            <q-btn :disable="loading" round dense flat icon="send" @click="sendComment" />
                        </template>
                    </q-input>
                </q-item-section>
            </q-item>
            <div v-if="module_.comments">
                <q-infinite-scroll @load="onLoad" :offset="250">
                    <q-intersection v-for="(comment, n) in module_.comments.data" :key="n" style="min-height:100px">
                        <comment-modul :comment="comment"></comment-modul>
                    </q-intersection>
                    <template v-slot:loading>
                        <div class="row justify-center q-my-md">
                            <q-spinner-dots color="primary" size="40px" />
                        </div>
                    </template>
                </q-infinite-scroll>

            </div>

        </q-page>
    </q-pull-to-refresh>
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
        CommentModul: () => import("components/Modul/CommentModul.vue")
    },
    computed: {
        ...mapState(["Setting", "Module", "Auth", "ModuleComment"]),
        module_: function () {
            const module_ = this.ModuleComment.items.find(e => e.module.id == this.moduleId);
            if (module_) return module_;
            return {};
        },

    },
    methods: {
        refresh(done) {
            this.$store.dispatch("ModuleComment/show", {
                module_id: this.moduleId
            }).then(() => {
                done();
            })
        },
        onLoad(index, done) {
            const module_index = this.ModuleComment.items.findIndex(e => e.module.id == this.moduleId);
            if (module_index > -1) {
                const next_page_url = this.ModuleComment.items[module_index].comments.next_page_url;
                if (next_page_url) {
                    this.$store.dispatch("ModuleComment/next", {
                        next_page_url: next_page_url
                    }).then(() => {
                        done();
                    });
                } else {
                    done();
                }
            } else done();

        },
        sendComment() {
            this.loading = true;
            const value = this.value.trim();
            if (value == '') this.$q.notify('Komentar tidak boleh kosong')
            else this.$store.dispatch("ModuleComment/store", {
                value: value,
                module_id: this.moduleId
            }).then(() => {
                this.loading = false;
                this.value = '';
            });
        }
    },
    created() {
        const index = this.ModuleComment.items.findIndex(e => e.module.id == this.moduleId);
        if (index == -1) {
            //alert('asu')
            this.$store.dispatch("ModuleComment/show", {
                module_id: this.moduleId
            });
        }
        // if (module_comment) {
        //     this.comments = module_comment;
        // } else {
        //     this.$store.dispatch("ModuleComment/show", {
        //         module_id: this.moduleId
        //     }).
        // }
    },
    data() {
        return {
            value: '',
            loading: false,
            //module: null
        }
    }
}
</script>
