<template>
<div v-bind:id="editorId" class="unlayer-editor" v-bind:style="{ minHeight: minHeight }"></div>
</template>

<script>
import {
    loadScript
} from './loadScript';
//import pkg from '../../package.json';
let lastEditorId = 0;
export default {
    name: 'EmailEditor',
    props: {
        options: Object,
        projectId: Number,
        tools: Object,
        appearance: Object,
        locale: String,
        minHeight: {
            type: String,
            default: '500px',
        },
    },
    computed: {
        editorId() {
            return `editor-${++lastEditorId}`;
        }
    },
    created() {},
    mounted() {
        loadScript(this.loadEditor.bind(this));
    },
    methods: {
        loadEditor() {
            const options = this.options || {};
            if (this.projectId) {
                options.projectId = this.projectId
            }
            if (this.tools) {
                options.tools = this.tools
            }

            if (this.appearance) {
                options.appearance = this.appearance
            }
            if (this.locale) {
                options.locale = this.locale
            }
            /* global unlayer */
            this.editor = unlayer.createEditor({
                ...options,
                id: this.editorId,
                displayMode: 'email',
                source: {
                    name: 111,
                    version: 111,
                },
            });
            this.$emit('load');
        },
        loadDesign(design) {
            this.editor.loadDesign(design);
        },
        saveDesign(callback) {
            this.editor.saveDesign(callback);
        },
        exportHtml(callback) {
            this.editor.exportHtml(callback);
        }
    },
}
</script>
