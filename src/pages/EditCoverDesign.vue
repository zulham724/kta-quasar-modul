<template>
<div>
    <q-header>
        <q-toolbar style="background-color:#840000">
            <q-btn flat dense icon="arrow_back" style="font-size:18px" @click="$router.push('/create')" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="font-size:15px">Edit Cover Template</div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page class="q-pa-xs">
        <div class="row q-gutter-sm q-mb-sm">
            <!--<q-btn @click="saveCover" color="primary">Simpan Cover</q-btn>
            <q-btn @click="resetCover" color="warning">Reset Cover</q-btn>-->

        </div>
        <div class="row justify-center q-mb-md">

            <sampul-maker :configs="[{name:'size'},{name:'color'}]" :img="img" :items="items" ref="myCanvas">
                <!--<template v-slot:between>
                    <div class="row justify-between">
                        <q-btn fab icon="save" @click="saveCover" color="primary" label="Simpan" />
                        <q-btn fab icon="replay" @click="resetCover" color="warning" label="Reset" />
                    </div>
                </template>-->
                <template v-slot:color="{item}">
                    Warna teks
                    <q-color v-model="item.color" />

                </template>
                <template v-slot:size="{item}">
                    Ukuran teks
                    <q-slider label v-model="item.size" :min="1" :max="20" />
                </template>
            </sampul-maker>
            <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <div class="row q-mb-sm">
                    <q-btn fab icon="save" @click="saveCover" color="primary" />
                </div>
                <div class="row">
                    <q-btn fab icon="replay" @click="resetCover" color="warning" />
                </div>
            </q-page-sticky>
            <!--<sampul-maker></sampul-maker>-->
        </div>

    </q-page>
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
    components: {
        'SampulMaker': SampulMaker
    },
    data() {
        return {
            loading: false,
            options: [],
            items: [],
            img: null
        }
    },
    computed: {
        ...mapState(["Auth", "Setting", "Grade", "Module"]),

    },
    mounted() {
        //alert(this.img)
        if (this.img) this.$refs.myCanvas.initialize();

        //console.log()
    },
    created: function () {

        if (!this.Module.build.selected_template) {
            this.$q.notify('Silahkan pilih template')
            return this.$router.push('/create')
        }

        this.img = this.Module.build.selected_template ? `${this.Setting.storageUrl}/${this.Module.build.selected_template.image}` : null; //img HARUS taruh di created (sebelum DOM dirender)
        var d = new Date();
        this.items.push({
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
        });

        this.Module.build.canvas_data.forEach((item, i) => {
            console.log(item)
            this.items[i].x = item.x;
            this.items[i].y = item.y;
            this.items[i].color = item.color;
            this.items[i].size = item.size;
        });
        // this.template = {
        //     ...this.Module.build.selected_template,
        //     canvas_data: {
        //         ...this.Module.build.selected_template.canvas_data
        //     }
        // }

    },
    watch: {
        // 'template.canvas_data': {
        //     handler: function (newVal, oldVal) {
        //         this.$store.commit("Module/setTemplateCanvas", {
        //             data: newVal
        //         });
        //         console.log('cok')
        //         console.log(newVal)
        //     },
        //     deep: true
        // },
        // items: {
        //     handler: function (newVal, oldVal) {
        //         console.log(newVal)
        //     },
        //     deep: true
        // }

    },
    methods: {
        saveCover() {
            console.log(this.$refs.myCanvas.toDataURL());
            let canvas_data = [];
            //console.log(this.items)
            this.$refs.myCanvas.getContainers().forEach(container => {
                canvas_data.push({
                    x: container.x,
                    y: container.y,
                    color: this.items[container.index].color,
                    size: this.items[container.index].size,
                    //color:container.
                })
            });
            this.$store.commit("Module/setCanvasData", {
                canvas_data: canvas_data
            });
            this.$store.commit("Module/setCanvasImage", {
                canvas_image: this.$refs.myCanvas.toDataURL()
            });
            //console.log(this.Module.build.canvas_data)

        },
        resetCover() {
            const default_attr = [{
                color: '#000000',
                size: 7,
                y: 200, //posisi awal y
            }, {
                color: '#000000',
                size: 8,
                y: 700, //posisi awal y
            }, {
                color: '#000000',
                size: 8,
                x: 150, //jika x terdefinisi, x_append akan dihiraukan
                y: 20, //posisi awal y
            }, {
                color: '#000000',
                size: 5,
                y: 900,
            }, {
                color: '#000000',
                size: 8,
                x_append: 400,
                y: 20, //posisi awal y
            }];
            default_attr.forEach((item, i) => {
                this.items[i].x = item.x
                this.items[i].y = item.y
                this.items[i].color = item.color
                this.items[i].size = item.size
            });
            this.$refs.myCanvas.refreshCanvas();
        },
        editCover() {
            this.$router.push('/editcoverdesign')
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
