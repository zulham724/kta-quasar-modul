<template>
    <div>
        <q-header>
            <q-toolbar style="background-color:#840000">
                <q-btn flat dense icon="arrow_back" @click="$router.back()" />
                <q-toolbar-title>
                    <div class="text-body2 text-weight-light" style="font-size:15px">Buat Modul</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page>
            <div class="q-pa-md">
                <div class="row">
                    <div class="col-8 text-weight-medium q-gutters-none q-pa-sm">
                            <q-item-label>Sampul Buku Modul</q-item-label>
                            <q-btn 
                                class="q-my-xs"
                                style="background-color:#840000"
                                flat
                                color="white"
                                no-caps
                                @click="$router.push('/create/cover')"
                                label="Pilih Sampul"
                            >
                                <span class="material-icons" style="font-size:16px">
                                    chevron_right
                                </span>
                            </q-btn>
                            <div>Kelas</div>
                            <q-select 
                                dense
                                outlined
                                class="q-pb-xs"
                                bg-color="white"
                                v-model="model" 
                                style="width:100%"
                                :options="options"
                                map-options
                                label="Kelas" 
                            />
                            <div>Mata Pelajaran</div>
                            <q-input dense color="red-10"></q-input>
                    </div>
                    <div class="col-4 q-pa-sm text-center"
                        style="background-color:white" 
                    >
                        <div class="vertical-middle">
                            <q-img src="~assets/cover.png" 
                                style="max-width:100%;max-height:100%;">
                            </q-img>
                        </div>
                        <!-- <q-avatar class=" text-center" square size="20  vw"> -->
                        <!-- </q-avatar> -->
                    </div>
                </div>
                <div class="text-weight-medium">Ringkasan</div>
                <q-input outlined type="textarea" style="width:100%"></q-input>
                <q-card class=" q-my-md" rounded> 
                    <q-card-section>
                        <div class="text-weight-medium text-center">Daftar Isi</div>
                    </q-card-section>
                    <q-card-section style="padding-top:0px;padding-bottom:0px">
                        <q-btn 
                            class="text-weight-light" 
                            style="color:white;font-size:10px;background-color:#840000"
                        >
                            <span class="material-icons" color="white" style="padding-right:5px">
                                add
                            </span>
                            Tambah Bab
                        </q-btn>
                    </q-card-section>
                    <q-card-section style="">
                        <ol class="text-weight-bold" style="padding-left:20px; margin:0px">
                            <div v-for="n in 1" :key="n" >
                                <li>
                                    <q-item style="border-top: 1px solid grey">
                                        <q-item-section>
                                            <q-popup-edit 
                                                buttons
                                                value=""
                                                label-set="Selesai"
                                                label-cancel="Tutup" >
                                                <q-input dense autofocus counter />
                                            </q-popup-edit>
                                            judul bab
                                        </q-item-section>
                                        <q-item-section side class="q-px-xs">
                                            <span class="material-icons" color="blue-grey-13" style="font-size:20px">
                                                delete
                                            </span>
                                        </q-item-section>
                                        <q-item-section side class="q-px-xs">
                                            <span class="material-icons" color="blue-grey-13" style="font-size:20px">
                                                edit
                                            </span>
                                            <q-popup-edit
                                                persistent
                                                title="Isi Bab"
                                                label-set="Selesai"
                                                label-cancel="Tutup"
                                                anchor="top"
                                                self="top left"
                                                buttons
                                                max-width=""
                                                min-height="200rem"
                                                fit
                                            >
                                                <q-editor
                                                    v-model="editor"
                                                    max-width=""
                                                    min-height="10rem"
                                                    autofocus
                                                    @keyup.enter.stop
                                                />
                                            </q-popup-edit>
                                        </q-item-section>
                                    </q-item>
                                </li>
                            </div>
                        </ol>
                    </q-card-section>
                </q-card>
                <q-item class="q-px-sm" style="padding-top:0px">
                    <q-item-section class="q-pr-sm">
                        <q-btn rounded color="grey" label="Simpan"></q-btn>
                    </q-item-section>
                    <q-item-section class="q-pl-sm">
                        <q-btn rounded style="color:white;background-color:#840000" label="Publish"></q-btn>
                    </q-item-section>
                </q-item>
            </div>
        </q-page>
    </div>
</template>

<script>
// import CreateMessage from "components/CreateModul/EditModul";
export default {
    data() {
        return {
            file:null,
            model:null,
            editor:'cek',
            options:[]
        }
    },
    method: {
        // edit() {
        //     component: EditModul
        // }
    }
}
</script>