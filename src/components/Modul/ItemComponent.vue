<template>
<div clickable @click="$router.push('/modul/'+module.id)" style="width:100%">
    <div class="row q-ml-xs q-mt-none q-gutter-xs">
        <div class="col-4">
            <q-img no-default-spinner :src="`${Setting.storageUrl}/${module.template.image}`"></q-img>
        </div>
        <div class="col-7">
            <q-item>
                <q-item-section>
                    <q-item-label overline>{{module.grade.description}} | {{module.year}} </q-item-label>
                    <q-item-label>{{module.name}}</q-item-label>
                    <q-item-label caption>{{module.user.name}}</q-item-label>
                </q-item-section>

            </q-item>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    debounce
} from "quasar";
export default {
    props: ["module"],
    data() {
        return {
            search: "",
            items: {},
            loading: false
        };
    },
    computed: {
        ...mapState(["Setting", "ModulesByEducational"]),

    },
    created() {},
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
