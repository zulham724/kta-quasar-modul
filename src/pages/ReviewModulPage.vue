<template>
    <div>
        <q-header>
            <q-toolbar style="background-color:#840000">
                <q-btn flat dense icon="arrow_back" @click="$router.back()" />
                <q-toolbar-title>
                    <div class="text-body2 text-weight-light" style="font-size:15px">Penilaian</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page class="q-pa-md">
            <q-item class="" style="border-bottom:2px solid #eaeae1; 
                padding-left:0px; 
                padding-right:0px;
                padding-top: 0px">
                <q-item-section avatar top>
                    <q-avatar class=" text-center" rounded size="18vw">
                            <img src="https://cdn.quasar.dev/img/avatar.png" >
                        </q-avatar>
                </q-item-section>
                <q-item-section top>
                    <div class="text-subtitle2 text-weight-bold">Bapak Jodi</div>
                    <q-item-label
                        class="text-weight-regular text-subtitle2"
                        style="font-size:12px"
                        >Pendidikan pendidik uk
                    </q-item-label>
                </q-item-section>
            </q-item>
            <div class="q-pt-sm text-weight-bold">
                Penilaian
            </div>
                <div v-for="n in 3" :key="n" >
                    <review-modul></review-modul>
                </div>
        </q-page>
    </div>
</template>

<script>
export default {
    components: {
        ReviewModul: () => import("components/Modul/ReviewModul.vue")
    },
    data() {
        return{
            
        }
    }
}
</script>