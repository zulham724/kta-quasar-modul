<template>
<div>
    <q-header>
        <q-toolbar style="background-color:#840000">
            <q-btn flat dense icon="arrow_back" style="font-size:18px" @click="$router.push('/')" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="font-size:15px">Buat Modul</div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page class="q-pa-md">
        <div>
            <q-form ref="myForm">
                <div class="row">
                    <div class="col-8 text-weight-medium q-gutters-none q-pa-sm">
                        <q-item-label>Sampul Buku Modul</q-item-label>
                        <q-btn class="q-my-xs" style="background-color:#840000" flat color="white" no-caps @click="$router.push('/create/cover')" label="Pilih Sampul">
                            <span class="material-icons" style="font-size:16px">
                                chevron_right
                            </span>
                        </q-btn>
                        <div class="q-pt-xs">Judul</div>
                        <q-input :rules="[val => !!val || 'Harus diisi']" label="Judul modul" v-model="module.name" dense color="red-10"></q-input>

                        <div class="q-pt-xs">Kelas</div>
                        <q-select :disable="Grade.items.length==0" dense label="Kelas" color="deep-purple" v-model="module.grade" :options="Grade.items" option-value="id" option-label="description" :rules="[val => !!val || 'Harus diisi']">
                        </q-select>

                        <div class="q-pt-xs">Mata Pelajaran</div>
                        <q-input v-model="module.subject" dense color="red-10"></q-input>
                    </div>
                    <div class="col-4 q-pa-sm text-center" style="background-color:white">
                        <div class="vertical-middle" @click="editCover">
                            <q-img :src="selectedTemplate" style="max-width:100%;max-height:100%;">
                            </q-img>
                            <div class="text-caption">{{module.selected_template?module.selected_template.name:null}}</div>
                        </div>
                    </div>
                </div>
                <div class="q-pb-xs text-weight-medium">Ringkasan</div>
                <q-input v-model="module.description" outlined type="textarea" style="width:100%" :rules="[val => !!val || 'Harus diisi']"></q-input>
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
                                            <span class="material-icons" color="blue-grey-13" style="font-size:20px" @click="$router.push({name:'modulecontentedit',params:{moduleContentIndex:n,contentName:content.name}})">
                                                edit
                                            </span>
                                            <!--<q-popup-edit v-model="content.value" persistent title="Isi Bab" label-set="Selesai" label-cancel="Tutup" self="top left" buttons max-width="" min-height="200rem" fit>
                                            <q-editor v-model="content.value" max-width="" min-height="10rem" autofocus @keyup.enter.stop />
                                        </q-popup-edit>-->
                                        </q-item-section>
                                    </q-item>
                                </li>
                            </div>
                        </ol>
                    </q-card-section>
                </q-card>
                <q-item class="q-px-sm" style="padding-top:0px">
                    <q-item-section class="q-pr-sm">
                        <q-btn @click="submitModule(0)" :disable="loading" rounded color="grey" label="Simpan"></q-btn>
                    </q-item-section>
                    <q-item-section class="q-pl-sm">
                        <q-btn rounded @click="submitModule(1)" :disable="loading" style="color:white;background-color:#840000" label="Publish"></q-btn>
                    </q-item-section>
                </q-item>
            </q-form>
        </div>
    </q-page>
    <!--Jika user tidak memilih sampul (menekan tombol SIMPAN SAMPUL), maka buat sampul default-->
    <sampul-maker :items="sampulMakerItems" v-show="false" ref="sampulMaker1"></sampul-maker>
</div>
</template>

<script>
import SampulMaker from 'components/SampulMaker/SampulMaker.vue';

