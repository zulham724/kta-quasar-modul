<template>
  <div>
    <q-item style="padding-left:0px; padding-right:0px">
      <q-item-section avatar top>
        <q-avatar class=" text-center" rounded size="18vw">
          <q-img src="https://cdn.quasar.dev/img/avatar.png"></q-img>
        </q-avatar>
      </q-item-section>
      <q-item-section top>
        <q-item-label>
          <div class="text-weight-bold" style="font-size:15px">Bapak Jodi</div>
        </q-item-label>
        <q-item-label>
          <div class="q-pa-sm" 
            style="background-color:#F1E4E4;
            border-radius:5px;
            word-wrap:break-word"
          >
            {{text}}
          </div>
        </q-item-label>
        <q-item-label caption>
          <div class="text-weight-light">Timestamp</div>
        </q-item-label> 
      </q-item-section>
      <q-item-section side top>
        <div class="q-px-md q-py-sm text-center text-black" 
          style="background-color:#FEF49F;
          border-radius:5px;
          font-size:16px"
        >
          <div class="text-weight-regular">Nilai</div>
          <div class="text-weight-bold" style="font-size:20px">90</div>
        </div>
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