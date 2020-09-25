<template>
<div>
    <q-header>
        <q-toolbar style="background-color:#840000">
            <q-btn flat dense icon="arrow_back" style="font-size:18px" @click="$router.push('/edit/'+moduleId)" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="font-size:15px">Edit {{contentName}}</div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page class="q-pa-md">
        <q-editor v-model="editor" min-height="5rem" />
        <div class="row q-pt-sm justify-end">
            <div class="col-3">
                <q-btn @click="reset" color="grey" label="Reset"></q-btn>
            </div>
            <div class="col-3">
                <q-btn @click="saveDraft()" rounded style="color:white;background-color:#840000" label="Simpan"></q-btn>
            </div>

        </div>
    </q-page>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    debounce
} from 'quasar'
// import CreateMessage from "components/CreateModul/EditModul";
export default {
    props: {
        moduleContentIndex: null,
        contentName: null,
        moduleId: null,
    },
    data() {
        return {
            oldContent: '',
            editor: '',
            options: [],
            module: {
                is_publish: true,
                grade: null,
                subject: null,
                description: null,
                contents: [],
                selected_template: null,
            },
        }
    },
    computed: {
        ...mapState(["Auth", "Setting", "Grade", "ModuleForEdit"]),

    },
    mounted() {
        //if (!this.Grade.items.length) this.$store.dispatch("Grade/index");

    },
    created: function () {
        if (typeof this.moduleContentIndex == 'undefined') {
            this.$router.back();
        } else this.oldContent = this.editor = this.ModuleForEdit.build.module_contents[this.moduleContentIndex].value
        // this.module = {
        //     ...this.Module.build,
        //     //contents: [...this.Module.build.contents]
        //     contents: [...this.Module.build.contents.map(content => {
        //         return {
        //             ...content
        //         }
        //     })]
        // }
        // console.log(this.module)
        // if (this.module.contents.length == 0) this.module.contents.push({
        //     name: 'Judul bab',
        //     value: 'Isi bab'
        // })
    },
    watch: {
        'editor': debounce(function (newVal, oldVal) {
            this.$store.commit("ModuleForEdit/setModuleContent", {
                value: newVal,
                index: this.moduleContentIndex
            });
        }, 500),
    },
    methods: {
        // addContent() {
        //     this.module.contents.push({
        //         name: 'Judul bab',
        //         value: 'Isi bab'
        //     })
        // },
        saveDraft() {
            this.$store.commit("ModuleForEdit/setModuleContent", {
                value: this.editor,
                index: this.moduleContentIndex
            });
            this.$router.back();
        },
        reset() {
            this.editor = this.oldContent;
        },
        save() {
            this.$store.commit("ModuleForEdit/setModuleContent", {
                value: this.editor,
                index: this.moduleContentIndex
            });
        },
        // confirmDelete(index, name) {
        //     this.$q.dialog({
        //         title: 'Confirm',
        //         message: `Hapus '${name}'?`,
        //         cancel: true,
        //         persistent: true
        //     }).onOk(() => {
        //         this.module.contents.splice(index, 1);
        //     }).onOk(() => {
        //         // console.log('>>>> second OK catcher')
        //     }).onCancel(() => {
        //         // console.log('>>>> Cancel')
        //     }).onDismiss(() => {
        //         // console.log('I am triggered on both OK and Cancel')
        //     })
        // },
        // edit() {
        //     component: EditModul
        // }
    }
}
</script>
