<template>
  <div>
    <q-item clickable @click="goToItem(item.data.data.like_id)" :disable="loading">
      <q-item-section avatar top>
        <q-avatar> 
          <q-img no-default-spinner v-if="item.data.data.user" :src="`${Setting.storageUrl}/${item.data.data.user.avatar}`"></q-img>
        </q-avatar>
      </q-item-section>
      <q-item-section top>
        <q-item-label>
          <div v-if="item.data.data.user" >
            <span><b>{{item.data.data.user.name}}</b></span> menyukai modul Anda "{{getMsg}}"
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
import { mapState } from "vuex";

export default {
  name:'LikedModuleNotificationItem',
  props:{
    item:{}
  },
  computed:{
    ...mapState(["Setting","EchoNotification"]),
    getMsg:function(){
        const msg=this.item.data.data.likeable.name;
        return msg.length<=30?msg:msg.substr(0,30)+'....';
    }
  },
  data(){
    return{
      loading:false,
    }
  },
  created:function(){
   // console.log(this.item)
  },
  methods:{
    goToItem:function(moduleId){
      this.$router.push({name:'modul', params:{moduleId:moduleId}})

    }
  },
  mounted(){

  }
    
}
</script>