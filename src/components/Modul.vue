<template>
<div class="" clickable @click="$router.push('/modul/'+module.id)">
    <!--<q-card class="my-card q-ma-sm text-white text-bold">-->
    <!--<q-img src="~assets/contoh-modul-sma.png"></q-img>-->
    <q-img :src="`${Setting.storageUrl}/${module.template.image}`"></q-img>
    <!--</q-card>-->
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    props: {
        module: {}
    },
    computed: {
        ...mapState(["Setting", "ModulesByEducational"]),

    },
}
</script>
