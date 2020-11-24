<template>
<div>
    <q-item clickable @click="goToItem(item.data.data.comment_id)" :disable="loading">
        <q-item-section avatar top>
            <q-avatar>
                <q-img no-default-spinner v-if="item.data.data.user" :src="`${Setting.storageUrl}/${item.data.data.user.avatar}`"></q-img>
            </q-avatar>
        </q-item-section>
        <q-item-section top>
            <q-item-label>
                <div v-if="item.data.data.user">
                    <span><b>{{item.data.data.user.name}}</b></span> mengomentari modul Anda "{{getMsg}}"
                </div>
            </q-item-label>
            <q-item-label caption>
                <div>{{ item.data.data.created_at | moment("from", "now") }}</div>
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
        item: {}
    },
    computed: {
        ...mapState(["Setting", "EchoNotification"]),
        getMsg: function () {
            return this.item.data.data.value.length <= 30 ? this.item.data.data.value : this.item.data.data.value.substr(0, 30) + '....';
        }
    },
    data() {
        return {
            loading: false,
        }
    },
    created: function () {
        // console.log(this.item)
    },
    methods: {
        goToItem: function (id) {
            this.loading = true;
            this.$router.push({
                name: 'comment',
                params: {
                    moduleId: id
                }
            })

            // this.$store.dispatch("PostComment/getPostByCommentId", comment_id).then(res=>{
            //   //console.log(res)
            //   this.$router.push({name:'postcomment', params:{postId:res.commentable.id}})
            // }).finally(()=>{
            //   this.loading=false;
            // })

        }
    },
    mounted() {

    }

}
</script>
