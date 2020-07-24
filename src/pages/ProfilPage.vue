<template>
  <div>
    <q-header>
      <q-toolbar style="background-color:#840000">
        <q-btn flat dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>
          <div class="text-body2 text-weight-light" style="font-size:15px">
            Profil
          </div>
        </q-toolbar-title>
        <!-- <q-btn color="white" round flat icon="more_vert">
          <q-menu> </q-menu>
        </q-btn> -->
      </q-toolbar>
    </q-header>
    <q-page class="column">
      <div class="col-3">
        <div class="q-pa-md">
          <q-item style="padding:0px">
            <q-item-section avatar>
              <q-avatar class=" text-center" rounded size="22vw">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section top>
              <q-item-label>
                <div class="text-h6 text-weight-bold">John Cena</div>
              </q-item-label>
              <q-item-label caption>
                <div>No anggota:21211</div>
                <div>admin</div>
                <div>Visit poker66.co.id</div>
              </q-item-label>
            </q-item-section>
          </q-item>

          <div class="row q-pt-md align-left" style="font-size:40px">
            <div
              class="col-3 text-h5 text-bold q-mr-md"
              style="border-right:2px solid #eaeae1"
            >
              8
              <div class=" text-body2 text-grey-6">
                Modul
              </div>
            </div>
            <div class="col-4 text-h5 text-bold">
              0
              <div class="text-body2 text-grey-6">
                Disukai
              </div>
            </div>
            <div class="col-4 text-h5 text-bold">
              2
              <div class="text-body2 text-grey-6">
                Menyukai
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <q-tabs 
          v-model="tab"
          dense
          class="text-black"
          active-color="white"
          indicator-color="red-10"
          align="justify"
        >
          <div class="row full-width text-weight-medium">
            <div
              class="col-6 "
              style="background-color:#d5d5c3; 
                        border-top-right-radius:10px;
                        border-top-left-radius:10px"
              :style="`${tab == 'modul'? 'background-color:#840000' : 'background-color:#d5d5c3'}`"
            >
              <q-tab
                class="q-pa-sm "
                no-caps
                name="modul"
                label="Modul Terpublikasi"
              />
            </div>
            <div
              class="col-6"
              style="background-color:#d5d5c3; 
                        border-top-right-radius:10px;
                        border-top-left-radius:10px"
              :style="`${tab == 'draft'? 'background-color:#840000' : 'background-color:#d5d5c3'}`"
            >
              <q-tab 
                class="q-pa-sm " 
                no-caps name="draft" 
                label="Draft" 
                />
            </div>
          </div>
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          style="height:-webkit-fill-available"
        >
          <q-tab-panel
            name="modul"
            style="height:100%;background-color:#840000"
          >
            <div class="full-height" style="">
              <div v-for="n in 2" :key="n" class="q-pa-sm">
                  <modul-publication></modul-publication>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel
            name="draft"
            style="height:100%;background-color:#840000"
          >
            <div class="full-height" style="">
              <div v-for="n in 3" :key="n" class="q-pa-sm">
                  <modul-draft></modul-draft>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-page>
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
            <q-img src="~assets/mid-footer.png" class="items-center"> 
            </q-img>
            <div class="q-pa-xs q-mx-auto" 
                style="border-radius:60px;
                height:60px;width:60px;
                background-color:#CC3636;
                transform:translate(0%,-140%)"
                clickable
                @click="$router.push('/create')"
            >
                <span class="material-icons" color="white" style="font-size:50px">
                    add
                </span>
            </div>
            <!-- <q-avatar size="60px" style="transform:translate(0%,-130%)">
              <q-img src="~assets/add.png"> </q-img>
            </q-avatar> -->
          </div>
        </div>
        <div 
          class="col-4" 
          style="height:50px; background-color:#EEEE"
          clickable
          @click="$router.push('/profil')"
        >
          <div class="q-pt-xs text-center">
            <span
              class="material-icons light"
              style="color:#333333;font-size:44px"
            >
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
        ModulPublication: () => import("components/Profil/ModulPublication.vue"),
        ModulDraft: () => import("components/Profil/ModulDraft.vue")
    },
  data() {
    return {
      tab:"modul"
    };
  }
};
</script>
