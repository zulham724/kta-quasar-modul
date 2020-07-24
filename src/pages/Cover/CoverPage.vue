<template>
    <div>
        <q-header>
            <q-toolbar style="background-color:#840000">
                <q-btn flat dense icon="arrow_back" @click="$router.back()" />
                <q-toolbar-title>
                    <div class="text-body2 text-weight-light" style="font-size:15px">
                        Sampul Modul Template
                    </div>
                </q-toolbar-title>
            </q-toolbar>
            <q-toolbar style="padding:0px;margin:0px;background-color:#840000">
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
                                style="background-color:#d5d5c3"
                                :style="`${tab == 'template'? 'background-color:#840000' : 'background-color:white'}`"
                            >
                                <q-tab
                                    class="q-pa-sm "
                                    no-caps
                                    name="template"
                                    label="Template"
                                />
                            </div>
                            <div
                                class="col-6"
                                style="background-color:#d5d5c3"
                                :style="`${tab == 'self'? 'background-color:#840000' : 'background-color:white'}`"
                            >
                                <q-tab 
                                    class="q-pa-sm " 
                                    no-caps name="self" 
                                    label="Milik Anda" 
                                    />
                            </div>
                        </div>
                    </q-tabs>
                </div>
            </q-toolbar>
        </q-header>
        
            <q-tab-panels
            v-model="tab"
            animated
            style="height:-webkit-fill-available"
            >
            <q-tab-panel
                name="template"
                style="height:100%;background-color:white"
            >
                <div class=" row full-width">
                    <div class="col-7">
                        <q-select 
                            dense
                            outlined
                            class=""
                            bg-color="white"
                            v-model="model" 
                            style="width:100%"
                            :options="options"
                            map-options
                            label="Kategori" 
                        />
                    </div>
                    <div class="col-5 text-right">
                        <q-btn 
                            class="q-px-md"
                            style="background-color:#840000; 
                                color:white;font-size:16px"
                            no-caps
                            rounded
                            @click="$router.push('/create/cover/new')"
                            label="buat baru"
                        >
                        </q-btn>
                    </div>
                </div>
                    <div class="row" style="">
                        <div v-for="n in 8" :key="n" style="width:50%" class="q-pa-sm">
                            <template-cover></template-cover>
                        </div>
                </div>
            </q-tab-panel>
            <q-tab-panel
                name="self"
                style="height:100%;background-color:white"
            >
                <div class=" row full-width">
                    <div class="col-7">
                        <q-select 
                            dense
                            outlined
                            class=""
                            bg-color="white"
                            v-model="model" 
                            style="width:100%"
                            :options="options"
                            map-options
                            label="Kategori" 
                        />
                    </div>
                    <div class="col-5 text-right">
                        <q-btn 
                            class="q-px-md"
                            style="background-color:#840000; 
                                color:white;font-size:16px"
                            no-caps
                            rounded
                            @click="$router.push('/create/cover/new')"
                            label="buat baru"
                        >
                        </q-btn>
                    </div>
                </div>
                    <div class="row" style="">
                        <div v-for="n in 8" :key="n" style="width:50%" class="q-pa-sm">
                            <my-cover></my-cover>
                        </div>
                </div>
            </q-tab-panel>
            </q-tab-panels>
    </div>
</template>
    
<script>
export default {
    components: {
        TemplateCover: () => import("components/CreateModul/TemplateCover.vue"),
        MyCover: () => import("components/CreateModul/MyCover.vue")
    },
    data() {
        return{
            tab:"template",
            model:null,
            options:[]
        }
    }
}
</script>