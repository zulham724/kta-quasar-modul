<template>
<div class="" clickable @click="$router.push('/modul/'+module.id)">
    <!--<q-card class="my-card q-ma-sm text-white text-bold">-->
    <!--<q-img src="~assets/contoh-modul-sma.png"></q-img>-->
    <q-skeleton class="absolute" style="z-index:1;width:90%;height:90%" />
    <q-img no-default-spinner :src="`${Setting.storageUrl}/${module.template.image}`" style="z-index:2">
        <div class="full-height full-width">
            <div class="row" style="position:absolute;right:5%">
                <div>
                    <q-icon name="star" size="sm" color="deep-purple"></q-icon>
                    <div class="text-caption text-deep-purple">9/10</div>
                </div>
            </div>
            <div class="row justify-center full-height">
                <div class="col-4 text-center self-center">
                    <div class="text-caption">{{module.name}}</div>
                    <div class="text-caption">
                        Kelas {{module.grade.description}}
                    </div>
                    <div class="text-caption q-pt-md">
                        Oleh {{module.user.name}}
                    </div>
                </div>
            </div>
        </div>

    </q-img>
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

<style>
.q-img__content>div {
    color: black;
    background: none;
}
</style>
