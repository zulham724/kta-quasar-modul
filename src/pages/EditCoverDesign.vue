<template>
<div>
    <q-header>
        <q-toolbar style="background-color:#840000">
            <q-btn flat dense icon="arrow_back" style="font-size:18px" @click="$router.push('/create')" />
            <q-toolbar-title>
                <div class="text-body2 text-weight-light" style="font-size:15px">Edit Cover Template</div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page class="q-pa-xs">
        <div class="row justify-center q-mb-md">
            <canvas ref="myCanvas" id="myCanvas"></canvas>
            <!--<sampul-maker></sampul-maker>-->
        </div>
        <div class="row q-gutter-sm">
            <div class="col-5">
                <q-input dense filled v-model="canvas_data.color1" class="my-input">
                    <template v-slot:append>
                        <q-icon name="colorize" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-color v-model="canvas_data.color1" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>
        </div>

    </q-page>
</div>
</template>

<script>
import {
    Stage,
    Shape,
    Bitmap,
    Container,
    Text
} from "@createjs/easeljs";

import {
    mapState
} from "vuex";
import {
    debounce
} from 'quasar'
// import CreateMessage from "components/CreateModul/EditModul";
export default {
    data() {
        return {
            loading: false,
            options: [],
            canvas_data: {
                fontsize: 12,
                color1: 'rgba(255,255,255,0.1)',
                container1: null

            }
        }
    },
    computed: {
        ...mapState(["Auth", "Setting", "Grade", "Module"]),
        selectedTemplate: function () {
            if (this.Module.build.selected_template) return `${this.Setting.storageUrl}/${this.Module.build.selected_template.image}`;
            else return null;
        }
    },
    mounted() {
        const canvas_texts = [{
            name: 'name',
            y: 150,
            fontSizeDividedBy: 7, //lebar canvas dibagi dengan nilai ini

        }, {
            name: 'subject',
            y: 250,
            fontSizeDividedBy: 20,
        }];

        var stage = new Stage("myCanvas");
        //stage.mouseMoveOutside = true;
        var img = new Image;
        var bitmap = new Bitmap(img);
        img.onload = () => {
            //bitmap.setTransform(0, 0, 1, 1);
            //stage section
            stage.addChild(bitmap);
            stage.canvas.width = bitmap.getTransformedBounds().width;
            stage.canvas.height = bitmap.getTransformedBounds().height;

            //section buat text & rect
            canvas_texts.forEach(objText => {
                if (this.Module.build[objText.name]) this.createText(stage, bitmap, objText)
            });

        }
        img.src = this.selectedTemplate;
        //if (!this.Grade.items.length) this.$store.dispatch("Grade/index");

    },
    created: function () {
        if (!this.Module.build.selected_template) {
            this.$q.notify('Silahkan pilih template')
            return this.$router.push('/create')
        }
        this.template = {
            ...this.Module.build.selected_template,
            canvas_data: {
                ...this.Module.build.selected_template.canvas_data
            }
        }
        // console.log(this.module)
        // if (this.module.contents.length == 0) this.module.contents.push({
        //     name: 'Judul bab',
        //     value: 'Isi bab'
        // })
    },
    watch: {
        'template.canvas_data': {
            handler: function (newVal, oldVal) {
                this.$store.commit("Module/setTemplateCanvas", {
                    data: newVal
                });
                console.log('cok')
                console.log(newVal)
            },
            deep: true
        },
        'canvas_data.color1': {
            handler: function (newVal, oldVal) {

            }
        }
    },
    methods: {
        createText: function (stage, bitmap, objText) {
            let fontsize1 = bitmap.getTransformedBounds().width / objText.fontSizeDividedBy;
            console.log('fontsize: ' + fontsize1)
            let x_center = bitmap.getTransformedBounds().width / 2;

            let container = new Container();
            container.x = x_center;
            container.y = objText.y;

            const maxTextWidth = bitmap.getTransformedBounds().width - 10;
            var objLineArray = this.wrapText(container, this.Module.build[objText.name], 0, 0, maxTextWidth, fontsize1, fontsize1); //
            container.addChild(this.rectText(objLineArray, fontsize1))
            for (let i = 0; i < objLineArray.length; i++) {
                container.addChild(objLineArray[i])
            }

            stage.addChild(container);
            container.on("pressmove", function (evt) {
                //alert(1)
                // currentTarget will be the container that the event listener was added to:
                evt.currentTarget.x = evt.stageX;
                evt.currentTarget.y = evt.stageY;
                // make sure to redraw the stage to show the change:
                stage.update();
            });
            stage.update();
        },
        rectText: function (objLineArray, fontsize) {
            let maxTextWidth = 0;
            let sumTextHeight = 0;
            for (let i = 0; i < objLineArray.length; i++) {
                const objLineWidth = objLineArray[i].getMeasuredWidth();
                if (objLineWidth > maxTextWidth) maxTextWidth = objLineWidth;
            }
            var rect = new Shape();
            rect.alpha = 0.5;
            const x = -1 * (maxTextWidth / 2)
            //alert(maxTextWidth)
            console.log('maxTextWidth: ' + maxTextWidth)
            rect.graphics.beginFill("rgb(255,255,255)").drawRect(x, 0, maxTextWidth, objLineArray.length * fontsize);
            this.rect = {
                x: x
            };
            return rect;
        },

        wrapText: function (stage, text, x, y, maxWidth, lineHeight, fontsize = 100) {
            let objLineArray = [];
            text = text.replace(/\s\s+/g, ' '); //hapus semua double spasi/tab menjadi 1 spasi
            var words = text.split(' ');
            var line = '';
            var objLine;
            var objTestLine;
            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';

                objTestLine = new Text(testLine, fontsize + "px Arial");
                var testWidth = objTestLine.getMeasuredWidth();
                // objTestLine.x=x;
                // objTestLine.y=y;
                if (testWidth > maxWidth && n > 0) {

                    objLine = new Text(line, fontsize + "px Arial", "rgba(255,255,255,1)");
                    objLine.x = x;
                    objLine.y = y;
                    objLine.textBaseline = "top";
                    objLine.textAlign = "center";
                    objLineArray.push(objLine)
                    //stage.addChild(objLine);
                    //context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            objLine = new Text(line, fontsize + "px Arial", "rgba(255,255,255,1)");
            objLine.x = x;
            objLine.y = y;
            objLine.textBaseline = "top";
            objLine.textAlign = "center";
            objLineArray.push(objLine)
            //stage.addChild(objLine);
            //context.fillText(line, x, y);
            return objLineArray;
        },
        editCover() {
            this.$router.push('/editcoverdesign')
        },
        submitModule(is_publish) {
            this.$refs.myForm.validate().then(success => {
                if (success) {
                    this.$q.dialog({
                        title: 'Konfirmasi',
                        message: is_publish ? 'Modul akan disimpan dan dipublikasikan ke semua orang' : 'Modul akan disimpan sebagai draft',
                        cancel: true,
                        persistent: true
                    }).onOk(() => {
                        // console.log('>>>> OK')
                        this.loading = true;
                        this.module.is_publish = is_publish

                        this.$store.dispatch("Module/store", this.module).then(res => {
                            this.$store.commit('Module/resetBuild');
                            this.$q.notify(is_publish ? 'Berhasil menerbitkan modul' : 'Berhasil menyimpan modul')
                            this.$store.dispatch("Module/getPublishedModules");
                            this.$router.push('/');
                        }).catch(err => {
                            console.log(err.response);
                            //return;
                            if (err.response.data.errors.selected_template) {
                                this.$q.notify('Sampul modul harus dipilih');
                            }
                        }).finally(() => {
                            this.loading = false;
                        });
                    }).onOk(() => {
                        // console.log('>>>> second OK catcher')
                    }).onCancel(() => {
                        // console.log('>>>> Cancel')
                    }).onDismiss(() => {
                        // console.log('I am triggered on both OK and Cancel')
                    })
                }
            })

        },
        addContent() {
            this.module.contents.push({
                name: 'Judul bab',
                value: 'Isi bab'
            })
        },

        confirmDelete(index, name) {
            this.$q.dialog({
                title: 'Confirm',
                message: `Hapus '${name}'?`,
                cancel: true,
                persistent: true
            }).onOk(() => {
                this.module.contents.splice(index, 1);
            }).onOk(() => {
                // console.log('>>>> second OK catcher')
            }).onCancel(() => {
                // console.log('>>>> Cancel')
            }).onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
            })
        },
        // edit() {
        //     component: EditModul
        // }
    }
}
</script>
