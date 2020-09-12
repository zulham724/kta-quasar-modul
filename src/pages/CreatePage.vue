<template>
<div>
    <q-header>
        <q-toolbar style="background-color:#840000">
            <q-btn flat dense icon="arrow_back" style="font-size:18px" @click="$router.back()" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="font-size:15px">Buat Modul</div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page class="q-pa-md">
        <div>
            <div class="row">
                <div class="col-8 text-weight-medium q-gutters-none q-pa-sm">
                    <q-item-label>Sampul Buku Modul</q-item-label>
                    <q-btn class="q-my-xs" style="background-color:#840000" flat color="white" no-caps @click="$router.push('/create/cover')" label="Pilih Sampul">
                        <span class="material-icons" style="font-size:16px">
                            chevron_right
                        </span>
                    </q-btn>
                    <div class="q-pt-xs">Kelas</div>
                    <q-select :disable="Grade.items.length==0" dense label="Kelas" color="deep-purple" v-model="module.grade" :options="Grade.items" option-value="id" option-label="description" :rules="[val => !!val || 'Harus diisi']">
                    </q-select>
                    <div class="q-pt-xs">Mata Pelajaran</div>
                    <q-input dense color="red-10"></q-input>
                </div>
                <div class="col-4 q-pa-sm text-center" style="background-color:white">
                    <div class="vertical-middle">
                        <q-img src="~assets/cover.png" style="max-width:100%;max-height:100%;">
                        </q-img>
                    </div>
                </div>
            </div>
            <div class="q-pb-xs text-weight-medium">Ringkasan</div>
            <q-input v-model="module.description" outlined type="textarea" style="width:100%"></q-input>
            <q-card class=" q-my-md" rounded>
                <q-card-section>
                    <div class="text-weight-medium text-center">Daftar Isi</div>
                </q-card-section>
                <q-card-section style="padding-top:0px;padding-bottom:0px">
                    <q-btn @click="addContent()" no-caps flat dense class="q-px-sm text-weight-light" style="color:white;font-size:12px;background-color:#840000">
                        <span class="material-icons" color="white" style="padding-right:5px">
                            add
                        </span>
                        Tambah Bab
                    </q-btn>
                </q-card-section>
                <q-card-section style="">
                    <ol class="text-weight-bold" style="padding-left:20px; margin:0px">
                        <div v-for="(content,n) in module.contents" :key="n">
                            <li>
                                <q-item style="border-top: 1px solid grey">
                                    <q-item-section>
                                        <q-popup-edit buttons v-model="content.name" label-set="Selesai" label-cancel="Tutup">
                                            <q-input v-model="content.name" dense autofocus counter />
                                        </q-popup-edit>
                                        {{content.name}}
                                    </q-item-section>
                                    <q-item-section side class="q-px-xs" clickable @click="confirmDelete(n, content.name)">
                                        <span class="material-icons" color="blue-grey-13" style="font-size:20px">
                                            delete
                                        </span>
                                    </q-item-section>
                                    <q-item-section side class="q-px-xs">
                                        <span class="material-icons" color="blue-grey-13" style="font-size:20px">
                                            edit
                                        </span>
                                        <q-popup-edit v-model="content.value" persistent title="Isi Bab" label-set="Selesai" label-cancel="Tutup" self="top left" buttons max-width="" min-height="200rem" fit>
                                            <q-editor v-model="content.value" max-width="" min-height="10rem" autofocus @keyup.enter.stop />
                                        </q-popup-edit>
                                    </q-item-section>
                                </q-item>
                            </li>
                        </div>
                    </ol>
                </q-card-section>
            </q-card>
            <q-item class="q-px-sm" style="padding-top:0px">
                <q-item-section class="q-pr-sm">
                    <q-btn rounded color="grey" label="Simpan"></q-btn>
                </q-item-section>
                <q-item-section class="q-pl-sm">
                    <q-btn rounded style="color:white;background-color:#840000" label="Publish"></q-btn>
                </q-item-section>
            </q-item>
        </div>
    </q-page>
</div>
</template>

<script>
import {
    mapState
} from "vuex";

// import CreateMessage from "components/CreateModul/EditModul";
export default {
    data() {
        return {
            file: null,
            model: null,
            editor: 'cek',
            options: [],
            module: {
                is_publish: true,
                grade: null,
                subject: null,
                description: null,
                contents: []
            },
        }
    },
    computed: {
        ...mapState(["Auth", "Setting", "Grade", "Module"])
    },
    mounted() {
        if (!this.Grade.items.length) this.$store.dispatch("Grade/index");

    },
    created: function () {
        this.module = {
            ...this.Module.build,
            //contents: [...this.Module.build.contents]
            contents: [...this.Module.build.contents.map(content => {
                return {
                    ...content
                }
            })]
        }
        console.log(this.module)
        if (this.module.contents.length == 0) this.module.contents.push({
            name: 'Judul bab',
            value: 'Isi bab'
        })
    },
    watch: {
        'module.description': function (newVal, oldVal) {
            this.$store.commit("Module/setDescription", {
                description: newVal
            });
        },
        'module.grade': function (newVal, oldVal) {
            this.$store.commit("Module/setGrade", {
                grade: newVal
            });
        },
        'module.contents': {
            handler: function (newVal, oldVal) {
                this.$store.commit("Module/setContents", {
                    contents: newVal
                });
            },
            deep: true
        },
    },
    methods: {
        addContent() {
            this.module.contents.push({
                name: 'Judul bab',
                value: 'Isi bab'
            })
        },

        confirmDelete(index, name) {
            this.$q.dialog({
                title: 'Confirm',
                message: `Hapus '${name}'?`,
                cancel: true,
                persistent: true
            }).onOk(() => {
                this.module.contents.splice(index, 1);
            }).onOk(() => {
                // console.log('>>>> second OK catcher')
            }).onCancel(() => {
                // console.log('>>>> Cancel')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            })
        },
        // edit() {
        //     component: EditModul
        // }
    }
}
</script>
