<template>
<div>
    <sampul-maker :img="img" :items="items">
        <template v-slot:color="{item}">
            <q-color v-model="item.color" class="my-picker" />
        </template>
        <template v-slot:size="{item}">
            <q-slider label v-model="item.size" :min="1" :max="10" />
        </template>
    </sampul-maker>
</div>
</template>

<script>
import SampulMaker from 'components/SampulMaker/SampulMaker.vue';

export default {
    components: {
        'SampulMaker': SampulMaker
    },
    data() {
        return {
            img: 'https://s3.us-west-1.wasabisys.com/agpaiidigital.org/templates/October2020/K3yezCjuoGB9uyYX8UqB.png',
            items: [{
                    text: 'Rieqy Muwachid Erysya',
                    color: '#00ff00',
                    size: 5,
                    y: 100, //posisi awal y
                },
                {
                    text: 'Mata Pelajaran Agama Islam dan asda sdsa sd',
                    color: '#00f0ff',
                    size: 10,
                    y: 200 //posisi awal y
                }
            ]
        }
    },

}
</script>

<style>
img.preview {
    width: 90vw;
    height: 90vh;
    background-color: white;
    border: 1px solid #DDD;
    padding: 5px;
}
</style>
