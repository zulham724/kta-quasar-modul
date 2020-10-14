<template>
<div class="" clickable @click="$router.push('/modul/'+module.id)">
    <!--<q-card class="my-card q-ma-sm text-white text-bold">-->
    <!--<q-img src="~assets/contoh-modul-sma.png"></q-img>-->
    <q-skeleton class="absolute" style="z-index:-1;min-width:90%;min-height:90%" />
    <q-img no-default-spinner :src="`${Setting.storageUrl}/${module.template.image}`"></q-img>
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
