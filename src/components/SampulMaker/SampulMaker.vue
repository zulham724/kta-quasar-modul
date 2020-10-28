<template>
<div style="width:100%">
    <canvas id="myCanvas" style="width:100%"></canvas>
    <slot name="between"></slot>
    <div v-for="(item, n) in items" :key="n">
        <div v-if="selectedContainer && selectedContainer.index==n">
            <div v-for="(config, i) in configs" :key="i">
                <div>
                    <slot :name="config.name" :item="item">
                    </slot>
                </div>

            </div>

        </div>
    </div>
</div>
</template>

<script>
import {
    Stage,
    Shape,
    Bitmap,
    Container,
    Text,
    Touch
} from "@createjs/easeljs";
var stage, bitmap, isLoaded = false;
export default {
    props: {
        items: Array,
        img: String,
        isMounted: {
            type: Boolean,
            default: function () {
                return false
            }
        },
        configs: {
            type: Array,
            default: function () {
                return [{
                    name: 'color',
                    label: 'Warna teks'
                }, {
                    name: 'size',
                    label: 'Ukuran teks'
                }]
            }
        }
    },
    created() {
        this.image = this.img;
    },
    watch: {
        items: {
            handler: function (newVal, oldVal) {
                if (!bitmap.getTransformedBounds()) return;

                let previousContainerData = [];
                let removedChildIndex = [];
                for (let i = 1; i < stage.numChildren; i++) {
                    previousContainerData.push({
                        x: stage.getChildAt(i).x,
                        y: stage.getChildAt(i).y
                    });
                    removedChildIndex.push(i)
                    //previousContainerData.y=stage.getChildAt(i).y;
                }
                //console.log(previousContainerData);
                stage.removeAllEventListeners();
                stage.removeChildAt(...removedChildIndex)
                this.containers = [];
                newVal.forEach((item, item_index) => {
                    this.createText(stage, bitmap, item, item_index, previousContainerData[item_index])
                });
                // /stage.update();
            },
            deep: true
        }
    },
    data() {
        return {
            image: null,
            containers: [],
            selectedContainer: null,

        }
    },
    mounted() {
        //console.log(this.configs)
        if (!this.isMounted) return;
        stage = new Stage("myCanvas");
        Touch.enable(stage);
        //        createjs.Touch.enable(stage);
        //stage.mouseMoveOutside = true;
        var img = new Image;
        bitmap = new Bitmap(img);
        img.onload = () => {
            bitmap.setTransform(0, 0, 1, 1);
            //stage section
            stage.addChild(bitmap);
            stage.canvas.width = bitmap.getTransformedBounds().width;
            stage.canvas.height = bitmap.getTransformedBounds().height;

            //section buat text & rect
            this.items.forEach((item, item_index) => {
                if (item.text) item.text = item.text.toString();
                else item.text = '';
                this.createText(stage, bitmap, item, item_index)
            });
            isLoaded = img.complete && img.naturalHeight !== 0;
            //stage.update();

        }
        img.crossOrigin = "Anonymous"
        img.src = this.image;
    },
    methods: {
        initialize() {
            return new Promise((resolve, reject) => {
                stage = new Stage("myCanvas");
                Touch.enable(stage);
                var img = new Image;
                bitmap = new Bitmap(img);
                img.onload = () => {
                    bitmap.setTransform(0, 0, 1, 1);
                    //stage section
                    stage.addChild(bitmap);
                    stage.canvas.width = bitmap.getTransformedBounds().width;
                    stage.canvas.height = bitmap.getTransformedBounds().height;

                    //section buat text & rect
                    this.items.forEach((item, item_index) => {
                        if (item.text) item.text = item.text.toString();
                        else item.text = '';
                        this.createText(stage, bitmap, item, item_index)
                    });
                    isLoaded = img.complete && img.naturalHeight !== 0;
                    resolve(isLoaded)
                    //stage.update();
                }
                img.crossOrigin = "Anonymous"
                img.src = this.image;
            })
        },
        resetContainers() {
            let removedChildIndex = [];
            for (let i = 1; i < stage.numChildren; i++) {
                removedChildIndex.push(i)
            }
            stage.removeAllEventListeners();
            stage.removeChildAt(...removedChildIndex)
            this.containers = [];
        },
        //merefresh canvas jika data items berubah
        refreshCanvas() {
            this.resetContainers();
            this.items.forEach((item, item_index) => {
                this.createText(stage, bitmap, item, item_index)
            });
        },
        createText: function (stage, bitmap, objText, objTextIndex, containerData = {}) {
            let fontsize1 = bitmap.getTransformedBounds().width / (10 * (10 / objText.size));
            console.log('fontsize: ' + fontsize1)
            let x;
            if (!objText.x) {
                let x_center = bitmap.getTransformedBounds().width / 2;
                //jika ada atribut x_append, maka nilai x_center akan ditambah dengan x_append
                if (objText.x_append) x_center += objText.x_append;
                x = x_center;
            } else {
                x = objText.x
            }
            var container = new Container();
            container.x = containerData.x ? containerData.x : x;
            container.y = containerData.y ? containerData.y : objText.y;

            const maxTextWidth = bitmap.getTransformedBounds().width - 10;
            let objLineArray = this.wrapText(container, objText, 0, 0, maxTextWidth, fontsize1, fontsize1); //

            let alpha = 0.01;
            if (this.selectedContainer && this.selectedContainer.index == objTextIndex) alpha = 0.3
            container.addChild(this.rectText(objLineArray, fontsize1, alpha))

            for (let i = 0; i < objLineArray.length; i++) {
                container.addChild(objLineArray[i])
            }
            container.index = objTextIndex;
            this.containers.push(container)

            stage.addChild(container);
            container.on("pressmove", (evt) => {

                // currentTarget will be the container that the event listener was added to:
                evt.currentTarget.x = evt.stageX;
                evt.currentTarget.y = evt.stageY;
                // make sure to redraw the stage to show the change:
                stage.update();
            });
            container.on("mousedown", (evt) => {
                console.log(container.index)
                this.containers.forEach(item => {
                    item.getChildAt(0).alpha = 0.01;
                });
                container.getChildAt(0).alpha = 0.3;
                this.selectedContainer = container;
                stage.update();
                // this.selectedContainer = evt;
            });
            stage.update();
        },
        rectText: function (objLineArray, fontsize, alpha = 0.01) {
            let maxTextWidth = 0;
            let sumTextHeight = 0;
            for (let i = 0; i < objLineArray.length; i++) {
                const objLineWidth = objLineArray[i].getMeasuredWidth();
                if (objLineWidth > maxTextWidth) maxTextWidth = objLineWidth;
            }
            var rect = new Shape();
            rect.alpha = alpha;
            const x = -1 * (maxTextWidth / 2)
            //alert(maxTextWidth)
            console.log('maxTextWidth: ' + maxTextWidth)
            rect.graphics.beginFill("rgb(255,255,255)").drawRect(x, 0, maxTextWidth, objLineArray.length * fontsize);
            this.rect = {
                x: x
            };
            return rect;
        },
        wrapText: function (stage, objText, x, y, maxWidth, lineHeight, fontsize = 100) {
            let objLineArray = [];
            let text = objText.text.replace(/\s\s+/g, ' '); //hapus semua double spasi/tab menjadi 1 spasi
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

                    objLine = new Text(line, fontsize + "px Arial", objText.color);
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
            objLine = new Text(line, fontsize + "px Arial", objText.color);
            objLine.x = x;
            objLine.y = y;
            objLine.textBaseline = "top";
            objLine.textAlign = "center";
            objLineArray.push(objLine)
            //stage.addChild(objLine);
            //context.fillText(line, x, y);
            return objLineArray;
        },
        getContainers() {
            return this.containers;
        },
        getItems() {
            return this.items;
        },
        toDataURL() {
            return stage.toDataURL();
        },
        setImage(img) {
            this.image = img;
        },
        setItems(items) {
            this.items = items;
        }
    },
}
</script>
