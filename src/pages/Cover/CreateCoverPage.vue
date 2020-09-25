<template>
<div>
    <q-header>
        <q-toolbar style="background-color:#840000">
            <q-btn flat dense icon="arrow_back" @click="$router.push({name:'/'})" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="font-size:15px">Buat Sampul Modul</div>
            </q-toolbar-title>
        </q-toolbar>
        <q-toolbar style="background-color:white" class="q-px-none">
            <!-- <q-tabs
                    style="width:100%"
                    v-model="tab"
                    dense
                    active-color="white"
                    indicator-color="transparent"
                    align="justify"
                >
                    <div class="row full-width text-black">
                        <div class="col-4 q-pt-xs"
                            style="border-right:2px solid #ebebe0;"
                            :style="`${tab == 'content'? 'background-color:#840000' : 'background-color:white'}`"
                        >
                            <q-tab class="q-pa-none" no-caps name="content" label="">
                                <span class="material-icons" style="padding-right:5px;color:gray;font-size:26px"
                                    :style="`${tab == 'content'? 'color:white' : null}`"
                                >
                                    widgets
                                </span> <span>Content</span> 
                            </q-tab>
                        </div>
                        <div class="col-4 q-pt-xs"
                            :style="`${tab == 'block'? 'background-color:#840000' : 'background-color:white'}`"
                        >
                            <q-tab class="q-pa-none" no-caps name="block" label="">
                                <span class="material-icons" style="padding-right:5px;color:gray;font-size:26px"
                                    :style="`${tab == 'block'? 'color:white' : null}`"
                                >
                                    grid_on
                                </span> <span>Block</span> 
                            </q-tab>
                        </div>
                        <div class="col-4 q-pt-xs"
                            style="border-left:2px solid #ebebe0"
                            :style="`${tab == 'body'? 'background-color:#840000' : 'background-color:white'}`"
                        >
                            <q-tab class="q-pa-none" no-caps name="body" label="">
                                <span class="material-icons" style="padding-right:5px;color:gray;font-size:26px"
                                    :style="`${tab == 'body'? 'color:white' : null}`"
                                >
                                    palette
                                </span> <span>Body</span> 
                            </q-tab>
                        </div>
                    </div>
                </q-tabs> -->
            <div class="row full-width text-black">
                <div class="col-4 text-center q-pa-sm" style="border:1px solid #ebebe0;
                        padding-top:10px" :style="`${content == true? 'background-color:#840000' : 'background-color:white'}`">
                    <q-btn flat dense no-caps v-model="content" @click="cek()">
                        <span class="material-icons" style="padding-right:5px;color:gray;font-size:26px">
                            widgets
                        </span>
                        Content
                        <q-menu anchor="top left" self="bottom left" :offset="[0, 16]" content-style="width:100%;
                            box-shadow:none;
                            border-bottom-right-radius:30px;
                            background-color:white">
                            <q-list>
                                <q-item clickable v-close-popup>
                                    <q-item-section class="q-px-md">
                                        <q-btn outline dense no-caps color="red-10">
                                            <span class="material-icons" style="font-size:20px;
                                                    padding-right:5px">
                                                text_fields
                                            </span>
                                            Text
                                        </q-btn>
                                    </q-item-section>
                                    <q-item-section class="q-px-md">
                                        <q-btn outline dense no-caps color="red-10">
                                            <span class="material-icons" style="font-size:20px;
                                                    padding-right:5px">
                                                insert_photo
                                            </span>
                                            Gambar
                                        </q-btn>
                                    </q-item-section>
                                    <q-item-section class="q-px-md">
                                        <q-btn outline dense no-caps color="red-10">
                                            <span class="material-icons" style="font-size:20px;
                                                    padding-right:5px">
                                                remove
                                            </span>
                                            divider
                                        </q-btn>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                    <q-item-section class="q-px-md">
                                        <q-btn outline dense no-caps color="red-10">
                                            <span class="material-icons" style="font-size:20px;
                                                    padding-right:5px">
                                                title
                                            </span>
                                            Judul
                                        </q-btn>
                                    </q-item-section>
                                    <q-item-section class="q-px-md">
                                        <q-btn outline dense no-caps color="red-10">
                                            <span class="material-icons" style="font-size:20px;
                                                    padding-right:5px">
                                                class
                                            </span>
                                            Kelas
                                        </q-btn>
                                    </q-item-section>
                                    <q-item-section class="q-px-md">
                                        <q-btn outline dense no-caps color="red-10">
                                            <span class="material-icons" style="font-size:20px;
                                                    padding-right:5px">
                                                date_range
                                            </span>
                                            Tahun
                                        </q-btn>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                    <q-item-section class="q-px-md">
                                        <q-btn outline dense no-caps color="red-10">
                                            <span class="material-icons" style="font-size:20px;
                                                    padding-right:5px">
                                                school
                                            </span>
                                            Mapel
                                        </q-btn>
                                    </q-item-section>
                                    <q-item-section class="q-px-md">
                                        <q-btn outline dense no-caps color="red-10">
                                            <span class="material-icons" style="font-size:20px;
                                                    padding-right:5px">
                                                face
                                            </span>
                                            Penulis
                                        </q-btn>
                                    </q-item-section>
                                    <q-item-section class="q-px-md">

                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
                <div class="col-4 text-center q-pa-sm" style="border:1px solid #ebebe0;
                        padding-top:10px" :style="`${content == true? 'background-color:#840000' : 'background-color:white'}`">
                    <q-btn flat dense no-caps v-model="block" @click="cek()">
                        <span class="material-icons" style="padding-right:5px;color:gray;font-size:26px">
                            grid_on
                        </span>
                        Block
                        <q-menu anchor="top middle" self="bottom middle" :offset="[0, 16]" content-style="width:100%;
                                box-shadow:none;
                                border-bottom-left-radius:30px;
                                border-bottom-right-radius:30px;
                                background-color:white">
                            <q-list>
                                <q-item clickable v-close-popup>
                                    <q-item-section class="q-px-md">
                                        <div class="row">
                                            <div class="col-12" style="border:2px solid grey;
                                                    height:25px">
                                            </div>
                                        </div>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                    <q-item-section class="q-px-md">
                                        <div class="row">
                                            <div class="col-6" style="border:2px solid grey;
                                                    height:25px">
                                            </div>
                                            <div class="col-6" style="border:2px solid grey;
                                                    height:25px">
                                            </div>
                                        </div>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                    <q-item-section class="q-px-md">
                                        <div class="row">
                                            <div class="col-4" style="border:2px solid grey;
                                                    height:25px">
                                            </div>
                                            <div class="col-4" style="border:2px solid grey;
                                                    height:25px">
                                            </div>
                                            <div class="col-4" style="border:2px solid grey;
                                                    height:25px">
                                            </div>
                                        </div>
                                    </q-item-section>
                                </q-item>
                                <!-- <q-item clickable v-close-popup>
                                        <q-item-section class="q-px-md">
                                            <div class="row">
                                                <div class="col-9" 
                                                    style="border:2px solid grey;
                                                    height:25px">
                                                </div>
                                                <div class="col-3" 
                                                    style="border:2px solid grey;
                                                    height:25px">
                                                </div>
                                            </div>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup>
                                        <q-item-section class="q-px-md">
                                            <div class="row">
                                                <div class="col-3" 
                                                    style="border:2px solid grey;
                                                    height:25px">
                                                </div>
                                                <div class="col-9" 
                                                    style="border:2px solid grey;
                                                    height:25px">
                                                </div>
                                            </div>
                                        </q-item-section>
                                    </q-item> -->

                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
                <div class="col-4 text-center q-pa-sm" style="border:1px solid #ebebe0;
                        padding-top:10px" :style="`${body == true? 'background-color:#840000' : 'background-color:white'}`">
                    <q-btn flat dense no-caps v-model="body" @click="cek()">
                        <span class="material-icons" style="padding-right:5px;color:gray;font-size:26px">
                            palette
                        </span>
                        Body
                        <q-menu anchor="top right" self="bottom right" :offset="[0, 16]" content-style="width:100%;
                                box-shadow:none;
                                border-bottom-left-radius:30px;
                                border-bottom-right-radius:30px;
                                background-color:white">
                            <q-list class="q-pa-md">
                                <q-item>
                                    <q-item-section avatar>
                                        <q-item-label>
                                            Warna Background
                                        </q-item-label>
                                        <q-item-label>

                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item>

                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
            </div>
        </q-toolbar>
        <!-- <q-toolbar v-if="tab" style="background-color:white">
                <q-tab-panels
                    v-model="tab"
                    animated
                    >
                    <q-tab-panel
                        name="content"
                        style="background-color:white
                            border-bottom-left-radius:30px;
                            border-bottom-right-radius:30px"
                    >
                        <div class="row" 
                            style="">
                            <div class="col-4">
                                <q-btn outlined color="red-10" label="text">

                                </q-btn>
                            </div>
                            <div class="col-4">

                            </div>
                            <div class="col-4">

                            </div>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </q-toolbar> -->
    </q-header>
    <q-page class="q-pa-md" style="max-width:100%">
        <div class="q-px-md text-center">
            <div class="q-mx-auto" style="background-color:grey; height:450px; width:300px">
                <q-img src="~assets/cover.png"></q-img>
            </div>
            <div class="q-pt-md">
                <q-input dense no-caps color="red-10" label="Kategori Template..">
                    <template v-slot:after>
                        <q-btn rounded flat no-caps style="background-color:#840000;
                                color:white;
                                font-size:12px">
                            Simpan
                        </q-btn>
                    </template>
                </q-input>
            </div>
        </div>
    </q-page>
</div>
</template>

<script>
export default {
    data() {
        return {
            content: false,
            block: false,
            body: false
        }
    },
    method: {
        cek() {
            console.log("content: ", this.content)
            console.log("block: ", this.content)
            console.log("body: ", this.content)
        }
    }
}
</script>
