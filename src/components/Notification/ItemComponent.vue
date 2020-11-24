<template>
  <q-btn flat round icon="notifications" color="red">
    <q-badge v-if="EchoNotification.unread_count > 0" color="red" floating>{{
      EchoNotification.unread_count
    }}</q-badge>
    <q-menu
      anchor="bottom right"
      self="top right"
      auto-close
      transition-show="scale"
      transition-hide="scale"
    >
      <q-list style="width:250px;border:2px solid #CC3636; border-radius:5px">
        <q-item>
          <q-item-section class="text-center">
            <div class="text-weight-bold" style="font-size:15px">
              Pemberitahuan
            </div>
          </q-item-section>
        </q-item>
        <announcement-item-list></announcement-item-list>
        <q-item>
          <q-item-section class="text-center">
            <div
              class="text-weight-bold text-red"
              style="font-size:13px"
              clickable
              @click="$router.push('/announcement')"
            >
              Lihat Semua
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script>
import { mapState } from "vuex";

export default {
    components: {
        AnnouncementItemList: () => import('components/announcement/AnnouncementList.vue'),

    },
    computed: {
        ...mapState(["Setting", "Auth", "EchoNotification"
        ])
    },
};
</script>
