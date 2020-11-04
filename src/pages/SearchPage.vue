<template>
<q-layout view="hHh Lpr fFf">
    <q-header elevated>
        <q-toolbar class="bg-white">
            <q-btn color="red" flat dense icon="arrow_back" @click="$router.back()" />
            <q-toolbar-title>
                <q-input dense color="red" square v-model="search" label="Cari" borderless class="q-ml-sm q-mr-sm" @input="onSearch">
                    <template v-slot:after>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page-container>
        <q-infinite-scroll @load="onLoad" :offset="250">
            <q-list bordered class="rounded-borders">
                <div v-if="loading">
                    <q-item style="max-width: 300px;" v-for="n in 5" :key="`loading-${n}`">
                        <q-item-section avatar>
                            <q-skeleton height="100px" width="100px" type="QAvatar" square />
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>
                                <q-skeleton type="text" />
                            </q-item-label>
                            <q-item-label caption>
                                <q-skeleton type="text" width="65%" />
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </div>
                <div v-if="items.data">
                    <q-intersection v-for="item in items.data" :key="item.id" :style="`min-height:15vh;width: 100vw`" transition="scale">
                        <item-component :module="item"></item-component>

                    </q-intersection>
                </div>
            </q-list>

            <template v-slot:loading>
                <div class="row justify-center q-my-md">
                    <q-spinner-dots color="teal" size="40px" />
                </div>
            </template>
        </q-infinite-scroll>
    </q-page-container>
</q-layout>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    debounce
} from "quasar";
export default {
    components: {
        ItemComponent: () => import("components/Modul/ItemComponent.vue")
    },
    data() {
        return {
            search: "",
            items: {},
            loading: false
        };
    },
    created() {
        this.onSearch = debounce(this.onSearch, 1000);
    },
    methods: {
        onSearch() {
            if (this.search.length != 0) {
                this.loading = true;
                this.$store
                    .dispatch("ModulesAll/index", {
                        search: this.search
                    })
                    .then(res => {
                        this.items = res.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        onLoad(index, done) {
            this.items.next_page_url ?
                this.$store
                .dispatch("ModulesAll/nextSearch", this.items.next_page_url)
                .then(res => {
                    const items = {
                        ...res.data,
                        data: [...this.items.data, ...res.data.data]
                    };
                    this.items = items;
                    done();
                }) :
                done();
        }
    }
};
</script>

<style></style>
