<template>
<div>
    <div class="col-6 q-mt-xs" style="border:1px solid #840000">
        <q-img style="width:100%" :src="`${Setting.storageUrl}/${item.image}`"></q-img>
        <div class="row">
            <div class="col-10 text-center text-caption q-mt-xs">
                {{item.name}}
                <q-icon v-show="this.ModuleForEdit.build.template? (this.ModuleForEdit.build.template.id==item.id?true:false) :false" color="green" name="check_circle_outline"></q-icon>

            </div>
            <div class="col">
                <div class="text-right">
                    <q-btn color="grey-7" round flat icon="more_vert" size="sm">
                        <q-menu anchor="top right" self="bottom right" auto-close transition-show="scale" transition-hide="scale">
                            <q-list>
                                <q-item clickable>
                                    <q-item-section @click="$q.notify('Dalam konstruksi');/*$router.push('/create')*/">
                                        <div>
                                            <span class="material-icons" style="padding-right:6px">
                                                edit
                                            </span>
                                            Sunting
                                        </div>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable style="border-top:1px solid grey">
                                    <q-item-section>
                                        <div>
                                            <span class="material-icons" style="padding-right:6px">
                                                delete
                                            </span>
                                            Buang
                                        </div>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    props: {
        item: null,
    },
    computed: {
        ...mapState(["Setting", "ModuleForEdit"])
    }
}
</script>
