<template>
<div>
    <q-page-container class="q-pa-lg relative-position" style="padding-bottom:0px">
        <div class="text-h5 q-pt-sm" style="color:#CC3636;">PAI</div>
        <div class="text-h4 text-weight-medium" style="color:#8C2121;">Modul</div>
        <div style="width:75%; height:50%">
            <q-input outlined dense rounded color="red-10" class="q-pt-md" style="height:50%" label="Cari Modul">
                <template v-slot:append>
                    <q-icon />
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>
        <q-item class="q-px-none" style="">
            <q-item-section class="text-weight-medium" style="font-size:19px">
                Terbaru
            </q-item-section>
            <q-item-section side>
                <q-btn rounded no-caps flat dense style="font-size:14px;background-color:#840000;color:white" class="q-px-md text-weight-regular" label="See All" @click="$router.push('/category/newest')">
                </q-btn>
            </q-item-section>
        </q-item>
        <q-item style="padding:0px">
            <q-scroll-area horizontal style="height: 270px; width: 100%;" class="bg-grey-1 rounded-borders">
                <div class="row no-wrap">
                    <div v-for="n in 4" :key="n" style="width: 150px" class="q-pa-sm">
                        <q-img src="~assets/contoh-modul.png"></q-img>
                        <!-- <modul></modul> -->
                    </div>
                </div>
            </q-scroll-area>
        </q-item>
        <q-item style="padding-left:0px; padding-right:0px">
            <q-item-section class="text-weight-medium" style="font-size:19px">
                Kategori
            </q-item-section>
        </q-item>
        <div class="row">
            <div class="col-6">
                <q-card class="my-card q-ma-sm text-white text-bold" style="margin-left:0px; margin-top:0px" clickable @click="$router.push('/category/tk')">
                    <q-img no-default-spinner src="~assets/TK.png"></q-img>
                </q-card>
            </div>
            <div class="col-6">
                <q-card class="my-card q-ma-sm text-white text-bold" style="margin-right:0px; margin-top:0px" clickable @click="$router.push('/category/sd')">
                    <q-img no-default-spinner src="~assets/SD.png"></q-img>
                </q-card>
            </div>
            <div class="col-6">
                <q-card class="my-card q-ma-sm text-white text-bold" style="margin-left:0px" clickable @click="$router.push('/category/smp')">
                    <q-img no-default-spinner src="~assets/SMP.png"></q-img>
                </q-card>
            </div>
            <div class="col-6">
                <q-card class="my-card q-ma-sm text-white text-bold" style="margin-right:0px" clickable @click="$router.push('/category/sma')">
                    <q-img no-default-spinner src="~assets/SMA.png"></q-img>
                </q-card>
            </div>
            <div class="col-6">
                <q-card class="my-card q-ma-sm text-white text-bold" style="margin-left:0px" clickable @click="$router.push('/category/slb')">
                    <q-img no-default-spinner src="~assets/SLB.png"></q-img>
                </q-card>
            </div>
            <div class="col-6">
                <q-card class="my-card q-ma-sm text-white text-bold" style="margin-right:0px" clickable @click="$router.push('/category/smk')">
                    <q-img no-default-spinner src="~assets/SMK.png"></q-img>
                </q-card>
            </div>
        </div>
    </q-page-container>
    <q-footer style="height:44px;background-color:rgba(0,0,0,0);">
        <div class="row">
            <div class="col-4" style="position:relative;height:px; background-color:#EEEE" clickable @click="$router.push('/')">
                <div class="q-pt-xs text-center">
                    <span class="material-icons" style="color:#840000;font-size:44px">
                        home
                    </span>
                </div>
            </div>
            <div class="col-4" style="height:50px;">
                <div class="text-center">
                    <q-img src="~assets/mid-footer.png" style="height:100%; width:100%"></q-img>
                    <div clickable class="q-pa-xs q-mx-auto" style="border-radius:60px;
              height:60px;width:60px;
              background-color:#840000;
              transform:translate(0%,-140%)" @click="$router.push('/create')">
                        <span class="material-icons" color="white" style="font-size:50px">
                            add
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-4" style=" background-color:#EEEE" clickable @click="$router.push('/profil')">
                <div class="q-pt-xs text-center">
                    <span class="material-icons light" style="color:#333333;font-size:44px">
                        person
                    </span>
                </div>
            </div>
        </div>
    </q-footer>
</div>
</template>

<script>
export default {
    components: {
        Modul: () => import("components/Modul.vue")
    }

}
</script>