import {
    mapState
} from "vuex";
import {
    debounce
} from 'quasar'
// import CreateMessage from "compasdonents/CreateModul/EditModul";
export default {
    components: {
        'SampulMaker': SampulMaker
    },
    data() {
        return {
            sampulMaker: false,
            loading: false,
            file: null,
            model: null,
            editor: 'cek',
            options: [],
            module: {
                is_publish: false,
                grade: null,
                subject: null,
                description: null,
                contents: [],
                selected_template: null,
            },
            sampulMakerItems: []
        }
    },
    computed: {
        ...mapState(["Auth", "Setting", "Grade", "Module"]),
        selectedTemplate: function () {
            if (this.Module.build.selected_template) return `${this.Setting.storageUrl}/${this.Module.build.selected_template.image}`;
            else return null;
        }
    },
    mounted() {
        if (!this.Grade.items.length) this.$store.dispatch("Grade/index");

    },
    created: function () {
        //template default
        if (!this.Module.build.selected_template) {
            this.$store.commit("Module/setSelectedTemplate", {
                selected_template: {
                    image: 'templates/October2020/1XBirYr1KSgigOrMJxYC.png',
                    name: 'frecklepattern'
                }
                //template default
            });

        }
        //set default canvas data
        if (this.Module.build.canvas_data.length == 0) {
            const default_canvas_data = this.$store.getters['CoverDesign/default_canvas_data'];
            this.$store.commit("Module/setCanvasData", {
                canvas_data: default_canvas_data

            });

        }

        //semua data dari store Module akan dimasukkna ke data module lokal
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
        'module.description': debounce(function (newVal, oldVal) {
            this.$store.commit("Module/setDescription", {
                description: newVal
            });

        }, 500),
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
                //console.log('cok')
                console.log(newVal)
            },
            deep: true
        },
        'module.subject': function (newVal, oldVal) {
            this.$store.commit("Module/setSubject", {
                subject: newVal
            });
        },
        'module.name': function (newVal, oldVal) {
            this.$store.commit("Module/setName", {
                name: newVal
            });
        },
    },
    methods: {
        editCover() {

            this.$router.push('/editcoverdesign');
        },
        submitModule(is_publish) {
            this.$refs.myForm.validate().then(success => {
                if (success) {
                    this.$q.dialog({
                        title: 'Konfirmasi',
                        message: is_publish ? 'Modul akan disimpan dan dipublikasikan ke semua orang' : 'Modul akan disimpan sebagai draft',
                        cancel: true,
                        persistent: true
                    }).onOk(() => {
                        // console.log('>>>> OK')
                        this.loading = true;
                        this.module.is_publish = is_publish
                        //this.module.canvas
                        if (this.Module.build.canvas_image == null) {
                            this.sampulMaker = true;
                            this.$refs.sampulMaker1.setImage(this.selectedTemplate)
                            var d = new Date();
                            this.sampulMakerItems = [{
                                text: this.Module.build.name,
                                color: '#000000',
                                size: 7,
                                //x_append: -100, //posisi x_center ditambah dgn x_append
                                y: 200, //posisi awal y
                            }, {
                                text: this.Module.build.subject,
                                color: '#000000',
                                size: 8,
                                y: 700, //posisi awal y
                            }, {
                                text: d.getFullYear(),
                                color: '#000000',
                                size: 8,
                                //x_append: -150,
                                x: 150, //jika x terdefinisi, x_append akan dihiraukan
                                y: 20, //posisi awal y
                            }, {
                                text: this.Auth.auth.name,
                                color: '#000000',
                                size: 5,
                                //x_append: -150,
                                //x: 150, //jika x terdefinisi, x_append akan dihiraukan
                                y: 900, //posisi awal y
                            }, {
                                text: this.Module.build.grade ? this.Module.build.grade.description : null,
                                color: '#000000',
                                size: 8,
                                x_append: 400,
                                y: 20, //posisi awal y
                            }];
                            //this.$refs.sampulMaker1.setItems(items)
                            this.$refs.sampulMaker1.initialize().then(res => {
                                console.log(this.$refs.sampulMaker1.toDataURL())
                            })

                            return;
                        }
                        this.$store.dispatch("Module/store", this.module).then(res => {
                            this.$store.commit('Module/resetBuild');
                            this.$q.notify(is_publish ? 'Berhasil menerbitkan modul' : 'Berhasil menyimpan modul')
                            this.$store.dispatch("Module/getPublishedModules");
                            this.$router.push('/');
                        }).catch(err => {
                            console.log(err.response);
                            //return;
                            if (err.response.data.errors.selected_template) {
                                this.$q.notify('Sampul modul harus dipilih');
                            }
                        }).finally(() => {
                            this.loading = false;
                        });
                    }).onOk(() => {
                        // console.log('>>>> second OK catcher')
                    }).onCancel(() => {
                        // console.log('>>>> Cancel')
                    }).onDismiss(() => {
                        // console.log('I am triggered on both OK and Cancel')
                    })
                }
            })

        },
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
