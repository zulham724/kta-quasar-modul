<template>
<div>
    <q-item class="q-pa-sm" style="background-color:white;
      border-radius:10px">
        <q-item-section avatar top style="padding-right:10px" clickable @click="$router.push('/edit/'+module.id)">
            <q-avatar square size="25vw">
                <img :src="`${Setting.storageUrl}/${module.template.image}`" style="width:80%; transform: scale(1,1)" />
            </q-avatar>
        </q-item-section>
        <q-item-section top>
            <q-item-label>
                <div class="text-weight-bold">{{module.subject}}</div>
            </q-item-label>
            <q-item-label>
                <div class="text-weight-medium" style="font-size:14px">{{module.grade.description}}</div>
            </q-item-label>
        </q-item-section>
        <q-item-section side top>
            <q-btn color="grey-7" round flat icon="more_horiz">
                <q-menu anchor="top right" self="top left" auto-close transition-show="scale" transition-hide="scale">
                    <q-list>
                        <q-item class="q-py-none" clickable style="background-color:#E0E0E0">
                            <q-item-section @click="$router.push('/edit/'+module.id)">
                                <div>
                                    <span class="material-icons" style="font-size:20px;padding-right:6px">
                                        edit
                                    </span>
                                    Sunting
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-item @click="remove" clickable class="q-py-none" style="border-top:1px solid grey;
                  background-color:#E0E0E0">
                            <q-item-section>
                                <div>
                                    <span class="material-icons" style="font-size:20px;padding-right:6px">
                                        delete
                                    </span>
                                    Buang
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-item @click="publish" clickable class="q-py-none" style="border-top:1px solid grey;
                background-color:#E0E0E0">
                            <q-item-section>
                                <div>
                                    <span class="material-icons" style="font-size:20px;padding-right:6px">
                                        save_alt
                                    </span>
                                    Publish
                                </div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </q-item-section>
    </q-item>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    props: {
        module: null
    },
    computed: {
        ...mapState(["Setting"]),

    },
    data() {
        return {
            tab: "modul"
        };

    },
    mounted() {

    },
    methods: {
        remove() {
            console.log(this.module)
            this.$q.dialog({
                title: 'Konfirmasi',
                message: 'Hapus draft modul \'' + this.module.subject + '\'?',
                cancel: true,
                persistent: true
            }).onOk(() => {
                // console.log('>>>> OK')
                this.$store.dispatch("Module/destroy", {
                    moduleId: this.module.id
                }).then(res => {
                    this.$q.notify('Berhasil menghapus draft modul');
                    this.$store.dispatch("Module/getUnpublishedModules");
                    this.$store.dispatch("Module/getModulesCount")
                })

            }).onOk(() => {
                // console.log('>>>> second OK catcher')
            }).onCancel(() => {
                // console.log('>>>> Cancel')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            })
        },
        publish() {
            this.$q.dialog({
                title: 'Konfirmasi',
                message: 'Terbitkan modul \'' + this.module.subject + '\'?',
                cancel: true,
                persistent: true
            }).onOk(() => {
                // console.log('>>>> OK')
                this.$store.dispatch("ModuleForEdit/store", {
                    id: this.module.id,
                    is_publish: true
                }).then(res => {
                    this.$store.dispatch("Module/getUnpublishedModules");
                    this.$store.dispatch("Module/getPublishedModules");

                })

            }).onOk(() => {
                // console.log('>>>> second OK catcher')
            }).onCancel(() => {
                // console.log('>>>> Cancel')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            })
        }
    },
}
</script>
