<template>
  <q-editor
    :definitions="definitions"
    :toolbar="toolbars"
    ref="editor"
    :value="value"
    @input="
      (val) => {
        $emit('input', val);
      }
    "
  ></q-editor>
</template>
<script>
import Compressor from "compressorjs";
export default {
  props: ["value"],
  data() {
    return {
      definitions: {
        upload: {
          tip: "Upload to cloud",
          icon: "image",
          handler: this.uploadImage,
        },
      },
      toolbars: [
        ["left", "center", "right", "justify"],
        ["bold", "italic", "underline", "strike"],
        ["undo", "redo"],
        ["upload"],
      ],
    };
  },
  mounted() {
    // let a = this.$;
  },
  methods: {
    uploadImage: function () {
      // let post = this.post;
      // create an input file element to open file dialog
      let input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*"; // file extensions allowed
      let file;
      let vm = this;
      input.onchange = (e) => {
       
        file = e.target.files[0] ;
        console.log(file)
        console.log('size before compress: ',file.size)
        //compressorjs
        new Compressor(file, {
          quality: 0.6,
          convertSize:2000000,
          maxWidth: 1600,
          maxHeight: 1600,
          success(result) {
            console.log('size after compress: ',result.size)
            // lets load the file as dataUrl
            var reader = new FileReader();
            let dataUrl = "";
            reader.onloadend = function () {
              dataUrl = reader.result;

              // append result to the body of your post
              vm.$refs.editor.runCmd(
                "insertHTML",
                '<img src="' + dataUrl + '" style="max-width:100vw">'
              );
            };
            reader.readAsDataURL(result);
          },
          error(err) {
            console.log(err.message);
          },
        });
      };
      input.click();

      // console.log(this.$refs.editor[0].getContentEl());
    },
    test: function () {
      // console.log(this.$refs.editor);
    },
  },
};
</script>
