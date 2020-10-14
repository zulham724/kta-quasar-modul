<template>
<div>
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
            <q-item-section avatar v-if="module.module">
                <q-avatar class=" text-center" rounded size="18vw">
                    <img :src="`${Setting.storageUrl}/${module.module.user.avatar}`">
                </q-avatar>
            </q-item-section>
            <q-item-section top v-if="module.module">
                <div class="text-weight-bold" style="font-size:16px">{{module.module.user.name}}</div>
                <q-item-label class="text-weight-regular text-subtitle2" style="font-size:12px" v-if="module.module">
                    {{module.module.name}}
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
                <q-input v-model="value" rounded dense outlined label="Tulis Komentar...">
                    <template v-slot:after>
                        <q-btn round dense flat icon="send" @click="sendComment" />
                    </template>
                </q-input>
            </q-item-section>
        </q-item>
        <div v-if="module.comments">
            <div v-for="(comment, n) in module.comments.data" :key="n">
                <comment-modul :comment="comment"></comment-modul>
            </div>
        </div>
    </q-page>
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
        module: function () {
            const module_ = this.ModuleComment.items.find(e => e.module.id == this.moduleId);
            if (module_) return module_;
            return {};
        },

    },
    methods: {
        sendComment() {
            const value = this.value.trim();
            if (value == '') this.$q.notify('Komentar tidak boleh kosong')
            else this.$store.dispatch("ModuleComment/store", {
                value: value,
                module_id: this.moduleId
            })
        }
    },
    created() {
        const index = this.ModuleComment.items.findIndex(e => e.module.id == this.moduleId);
        if (index == -1) {
            //alert('asu')
            this.$store.dispatch("ModuleComment/show", {
                module_id: this.moduleId
            })
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
            //module: null
        }
    }
}
</script>
