<template>
<div>
    <q-item class="q-pa-sm" style="background-color:white;
      border-radius:10px">
        <q-item-section avatar top style="padding-right:10px" clickable @click="$router.push('/modul/'+module.id)">
            <q-avatar square size="150px">
                <q-img :ratio="1" :src="`${Setting.storageUrl}/${module.template.image}`" style="width:80%; transform: scale(1,1)" />
            </q-avatar>
        </q-item-section>
        <q-item-section top>
            <q-item-label>
                <div class="text-weight-bold">{{module.subject}}</div>
            </q-item-label>
            <q-item-label>
                <div class="text-weight-medium" style="font-size:14px">{{module.grade.description}}</div>
            </q-item-label>
            <q-item-label caption>
                <div class="row " style="color:#CC3636">
                    <div class="col-6">
                        <span class="material-icons" color="white" style="font-size:20px">
                            favorite
                        </span>
                        {{module.likes_count}} Suka
                    </div>
                    <div class="col-6">
                        <div clickable @click="$router.push('/modulecomments/'+module.id)">
                            <span class="material-icons" style="font-size:20px">
                                comment
                            </span>
                            {{module.comments_count}} Komentar
                        </div>
                    </div>
                </div>
            </q-item-label>
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
    }
}
</script>
