<template>
<div>
    <q-item style="padding-left:0px; 
      padding-right:0px;
      padding-bottom:0px">
        <q-item-section avatar top>
            <q-avatar class=" text-center" rounded size="18vw" v-if="comment.user">
                <img :src="`${Setting.storageUrl}/${comment.user.avatar}`">
            </q-avatar>
        </q-item-section>
        <q-item-section top>
            <q-item-label>
                <div class="text-subtitle2 text-weight-bold">{{comment.user?comment.user.name:''}}</div>
            </q-item-label>
            <q-item-label>
                <div class="q-pa-sm" style="background-color:#F1E4E4;
            border-radius:5px;word-wrap:break-word;">
                    {{comment.value}}
                </div>
            </q-item-label>
            <q-item-label caption>
                <div class="row  justify-between">
                    <div class="col-6" style="">

                        <span @click="comment.liked_count ? dislike(comment.id) : like(comment.id)" v-ripple:red :class="`relative-position material-icons ${comment.liked_count ? 'text-red' : ''}`" style="font-size:16px; border-radius: 50%;cursor: pointer">
                            {{comment.liked_count ? 'favorite' : 'favorite_border'}}
                        </span>
                        {{comment.likes_count}} Suka
                    </div>
                    <div class="col-6 text-right">
                        <div class="text-weight-light">{{comment.created_at | moment('from','now')}}</div>
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
} from "vuex"
export default {
    props: {
        comment: {}
    },
    computed: {
        ...mapState(["Setting"]),

    },
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        like(commentId) {
            this.$store.dispatch("ModuleComment/like", commentId);
        },
        dislike(commentId) {
            this.$store.dispatch("ModuleComment/dislike", commentId);
        }
    }
}
</script>
