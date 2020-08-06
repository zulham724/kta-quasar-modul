<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#840000">
        <q-btn flat dense icon="arrow_back" style="font-size:18px" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body2 text-weight-light" style="font-size:16px">Kategori SMK</div>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="q-pb-md q-pt-sm q-px-md" style="background-color:#840000">
        <div class="row full-width justify-between">
          <div class="col-7">
            <q-input outlined rounded dense style="width:100%" label="Cari Modul" bg-color="white" class="q-mr-sm">
              <template v-slot:append>
                <q-icon />
                <q-icon name="search" />
              </template>
            </q-input> 
          </div>
          <div class="col-4">
            <q-select 
              dense
              outlined
              rounded
              bg-color="white"
              v-model="model" 
              style="width:100%"
              :options="options"
              map-options
              label="Semua" 
            />
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="q-pa-sm" style="padding-top:0px">
        <div class="row">
          <div v-for="n in 8" :key="n" style="width:33.3%" class="q-pa-xs">
            <!-- <modul></modul>     -->
          </div>
        </div>
    </q-page-container>
    <q-footer style="height:44px;background-color:rgba(0,0,0,0);">
        <div class="row">
          <div 
            class="col-4" 
            style="position:relative;height:px; background-color:#EEEE"
            clickable
            @click="$router.push('/')"
          >
            <div class="q-pt-xs text-center">
              <span class="material-icons" style="color:#840000;font-size:44px">
                home
              </span>
            </div>
          </div>
          <div class="col-4" style="height:50px;">
            <div class="text-center">
              <q-img src="~assets/mid-footer.png"></q-img>
              <div class="q-pa-xs q-mx-auto" 
                style="border-radius:60px;
                height:60px;width:60px;
                background-color:#840000;
                transform:translate(0%,-140%)"
                clickable
                @click="$router.push('/create')"
              >
                <span class="material-icons" color="white" style="font-size:50px">
                  add
                 </span>
              </div>
            </div>
          </div>
          <div 
            class="col-4" 
            style="height:50px; background-color:#EEEE"
            clickable
            @click="$router.push('/profil')"
          >
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
        Modul: () =>import("components/Modul.vue")
    },
    data() {
        return{
            model: null,
            options: []
        }
    }
}
</script>