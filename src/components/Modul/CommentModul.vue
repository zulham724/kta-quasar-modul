<template>
  <div>
    <q-item 
      style="padding-left:0px; 
      padding-right:0px;
      padding-bottom:0px"
    >
      <q-item-section avatar top>
        <q-avatar class=" text-center" rounded size="18vw">
          <img src="https://cdn.quasar.dev/img/avatar.png" >
        </q-avatar>
      </q-item-section>
      <q-item-section top>
        <q-item-label>
          <div class="text-subtitle2 text-weight-bold">Bapak Jodi</div>
        </q-item-label>
        <q-item-label>
          <div class="q-pa-sm" 
            style="background-color:#F1E4E4;
            border-radius:5px;word-wrap:break-word;"
          >
            {{text}}
          </div>
        </q-item-label>
        <q-item-label caption>
          <div class="row  justify-between">
            <div class="col-6" style="">
              <span class="material-icons" color="white" style="font-size:16px">
                favorite_border
              </span> 
              10 Suka
            </div>
            <div class="col-6 text-right">
              <div class="text-weight-light">Timestamp</div> 
            </div>
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
    data() {
        return{
            text:"Wah modul nya sangat bagus. Isinya menarik dan mudah dipahami"
        }
    }
}
</script>