<template>
    <div>
        <div style="background-color:white; height:600px;width:100%" v-if="show" > 
            <q-card-section>
                <q-item>
                    <q-item-section>
                        <div>muncul</div>
                    </q-item-section>
                </q-item>
            </q-card-section>
        </div>
        
            <!-- <transition appear enter-active-class="animated flipInX"
                            leave-active-class="animated flipOutY" :duration="1000">
                            <div
                                v-if="show"
                                style="
                                position:absolute;
                                top: 100px;
                                left: 100px;
                                background-color: Salmon;
                                width: 400px;
                                height: 400px;
                                "
                            >Hello</div>
                        </transition> -->
        <div v-if="!show">
            <q-img src="~assets/baca-button.png" clickable  @click="open()"></q-img>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        
    },
    data(){
        return {
            show: false
        }
    },
    methods:{
        open(){
            this.show=true
            console.log("cek:", this.show)
        }
    }
}
</script>