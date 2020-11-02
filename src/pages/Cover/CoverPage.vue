<template>
<div>
    <q-header>
        <q-toolbar style="background-color:#840000">
            <q-btn flat dense icon="arrow_back" @click="$router.push({name:'create'})" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="font-size:15px">
                    Sampul Modul Template
                </div>
            </q-toolbar-title>
        </q-toolbar>
        <q-toolbar style="padding:0px;margin:0px;background-color:#840000">
            <div class="col">
                <q-tabs v-model="tab" dense class="text-black" active-color="white" indicator-color="red-10" align="justify">
                    <div class="row full-width text-weight-medium">
                        <div class="col-6 " style="background-color:#d5d5c3" :style="`${tab == 'template'? 'background-color:#840000' : 'background-color:white'}`">
                            <q-tab class="q-pa-sm " no-caps name="template" label="Template" />
                        </div>
                        <div class="col-6" style="background-color:#d5d5c3" :style="`${tab == 'self'? 'background-color:#840000' : 'background-color:white'}`">
                            <q-tab class="q-pa-sm " no-caps name="self" label="Milik Anda" />
                        </div>
                    </div>
                </q-tabs>
            </div>
        </q-toolbar>
    </q-header>

    <q-tab-panels v-model="tab" animated style="height:-webkit-fill-available">
        <q-tab-panel name="template" style="height:100%;background-color:white">
            <div class="row full-width">
                <div class="col-7">
                    <q-select dense outlined class="" bg-color="white" v-model="module.template_category" style="width:100%" :options="template_categories_options" option-label="name" option-value="id" label="Kategori" />
                </div>
                <div class="col-5 text-right">
                    <q-btn class="q-px-md" style="background-color:#840000; 
                                color:white;font-size:16px" no-caps rounded @click="$q.notify('Dalam konstruksi') /*$router.push('/create/cover/new')*/" label="buat baru">
                    </q-btn>
                </div>
            </div>
            <div class="row">
                <q-intersection v-ripple @click="selectTemplate(template)" v-for="(template,n) in filteredTemplates" :key="`tempate${n}`" style="min-height:100px;width:50%" class="relative-position q-pa-sm">
                    <template-cover :item="template"></template-cover>
                </q-intersection>
            </div>
        </q-tab-panel>
        <q-tab-panel name="self" style="height:100%;background-color:white">
            <div class=" row full-width">
                <div class="col-7">
                    <q-select dense outlined class="" bg-color="white" v-model="module.owned_template_category" style="width:100%" :options="template_categories_options" option-label="name" option-value="id" label="Kategori" />
                </div>
                <div class="col-5 text-right">
                    <q-btn class="q-px-md" style="background-color:#840000; 
                                color:white;font-size:16px" no-caps rounded @click="$q.notify('Dalam konstruksi') /*$router.push('/create/cover/new')*/" label="buat baru">
                    </q-btn>
                </div>
            </div>
            <div class="row" style="">
                <q-intersection v-ripple @click="selectTemplate(template)" v-for="(template,n) in filteredOwnedTemplates" :key="`owned_template${n}`" style="min-height:100px;width:50%" class="relative-position q-pa-sm">
                    <my-cover :item="template"></my-cover>
                </q-intersection>
            </div>
        </q-tab-panel>
    </q-tab-panels>
</div>
</template>

<script>
import {
    mapState
} from "vuex";

export default {
    components: {
        TemplateCover: () => import("components/CreateModul/TemplateCover.vue"),
        MyCover: () => import("components/CreateModul/MyCover.vue")
    },
    computed: {
        ...mapState(["Module", "Template", "TemplateCategory", "Auth", "Setting", "Grade", "LessonPlanFormat"]),
        filteredTemplates: function () {
            if (this.module.template_category.id == -1) return this.Template.items;
            return this.Template.items.filter(item => {
                return item.template_category ? (item.template_category.id == this.module.template_category.id ? true : false) : false
            })
        },
        filteredOwnedTemplates: function () {
            if (this.module.owned_template_category.id == -1) return this.Template.owned_items;
            return this.Template.owned_items.filter(item => {
                return item.template_category ? (item.template_category.id == this.module.owned_template_category.id ? true : false) : false
            })
        }
    },
    data() {
        return {
            tab: "template",
            model: null,
            options: [],
            template_categories_options: [{
                id: -1,
                name: 'Semua kategori'
            }],
            module: {
                template_category: null,
                owned_template_category: null
            }
        }
    },
    created: function () {
        this.template_categories_options = [...this.template_categories_options, ...this.TemplateCategory.items]
        if (this.Module.build.template_category) {
            this.module.template_category = this.Module.build.template_category
        } else this.module.template_category = this.template_categories_options[0]

        if (this.Module.build.owned_template_category) {
            this.module.owned_template_category = this.Module.build.owned_template_category
        } else this.module.owned_template_category = this.template_categories_options[0]
    },
    mounted() {
        if (!this.Template.items.length) this.$store.dispatch("Template/index");
        if (!this.Template.owned_items.length) this.$store.dispatch("Template/index_owned");
        if (!this.TemplateCategory.items.length) {
            this.$store.dispatch("TemplateCategory/index").then(res => {
                this.template_categories_options = [...this.template_categories_options, ...this.TemplateCategory.items]
            });
        }

    },
    watch: {
        'module.template_category': function (newVal, oldVal) {
            this.$store.commit("Module/setTemplateCategory", {
                template_category: newVal
            });
        },
        'module.owned_template_category': function (newVal, oldVal) {
            this.$store.commit("Module/setOwnedTemplateCategory", {
                owned_template_category: newVal
            });
        },
        // 'module.contents': {
        //     handler: function (newVal, oldVal) {
        //         this.$store.commit("Module/setContents", {
        //             contents: newVal
        //         });
        //     },
        //     deep: true
        // },
    },
    methods: {
        selectTemplate: function (template) {
            //return;
            this.$router.push({
                name: 'editcoverdesign',
                params: {
                    selectedImage: template
                }
            })
            // this.$store.commit('Module/setSelectedTemplate', {
            //     selected_template: template
            // });

        }
    }

}
</script>
