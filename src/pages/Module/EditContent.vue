<template>
  <div>
    <q-header>
      <q-toolbar style="background-color: #840000">
        <q-btn
          flat
          dense
          icon="arrow_back"
          style="font-size: 18px"
          @click="$router.push({ name: 'create' })"
        />
        <q-toolbar-title>
          <div class="text-body2 text-weight-light" style="font-size: 15px">
            Edit {{ contentName }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page class="q-pa-md">
      <!-- <q-editor v-model="editor" min-height="5rem" /> -->
      <editor-component ref="editor" v-model="editor"></editor-component>



      <q-card flat bordered class="q-my-sm">
        <q-card-section>
          <div class="row q-pt-md">
            <div class="col-4">
              <q-select
                options-dense
                @input="inputSurah"
                dense
                outlined
                :option-label="(surah) => surah.key + '. ' + surah.name"
                option-value="id"
                :loading="loading"
                :disable="loading"
                v-model="surah"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="surahOptions"
                @filter="filterFn"
                hint="Pilih Surah"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"> No results </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-8 q-pl-xs">
              <q-select
                :loading="loading2"
                :disable="loading2"
                dense
                outlined
                hint="Pilih Ayat"
                :option-label="
                  (item) =>
                    item.key +
                    ') ' +
                    (item.value.length > 70
                      ? '....' + item.value.substr(0, 70)
                      : item.value)
                "
                option-value="id"
                :options="ayahOptions"
                v-model="ayah"
              >
              </q-select>
            </div>
          </div>
          <div class="row q-pt-md justify-end">
            <q-btn
              style="color: white; background-color: #840000"
              @click="copyAyah"
              rounded
              >Salin Ayat yang dipilih</q-btn
            >
          </div>
        </q-card-section>
      </q-card>

      <!--sound record-->
      <q-card flat bordered>
        <q-card-section>
          <div class="row justify-end q-gutter-sm">
            <div class="" v-if="audio.file">
              <q-btn
                round
                @click="removeAudio"
                color="red"
                icon="close"
                class="q-my-xs"
              ></q-btn>
            </div>
            <div class="" v-if="audio.file">
              <q-btn
                v-if="!audio_player.isPlay"
                round
                @click="playAudio"
                color="blue"
                icon="play_arrow"
                class="q-my-xs"
              ></q-btn>
              <q-btn
                v-else
                round
                @click="stopAudio"
                color="blue"
                icon="stop"
                class="q-my-xs"
              ></q-btn>
            </div>
            <div class="self-center">
              <q-btn
                style="color: white; background-color: #840000"
                icon="mic"
                rounded
                @click="recordAudio(moduleContentIndex)"
              >
                <!-- <span class="text-caption" v-if="!audio.file">Tambah Suara</span>
                <span class="text-caption" v-else>Rekam Ulang</span> -->
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <!--end recprd-->
      <div class="row q-pt-sm justify-end">
        <div class="col-3">
          <q-btn @click="reset()" color="grey" label="Reset"></q-btn>
        </div>
        <div class="col-3">
          <q-btn
            @click="saveDraft()"
            rounded
            style="color: white; background-color: #840000"
            label="Simpan"
          ></q-btn>
        </div>
      </div>

    </q-page>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { debounce } from "quasar";
import { copyToClipboard } from "quasar";
import EditorComponent from "../../components/Editor/EditorComponent";

// import CreateMessage from "components/CreateModul/EditModul";
export default {
  props: {
    moduleContentIndex: null,
    contentName: null,
  },
  components: {
    EditorComponent,
  },
  data() {
    return {
      surah: null,
      ayah: null,
      surahOptions: [],
      ayahOptions: [],
      surahOptionsAll: [],
      oldContent: "",
      editor: "",
      audio: {
        file: null,
        nativePath: null,
        blob: null,
      },
      audio_player: {
        isPlay: false,
        item: {
          currentTime: 0,
          duration: 0,
        },
      },
      options: [],
      loading: false,
      loading2: false,
      module: {
        is_publish: true,
        grade: null,
        subject: null,
        description: null,
        contents: [],
        selected_template: null,
      },
    };
  },
  computed: {
    ...mapState(["Auth", "Setting", "Grade", "Module"]),
    selectedTemplate: function () {
      if (this.Module.build.selected_template)
        return `${this.Setting.storageUrl}/${this.Module.build.selected_template.image}`;
      else return "cover-template.png";
    },
  },
  mounted() {
    if (!this.Grade.items.length) this.$store.dispatch("Grade/index");
  },
  created: function () {
    this.loading = true;
    this.$store
      .dispatch("Surah/index")
      .then((res) => {
        this.surahOptionsAll = res.data;
        this.surahOptions = [
          ...this.surahOptionsAll.map((surah) => {
            return { ...surah };
          }),
        ];
        // this.surah={...this.surahOptionsAll[0]}
      })
      .finally(() => {
        this.loading = false;
      });

    if (typeof this.moduleContentIndex == "undefined") {
      this.$router.back();
    } else
      this.oldContent = this.editor = this.Module.build.contents[
        this.moduleContentIndex
      ].value;

    //get audio from store
    this.getAudio();
    // this.module = {
    //     ...this.Module.build,
    //     //contents: [...this.Module.build.contents]
    //     contents: [...this.Module.build.contents.map(content => {
    //         return {
    //             ...content
    //         }
    //     })]
    // }
    // console.log(this.module)
    // if (this.module.contents.length == 0) this.module.contents.push({
    //     name: 'Judul bab',
    //     value: 'Isi bab'
    // })
  },
  watch: {
    editor: debounce(function (newVal, oldVal) {
      this.$store.commit("Module/setModuleContent", {
        value: newVal,
        index: this.moduleContentIndex,
      });
    }, 500),
    // audio: function (newVal, oldVal) {
    //   this.$store.commit("Module/setModuleContentAudio", {
    //     audio: { isPlay: newVal.isPlay, item: { ...newVal.item } },
    //     index: this.moduleContentIndex,
    //   });
    // },
  },
  methods: {
    getAudio() {
      const data = this.Module.build.contents[this.moduleContentIndex].audio;
      this.audio = { ...data, player: { ...data.player } };
    },
    copyAyah() {
      if (!this.ayah) return;
      if (this.$q.platform.is.mobile) {
        cordova.plugins.clipboard.copy(this.ayah.value);
      } else {
        copyToClipboard(this.ayah.value);
      }
      this.$q.notify("Ayat telah tersalin");
    },
    inputSurah() {
      //alert(1)
      this.ayahOptions = [];
      this.ayah = null;
      this.loading2 = true;
      this.$store
        .dispatch("Surah/show", { surahId: this.surah.id })
        .then((res) => {
          this.ayahOptions = res.data.ayahs;
        })
        .finally(() => {
          this.loading2 = false;
        });
    },
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.surahOptions = this.surahOptionsAll.filter(
          (v) => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    addContent() {
      this.module.contents.push({
        name: "Judul bab",
        value: "Isi bab",
      });
    },
    saveDraft() {
      this.$store.commit("Module/setModuleContent", {
        value: this.editor,
        index: this.moduleContentIndex,
      });
      this.$router.back();
    },
    reset() {
      this.editor = this.oldContent;
    },
    save() {
      this.$store.commit("Module/setModuleContent", {
        value: this.editor,
        index: this.moduleContentIndex,
      });
    },
    confirmDelete(index, name) {
      this.$q
        .dialog({
          title: "Confirm",
          message: `Hapus '${name}'?`,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.module.contents.splice(index, 1);
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    recordAudio(index) {
      let vm = this;
      console.log(index);
      //this.assigment.question_lists[index]
      navigator.device.audiorecorder.recordAudio(
        //membuka audio recoder
        function (data) {
          //data adalah hasil dri record
          console.log(data);
          const obj = JSON.parse(data);
          console.log(obj.full_path);

          //membaca file hasil record audio
          window.resolveLocalFileSystemURL(
            "file://" + obj.full_path,
            function (entry) {
              entry.file(
                function (file) {
                  //tambah object audio
                  const audio = {
                    file: file,
                    nativePath: obj.full_path,
                    blob: null,
                  };

                  //BEGIN olah data hasil record ke Blob
                  var reader = new FileReader();
                  reader.onloadend = function () {
                    console.log("Successful file write: " + this.result);

                    var blob = new Blob([new Uint8Array(this.result)], {
                      type: "audio/mp4",
                    });
                    audio.blob = blob;
                    vm.$store.commit("Module/setModuleContentAudio", {
                      audio: { ...audio },
                      index: vm.moduleContentIndex,
                    });

                    vm.audio.blob = blob;
                    vm.audio.file = audio.file;
                    vm.audio.nativePath = audio.nativePath;

                  };

                  reader.readAsArrayBuffer(file);
                  //END

                  // vm.$store.commit("Module/setModuleContentAudio", {
                  //   audio: { ...audio },
                  //   index: vm.moduleContentIndex,
                  // });
                  // vm.audio.file = audio.file;
                  // vm.audio.nativePath = audio.nativePath;

                  // vm.audio.item = new Audio(vm.question_list.audio.file.localURL);
                  // console.log('anjay',vm.audio.item.duration);

                  // vm.assigment.question_lists[index].audio = {
                  //   file: file,
                  //   nativePath: obj.full_path,
                  // };
                },

                function (error) {
                  console.log("error gan", error);
                }
              );
            },
            function (error) {
              console.log(error);
            }
          );
        },
        function () {
          console.log("anjay");
        }
      );
    },
    playAudio() {
      // this.audio = new Audio(this.question_list.audio.file.localURL);
      this.audio_player.item = new Audio(this.audio.file.localURL);
      this.audio_player.item.play();
      let vm = this;
      let a = setInterval(function () {
        if (vm.audio_player.item.currentTime >= vm.audio_player.item.duration) {
          vm.audio_player.isPlay = false;
          console.log("stop gan");
          clearInterval(a);
        }
      }, 500);
      this.audio_player.isPlay = true;
      console.log(this.audio_player);

      // this.$store.commit('MusicPlayer/play',{item:this.question_list.audio})
    },
    stopAudio() {
      this.audio_player.item.pause();
      this.audio_player.item.currentTime = 0;
      this.audio_player.isPlay = false;
    },
    removeAudio() {
      this.audio = {
        file: null,
        nativePath: null,
        blob: null,
      };
      this.$store.commit("Module/setModuleContentAudio", {
        audio: { ...this.audio },
        index: this.moduleContentIndex,
      });
    },
    // edit() {
    //     component: EditModul
    // }
  },
};
</script>
