<template>
<div>
    <q-pull-to-refresh @refresh="refresh">
        <q-header>
            <q-toolbar style="background-color:#840000">
                <q-btn flat dense icon="arrow_back" style="font-size:18px" @click="$router.back()" />
                <q-toolbar-title>
                    <div class="text-body2 text-weight-light" style="font-size:16px">Kategori {{EducationalLevelId}}</div>
                </q-toolbar-title>
            </q-toolbar>
            <q-toolbar class="q-pb-md q-pt-sm q-px-md" style="background-color:#840000">
                <div class="row full-width justify-between">
                    <div class="col-7">
                        <!--<q-input v-model="search" @input="searchModules()" outlined rounded dense style="width:100%" label="Cari Modul" bg-color="white" class="q-mr-sm">-->
                        <q-input v-model="search" outlined rounded dense style="width:100%" label="Cari Modul" bg-color="white" class="q-mr-sm">
                            <template v-slot:append>
                                <q-icon />
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-4">
                        <q-select dense outlined rounded bg-color="white" v-model="model" style="width:100%" :options="getGradeOptions" option-label="description" option-value="id" label="Pilih kelas" />
                    </div>
                </div>
            </q-toolbar>
        </q-header>
        <q-page style="">

            <q-infinite-scroll @load="onLoad" :offset="250">
                <div class="row">
                    <q-intersection v-for="(item, n) in getModules" :key="n" style="min-width:33.3%;min-height:100px" class="q-pa-xs">
                        <modul :module="item"></modul>
                    </q-intersection>
                </div>
                <template v-slot:loading>
                    <div class="row justify-center q-my-md">
                        <q-spinner-dots color="primary" size="40px" />
                    </div>
                </template>
            </q-infinite-scroll>
        </q-page>
        <q-footer style="height:44px;background-color:rgba(0,0,0,0);">
            <div class="row">
                <div class="col-4" style="position:relative;height:px; background-color:#EEEE" clickable @click="$router.push('/')">
                    <div class="q-pt-xs text-center">
                        <span class="material-icons" style="color:#840000;font-size:44px">
                            home
                        </span>
                    </div>
                </div>
                <div class="col-4" style="height:50px;">
                    <div class="text-center">
                        <q-img src="~assets/mid-footer.png"></q-img>
                        <div class="q-pa-xs q-mx-auto" style="border-radius:60px;
                height:60px;width:60px;
                background-color:#840000;
                transform:translate(0%,-140%)" clickable @click="$router.push('/create')">
                            <span class="material-icons" color="white" style="font-size:50px">
                                add
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-4" style="height:50px; background-color:#EEEE" clickable @click="$router.push('/profil')">
                    <div class="q-pt-xs text-center">
                        <span class="material-icons light" style="color:#333333;font-size:44px">
                            person
                        </span>
                    </div>
                </div>
            </div>
        </q-footer>
    </q-pull-to-refresh>

</div>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    debounce
} from 'quasar'

export default {
    components: {
        Modul: () => import("components/Modul.vue")
    },
    data() {
        return {
            EducationalLevelId: 'SMK',
            search: '',
            model: {
                id: -1,
                description: 'Semua'
            },
            options: [],
            items: null,
        }
    },
    computed: {
        ...mapState(["Setting", "ModulesByEducational"]),
        getModules: function () {
            const index = this.ModulesByEducational.items.findIndex(e => e.name == this.EducationalLevelId);
            if (index == -1) {
                return [];
            } else {
                //alert('bai')
                let search = this.search.trim().toLocaleLowerCase();
                return this.ModulesByEducational.items[index].data.data.filter(e => {
                    let condition1 = search != '' ? (e.name ? e.name.toLocaleLowerCase().includes(search) : false) : true
                    let condition2 = this.model.id > -1 ? e.grade_id == this.model.id : true;
                    return condition1 && condition2;
                })
            }
        },
        getGradeOptions: function () {
            const index = this.ModulesByEducational.items.findIndex(e => e.name == this.EducationalLevelId);
            return index == -1 ? [] : [{
                id: -1,
                description: 'Semua'
            }, ...this.ModulesByEducational.items[index].grades]
        }
        // isReady: function () {
        //     const index = this.ModulesByEducational.items.findIndex(e => e.name == this.EducationalLevelId);
        //     if (index == -1) return false;
        //     else return true;
        // }
    },
    created: function () {
        //console.log(this.$store.getters['ModulesByEducational/items'])
        // this.searchModules = debounce(this.searchModules, 500)
        let index = this.ModulesByEducational.items.findIndex(e => e.name == this.EducationalLevelId);
        if (index == -1) this.$store.dispatch('ModulesByEducational/index', {
            educationalLevelId: this.EducationalLevelId,
            search: this.search
        }).then(res => {
            index = this.ModulesByEducational.items.findIndex(e => e.name == this.EducationalLevelId);
            // this.options =
            //this.items = this.ModulesByEducational.items[index].data.data
        });
        //this.refresh();
    },
    methods: {
        onLoad(idx, done) {
            const find = this.ModulesByEducational.items.find(e => e.name == this.EducationalLevelId);
            if (!find) done()
            else {
                if (find.data.next_page_url == null) done();
                else {
                    this.$store.dispatch('ModulesByEducational/next', {
                        next_page_url: find.data.next_page_url
                    }).then(res => {
                        done();
                    }).catch(err => {
                        alert(err)
                    })
                }
            }

        },
        refresh(done) {
            this.$store.dispatch('ModulesByEducational/index', {
                educationalLevelId: this.EducationalLevelId,
                search: this.search
            }).then(res => {
                done();
            });
        },
        searchModules() {
            //alert(this.search)
            this.items = null;
            // const index = this.ModulesByEducational.items.findIndex(e => e.name == this.EducationalLevelId);
            this.$store.dispatch('ModulesByEducational/index', {
                educationalLevelId: this.EducationalLevelId,
                search: this.search
            });

        },

    },
    // destroyed() {
    //     alert('aa')
    // },

}
</script>
