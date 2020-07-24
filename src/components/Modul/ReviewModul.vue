<template>
    <div>
        <q-item style="padding-left:0px; padding-right:0px">
            <q-item-section avatar top>
                <q-avatar class=" text-center" rounded size="18vw">
                    <img src="https://cdn.quasar.dev/img/avatar.png" >
                </q-avatar>
            </q-item-section>
            <q-item-section top>
                <q-item-label>
                    <div class="text-subtitle2">Bapak Jodi</div>
                </q-item-label>
                <q-item-label caption>
                    <div class="q-pa-sm text-caption" 
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
                <div class="q-pa-md text-weight-bold text-center text-black" 
                    style="background-color:#FEF49F;
                    border-radius:5px;
                    font-size:16px"
                >
                    <div>Nilai</div>
                    <div class="text-weight-bold">90</div>
                </div>
            </q-item-section>
        </q-item>
    </div>
</template>

<script>
export default {
    data() {
        return{
            text:"123456789123456udga76ssassssssssssssyum"
        }
    }
}
</script>