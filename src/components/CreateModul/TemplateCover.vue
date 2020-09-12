<template>
<div>
    <div class="col-6 q-mt-xs" style="border:1px solid #840000">
        <q-img style="width:100%" :src="`${Setting.storageUrl}/${item.image}`"></q-img>
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
        ...mapState(["Setting"])
    }
}
</script>
