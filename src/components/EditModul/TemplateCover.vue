<template>
<div>
    <div class="col-6 q-mt-xs" style="border:1px solid #840000">
        <q-img style="width:100%;height:100%" :src="`${Setting.storageUrl}/${item.image}`"></q-img>
        <div class="text-caption text-center">{{item.name}}
            <q-icon v-show="this.ModuleForEdit.build.template? (this.ModuleForEdit.build.template.id==item.id?true:false) :false" color="green" name="check_circle_outline"></q-icon>
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
