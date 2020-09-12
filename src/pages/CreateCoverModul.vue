<template>
<div id="app">
    <q-header>
        <q-toolbar style="background-color:#840000">
            <q-btn flat dense icon="arrow_back" @click="$router.back()" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="max-width:strecth;font-size:15px">Buat Modul</div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <div class="q-pa-sm">
        <froala id="edit" :tag="'textarea'" :config="config" v-model="model"></froala>
    </div>
</div>
</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';
// import froala from 'boot/vue-froala-wysiwyg';
export default {
    name: 'app',
    data() {
        return {
            config: {
                events: {
                    initialized: function () {
                        console.log('initialized')
                    }
                }
            },
            model: 'Edit Your Content Here!'
        }
    }
}
</script>
