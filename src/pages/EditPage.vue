<template>
<div>
    <q-header>
        <q-toolbar style="background-color:#840000">
            <q-btn flat dense icon="arrow_back" style="font-size:18px" @click="$router.push({name:'profil'})" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="font-size:15px">Edit Draft Modul</div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page class="q-pa-md">
        <div>
            <q-form ref="myForm">
                <div class="row">
                    <div class="col-8 text-weight-medium q-gutters-none q-pa-sm">
                        <q-item-label>Sampul Buku Modul</q-item-label>
                        <q-btn class="q-my-xs" style="background-color:#840000" flat color="white" no-caps @click="$router.push('/editcover')" label="Pilih Sampul">
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
                            <div class="text-caption">{{module.template?module.template.name:null}}</div>
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
                            <div v-for="(content,n) in module.module_contents" :key="n">
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
                                            <span class="material-icons" color="blue-grey-13" style="font-size:20px" @click="$router.push({name:'modulecontenteditforedit',params:{moduleContentIndex:n,contentName:content.name, moduleId:moduleId}})">
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
                        <q-btn @click="checkAndSubmitModule(0)" :disable="loading" rounded color="grey" label="Simpan"></q-btn>
                    </q-item-section>
                    <q-item-section class="q-pl-sm">
                        <q-btn rounded @click="checkAndSubmitModule(1)" :disable="loading" style="color:white;background-color:#840000" label="Publish"></q-btn>
                    </q-item-section>
                </q-item>
            </q-form>
        </div>
        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <span class="text-h6">Ada draft modul yang belum disimpan</span>

                    <span class="q-ml-sm">Abaikan draft sebelumnya dan mulai mengedit draft modul ini?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat no-caps @click="goToPreviousDraft()" label="Edit draft sebelumnya" color="negative" v-close-popup />
                    <q-btn no-caps label="Abaikan" @click="ignorePreviousDraft()" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>

    <sampul-maker v-show="false" ref="sampulMaker2"></sampul-maker>
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
// import CreateMessage from "components/CreateModul/EditModul";
export default {
    props: {
        moduleId: null
    },
    components: {
        'SampulMaker': SampulMaker
    },
    data() {
        return {
            sampulMaker: false,
            confirm: false,
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
                module_contents: [],
                template: null,
            },
            sampulMakerItems: []
        }
    },
    computed: {
        ...mapState(["Auth", "Setting", "Grade", "ModuleForEdit"]),
        selectedTemplate: function () {
            if (this.ModuleForEdit.build.canvas_image) return this.ModuleForEdit.build.canvas_image;
            else if (this.ModuleForEdit.build.template) return `${this.Setting.storageUrl}/${this.ModuleForEdit.build.template.image}`;
            else return null;
        }
    },
    mounted() {
        //console.log(this.ModuleForEdit.build)
        if (!this.Grade.items.length) this.$store.dispatch("Grade/index");

    },
    created: function () {
        /*
        moduleId = ID modul yang dipilih, yg ada di url. contoh: /edit/1111)
        ModuleForEdit.build.module_id = ID modul yang telah dipilih sebelumnya
        */
        if (this.moduleId) {
            if (!this.ModuleForEdit.build.module_id) {
                //jika modul belum ada, maka fetch data dari API dan masukkan ke vuex Store
                this.getModuleData(this.moduleId);

            } else {
                //jika ID modul yang dipilih tidak sama dengan ID modul yg ada sebelumnya, tampilkan konfirmasi apakah mau lanjut mengedit draft sebelumnya atau abaikan
                if (this.moduleId != this.ModuleForEdit.build.module_id) {
                    this.confirm = true;
                } else {
                    //jika ID modul yg dipilih sama, maka clone data dari store Module ke data local
                    this.cloneModuleFromStore();
                }

            }

        }
        //console.log(this.ModuleForEdit.build)
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
        'module.template': function (newVal, oldVal) {
            this.$store.commit("ModuleForEdit/setTemplate", {
                template: newVal
            });
        },
        'module.description': debounce(function (newVal, oldVal) {
            this.$store.commit("ModuleForEdit/setDescription", {
                description: newVal
            });

        }, 500),
        'module.grade': function (newVal, oldVal) {
            this.$store.commit("ModuleForEdit/setGrade", {
                grade: newVal
            });
        },
        'module.module_contents': {
            handler: function (newVal, oldVal) {
                this.$store.commit("ModuleForEdit/setContents", {
                    contents: newVal
                });
                console.log('cok')
                console.log(newVal)
            },
            deep: true
        },
        'module.subject': function (newVal, oldVal) {
            this.$store.commit("ModuleForEdit/setSubject", {
                subject: newVal
            });
        },
        'module.name': function (newVal, oldVal) {
            this.$store.commit("ModuleForEdit/setName", {
                name: newVal
            });
        }

    },
    methods: {
        editCover() {
            if (this.ModuleForEdit.build.template) {
                this.$router.push({
                    name: 'editcoverdesignedit',
                    params: {
                        selectedImage: this.ModuleForEdit.build.template
                    }
                });

            } else {
                this.$q.notify('Silahkan pilih template terlebih dahulu')
            }
        },
        cloneModuleFromStore() {
            this.module = {
                ...this.ModuleForEdit.build,
                //contents: [...this.Module.build.contents]

                module_contents: [...this.ModuleForEdit.build.module_contents.map(content => {
                    return {
                        ...content
                    }
                })]
            }
        },
        getModuleData(moduleId) {
            this.$store.dispatch('Module/show', {
                module_id: moduleId
            }).then(res => {

                if (!res.data.template) {

                }
                /*
                Set ID modul pada store Module ke ID yang dipilih saat ini
                */
                this.$store.commit('ModuleForEdit/setModuleId', {
                    module_id: moduleId
                });
                console.log('cok')
                console.log(res.data)

                const canvasData = JSON.parse(res.data.canvas_data);

                this.module = {
                    ...res.data,
                    canvas_image: res.data.template ? res.data.template.image : null,
                    canvas_data: {
                        items: canvasData.items,
                        image: canvasData.image
                    },
                    template: {
                        image: canvasData.image,
                        name: canvasData.name
                    },
                    module_contents: [
                        ...res.data.module_contents.map(item => {
                            return {
                                ...item
                            }
                        })
                    ],
                    grade: {
                        ...res.data.grade
                    }
                };
                var d = new Date();
                this.sampulMakerItems = [{
                    text: this.module.name,
                }, {
                    text: this.module.subject,

                }, {
                    text: d.getFullYear(),

                }, {
                    text: this.Auth.auth.name,

                }, {
                    text: this.module.grade ? this.module.grade.description : null,

                }];
                canvasData.items.forEach((item, i) => {
                    this.sampulMakerItems[i].y = item.y;
                    this.sampulMakerItems[i].x = item.x;
                    this.sampulMakerItems[i].fontfamily = item.fontfamily ? item.fontfamily : 'Arial';
                    this.sampulMakerItems[i].color = item.color;
                    this.sampulMakerItems[i].size = item.size;
                });

                this.$store.commit('ModuleForEdit/setCanvasData', {
                    canvas_data: canvasData.items,
                    image: canvasData.image
                });

                ///////////////////////////////
                //section untuk render canvas//
                this.$refs.sampulMaker2.setImage(`${this.Setting.storageUrl}/${canvasData.image}`);
                this.$refs.sampulMaker2.setItems(this.sampulMakerItems);

                this.$refs.sampulMaker2.initialize().then(res => {
                    const imageData = res.toDataURL();
                    //console.log(imageData)
                    this.module.canvas_image = imageData;
                    this.$store.commit("ModuleForEdit/setCanvasImage", {
                        canvas_image: imageData
                    });
                    // this.submitModule();
                });
                //////////////////////////////////////

            }).catch(err => {
                //alert(err)
                //console.log(err)
                this.$q.notify('Data tidak ditemukan');
                this.$router.back();
            })
        },
        ignorePreviousDraft() {
            //fetch data API beradasarkan ID modul yang dipilih sekarang
            this.getModuleData(this.moduleId)
        },
        goToPreviousDraft() {
            //clone data modul dari store Module sebelumnya
            //this.getModuleData(this.ModuleForEdit.build.module_id)
            this.cloneModuleFromStore();
        },
        checkAndSubmitModule(is_publish) {
            this.$refs.myForm.validate().then(success => {
                if (success) {
                    this.$q.dialog({
                        title: 'Konfirmasi',
                        message: is_publish ? 'Modul akan disimpan dan dipublikasikan ke semua orang' : 'Modul akan disimpan sebagai draft',
                        cancel: true,
                        persistent: true
                    }).onOk(() => {
                        this.loading = true;
                        this.module.is_publish = is_publish;

                        //Jika user tidak memilih template, maka template default akan diambil dengan SampulMaker.vue
                        let image = `${this.Setting.storageUrl}/${this.ModuleForEdit.build.template.image}`;
                        this.sampulMaker = true;
                        // if (this.ModuleForEdit.build.canvas_image == null) {
                        //     image = `${this.Setting.storageUrl}/${this.Module.build.selected_template.image}`;
                        // } else {
                        //     //console.log(`${this.Setting.storageUrl}/${this.Module.build.selected_template.image}`);
                        //     image = `${this.Setting.storageUrl}/${this.Module.build.selected_template.image}`;
                        // }
                        var d = new Date();
                        this.sampulMakerItems = [{
                            text: this.ModuleForEdit.build.name,
                            color: '#000000',
                            size: 7,
                            //x_append: -100, //posisi x_center ditambah dgn x_append
                            y: 200, //posisi awal y
                        }, {
                            text: this.ModuleForEdit.build.subject,
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
                            text: this.ModuleForEdit.build.grade ? this.ModuleForEdit.build.grade.description : null,
                            color: '#000000',
                            size: 8,
                            x_append: 400,
                            y: 20, //posisi awal y
                        }];
                        this.ModuleForEdit.build.canvas_data.items.forEach((item, i) => {
                            //console.log(item)
                            this.sampulMakerItems[i].x = item.x;
                            this.sampulMakerItems[i].y = item.y;
                            this.sampulMakerItems[i].fontfamily = item.fontfamily;
                            this.sampulMakerItems[i].color = item.color;
                            this.sampulMakerItems[i].size = item.size;
                        });
                        this.$refs.sampulMaker2.setImage(image);
                        this.$refs.sampulMaker2.setItems(this.sampulMakerItems)
                        this.$refs.sampulMaker2.initialize().then(res => {
                            const imageData = res.toDataURL();
                            //console.log(imageData)
                            this.module.canvas_image = imageData;
                            this.$store.commit("ModuleForEdit/setCanvasImage", {
                                canvas_image: imageData
                            });
                            this.submitModule();
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
        submitModule(is_publish) {
            // console.log(this.module);
            // return;
            this.$store.dispatch("ModuleForEdit/store", this.module).then(res => {
                this.$store.commit('ModuleForEdit/resetBuild');
                this.$q.notify(is_publish ? 'Berhasil mengedit publish modul' : 'Berhasil mengedit draft modul')
                //if (is_publish) this.$store.dispatch("Module/getPublishedModules");
                this.$router.push('/modul/' + this.moduleId);
            }).catch(err => {
                console.log(err.response);
                //return;
                if (err.response.data.errors.template) {
                    this.$q.notify('Sampul modul harus dipilih');
                }
            }).finally(() => {
                this.loading = false;
            });

        },
        addContent() {
            this.module.module_contents.push({
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
                this.module.module_contents.splice(index, 1);
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
