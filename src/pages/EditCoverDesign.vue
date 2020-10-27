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
        <div class="row justify-center q-mb-md" v-if="img!=null">
            <sampul-maker :img="img" :items="items" ref="myCanvas">
                <template v-slot:color="{item}">
                    <q-color v-model="item.color" class="my-picker" />
                </template>
                <template v-slot:size="{item}">
                    <q-slider label v-model="item.size" :min="1" :max="10" />
                </template>
            </sampul-maker>
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
        selectedTemplate: function () {
            if (this.Module.build.selected_template) return `${this.Setting.storageUrl}/${this.Module.build.selected_template.image}`;
            else return null;
        }
    },
    mounted() {
        this.img = this.selectedTemplate;
        var d = new Date();

        this.items.push({
            text: this.Module.build.name,
            color: '#000000',
            size: 5,
            x_append: -100, //posisi x_center ditambah dgn x_append
            y: 100, //posisi awal y
        }, {
            text: this.Module.build.subject,
            color: '#000000',
            size: 5,
            y: 200, //posisi awal y
        }, {
            text: d.getFullYear(),
            color: '#000000',
            size: 5,
            x_append: -150,
            y: 50, //posisi awal y
        })
    },
    created: function () {
        if (!this.Module.build.selected_template) {
            this.$q.notify('Silahkan pilih template')
            return this.$router.push('/create')
        }
        this.template = {
            ...this.Module.build.selected_template,
            canvas_data: {
                ...this.Module.build.selected_template.canvas_data
            }
        }
        // console.log(this.module)
        // if (this.module.contents.length == 0) this.module.contents.push({
        //     name: 'Judul bab',
        //     value: 'Isi bab'
        // })
    },
    watch: {
        'template.canvas_data': {
            handler: function (newVal, oldVal) {
                this.$store.commit("Module/setTemplateCanvas", {
                    data: newVal
                });
                console.log('cok')
                console.log(newVal)
            },
            deep: true
        },
        items: {
            handler: function (newVal, oldVal) {
                console.log(newVal)
            },
            deep: true
        }

    },
    methods: {
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
