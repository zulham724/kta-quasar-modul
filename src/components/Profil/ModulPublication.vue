<template>
    <div>
        <q-item
            class="q-pa-sm"
            style="background-color:white;
            border-radius:10px"
        >
            <q-item-section avatar top 
                style="padding-right:10px"
                clickable
                @click="$router.push('/modul')"
            >
                <q-avatar square size="25vw">
                    <img src="~assets/modul.png"
                        style="width:80%; transform: scale(1,1)"
                    />
                </q-avatar>
            </q-item-section>
            <q-item-section top>
                <q-item-label>
                    <div class="text-weight-medium">Pendidikan agama</div>
                </q-item-label>
                <q-item-label caption>
                    <div class="text-weight-medium">pendidikan kelas 10</div>
                </q-item-label>
                <q-item-label caption>
                    <div class="row  justify-between" style="color:#CC3636">
                        <div class="col-6" style="">
                          <span
                            class="material-icons"
                            color="white"
                            style="font-size:16px"
                          >
                            favorite_border
                          </span>
                          10 Suka
                        </div>
                        <div class="col-6 text-right">
                            <div 
                                class="text-weight-light" 
                                clickable
                                @click="$router.push('/modul/comment')">
                                <span class="material-icons" style="font-size:14px">
                                    comment
                                </span> 10 Komentar
                            </div>
                        </div>
                    </div>
                </q-item-label>
            </q-item-section>
        </q-item>
    </div>
</template>

<script>
export default {
    
}
</script>