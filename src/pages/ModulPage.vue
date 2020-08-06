<template>
  <div style="background-color:#840000">
    <q-header>
      <q-toolbar style="background-color:#840000">
        <q-btn flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body2 text-weight-light" style="font-size:15px">id =22991</div>
        </q-toolbar-title>
        <q-btn color="white" round flat icon="more_vert">
          <q-menu>
            <q-list style="width:150px;border:2px solid #840000">
              <q-item clickable class="q-pt-none q-pb-none">
                <q-item-section >
                  <div clickable @click="$router.push('/modul/review')">
                    <span class="material-icons" style="padding-right:6px">
                      visibility
                    </span> 
                    Lihat Penilai
                  </div>
                </q-item-section >
              </q-item>
              <q-item clickable class="q-pt-none q-pb-none">
                <q-item-section>
                  <div clickable @click="$router.push('/create')">
                    <span class="material-icons" style="padding-right:6px">
                      edit
                    </span> 
                    Sunting
                  </div>
                </q-item-section >
              </q-item>
              <q-item clickable class="q-pt-none q-pb-none">
                <q-item-section>
                  <div>
                    <span class="material-icons" style="padding-right:6px">
                      delete
                    </span> 
                    Hapus
                  </div>
                </q-item-section >
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page clas="column" style="min-height:0px" v-if="!show">
      <div class="col-4 q-px-md q-pb-lg q-pt-lg">
        <div class="text-center">
          <q-img no-default-spinner src="~assets/modul.png" style="width:50%"></q-img>
        </div>
        <div class="q-pt-lg q-pb-none text-center">
          <div class="q-px-md text-weight-regular" style="color:white;font-size:18px">
            Pendidikan Agama Islam dan Budi Pekerti
          </div>
        </div>
        <div class="text-center q-py-none " style="color:#F2C94C;font-size:16px">
          <span class="q-pb-sm material-icons" style="font-size:24px;padding-right:5px">
            star
          </span>
          <span style="font-size:22px"><b>90</b></span>/100
        </div>
      </div>
      <div class="col">
        <div class="q-px-md q-pb-lg q-pt-xs" 
          style="background-color:white;
          max-height:80%;
          transform:translate(0%,0%); 
          border-top-left-radius: 30px;
          border-top-right-radius: 30px;"
        >
          <q-item style="padding:0px;">
            <q-item-section>
              <q-tabs 
                dense 
                no-caps
                class="text-#8C2121" 
                v-model="tab" 
                indicator-color="red-10"
                style="font-size:16px"
              >
                <q-tab name="modul" label="Detail Modul" />
                <q-tab name="ringkasan"  label="Ringkasan" />
              </q-tabs>
            </q-item-section>
            <q-item-section side>
              <div class="text-center q-pa-sm" 
                style="height:55px;width:55px;
                background-color:white;
                border-radius:50px;
                transform:translate(0%,-60%)"
                clickable
                @click="$router.push('/modul/comment')"
              >
                <span class="material-icons" style="font-size:24px">
                  comment
                </span>
                <div style="font-size:12px">200</div>
              </div>
            </q-item-section>
            <q-item-section side style="padding-left:10px">
              <div class="text-center q-pa-sm" 
                style="height:55px;width:55px;
                margin-right:10px;
                background-color:white;
                border-radius:50px;
                transform:translate(0%,-60%)"
              >
                <span class="material-icons" style="font-size:24px">
                  favorite_border
                </span>
              <div style="font-size:12px">200</div>
                                </div>
            </q-item-section>
          </q-item>
          <q-item style="padding:0px;">
            <q-tab-panels v-model="tab" animated style="height:-webkit-fill-available">
              <q-tab-panel name="modul" class="width:100%" style="padding-top:10px;">
                <q-item class="full-width q-pa-none">
                  <q-item-section avatar>
                    <q-avatar rounded size="20vw">
                      <img src="https://cdn.quasar.dev/img/avatar.png"/>
                    </q-avatar>
                  </q-item-section>
                  <q-item-section >
                    <div class="text-h6 text-weight-medium">
                      Jonny andrea
                    </div>
                  </q-item-section>
                </q-item>
                <q-item class="q-px-none q-py-sm">
                  <q-item-section >
                    <q-item-label class="q-py-xs" style="margin-top:0px">
                      <div class="text-body2 text-weight-bold">Tanggal dibuat</div>
                      <div>10 Juni 2020</div>
                    </q-item-label>
                    <q-item-label class="q-py-xs" style="margin-top:0px">
                      <div class="text-body2 text-weight-bold">Kelas</div>
                      <div>10 SMA</div>
                    </q-item-label>
                    <q-item-label class="q-py-xs" style="margin-top:0px">
                        <div class="text-body2 text-weight-bold">Mata Pelajaran</div>
                        <div>Pendidikan kewarganegaraan</div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                                    <!-- <q-item style="padding:0px">
                                        <q-item-section avatar>
                                            <q-avatar class=" text-center" rounded size="20vw">
                                                <img src="https://cdn.quasar.dev/img/avatar.png" >
                                            </q-avatar>
                                        </q-item-section>
                                    </q-item>
                                    <q-item style="padding:0px">
                                        <q-item-section>
                                            <div class="q-pt-sm">
                                                <div class="text-subtitle1">Tanggal dibuat</div>
                                                <div class="text-weight-light">10 Januari 2020</div>
                                            </div>
                                            <div class="q-pt-sm">
                                                <div class="text-subtitle1">Kelas</div>
                                                <div class="text-weight-light">10 SMA</div>
                                            </div>
                                            <div class="q-pt-sm">
                                                <div class="text-subtitle1">Mata Pelajaran</div>
                                                <div class="text-weight-light">PKN</div>
                                            </div>
                                        </q-item-section>
                                    </q-item> -->
              </q-tab-panel>
              <q-tab-panel name="ringkasan" style="padding:0px">
                <div class="q-py-sm q-px-md text-weight-medium" style="font-size:14px">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-item>
        </div>
      </div>
    </q-page>
    <q-page class="column" style="min-height:0px" v-if="show">
      <div class="col-1 q-px-xl q-py-lg">
        <div class="text-body2 text-weight-light" style="color:white;font-size:16px">
          Pendidikan Agama Islam dan Budi Pekerti
        </div>
      </div>
      <div class="col">
        <div class="q-px-md q-pb-lg" 
          style="background-color:white;
            max-height:80%;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;"
          >
            <div class="row">
              <div class="col-4"></div>
              <div class="col-4 text-center" >
                <q-img no-default-spinner src="~assets/detail-button.png" clickable  @click="close()"></q-img>
              </div>
              <div class="col-4"></div>
            </div>
            <q-item class="text-center q-pa-md">
              <q-item-section class="">
                <q-item-label class="q-px-xl q-py-md">
                  <q-select 
                    dense
                    outlined
                    class=""
                    rounded
                    bg-color="white"
                    v-model="model" 
                    style="width:100%"
                    :options="options"
                    map-options
                    label="Bab" 
                  />
                </q-item-label>
                <q-item-label>
                  <div class="q-mb-sm text-h5 text-weight-medium">
                    Judul
                  </div>
                </q-item-label>
                <q-item-label>
                  <div>
                    skjdnjsadn adasda sdasdas dasd asdas das dasd asd asdasdasd as
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
      </div>
    </q-page>
    <q-footer v-if="!show" style="background-color:white; height:50px">
      <div class="row">
        <div class="col-4"></div>
          <div clickable class="col-4 text-center" >
            <!-- <item-component></item-component> -->
            <q-img src="~assets/baca-button.png" clickable  @click="open()"></q-img>
            <!-- <detail-modul></detail-modul> -->
          </div>
        <div class="col-4"></div>
      </div>
    </q-footer>
  </div>
</template>

<script>
export default {
    components: {
        DetailModul: () => import("components/Modul/DetailModul.vue")
    },
    data(){
        return {
            tab:"modul",
            show:false,
            options:[],
            model:null
        }
    }, methods:{
        // detail() {
        //     this.$q.dialog({
        //         component: DetailModul,
        //         parent: this, 
        //     })
        // },
        open(){
            this.show = true
        },
        close(){
            this.show = false
        }
    }
}
</script>