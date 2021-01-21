<template>
  <div
    style="
      background-image: url('statics/images/payment.jpg');
      background-size: cover;
      height: 100vh;
    "
  >
    <div class="q-pa-sm">
      <q-card class="fixed-center" style="width: 90vw">
        <q-card-section>
          <div class="text-h6 text-center">Cara Melakukan Pembayaran</div>
        </q-card-section>
        <q-card-section>
          <div>
            1. Buka aplikasi<a href="#" @click.prevent="openKta"> KTA AGPAII DIGITAL</a
            ><br />
            2. Jika belum Login, Login terlebih dahulu.<br />
            <!--jika sudah bayar, tpi expired-->
            <span
              v-if="
                Auth.auth.user_activated_at &&
                moment(new Date()).diff(
                  new Date(Auth.auth.user_activated_at),
                  'months',
                  true
                ) > 6
              "
            >
              3. Masuk ke halaman profile.<br />
              4. Tekan menu di pojok kanan atas, dan pilih
              <strong>Riwayat Pembayaran</strong>. Anda akan melihat peringatan bahwa masa
              penggunaan RPP DIGITAL, PENILAIAN DIGITAL, dan MODUL DIGITAL sudah habis.<br />
              5. Tekan <strong>BAYAR</strong>. Anda akan diminta mentransfer uang
              perpanjangan sebesar <strong>Rp. 65.000</strong><br />
              6. Jika sudah ditransfer, kembali ke halaman
              <a href="#" @click.prevent="openKta"> Riwayat Pembayaran</a> kemudian tekan
              tombol <strong>KONFIRMASI</strong>
            </span>
            <!--jika belum bayar, Maka-->
            <span v-else>
              3. Masuk ke halaman profile. Anda akan diarahkan ke halaman untuk melakukan
              pembayaran. Tekan tombol <strong>LAKUKAN PEMBAYARAN</strong><br />
              4. Anda akan diminta mentransfer uang pendaftaran sebesar
              <strong>Rp. 35.000</strong><br />
              5. Jika sudah ditransfer, kembali ke halaman<a
                href="#"
                @click.prevent="openKta"
              >
                KTA AGPAII DIGITAL</a
              >
              tadi kemudian tekan tombol <strong>KONFIRMASI</strong>
            </span>
          </div>
        </q-card-section>
        <q-card-actions class="row justify-end">
          <q-btn color="blue" flat label="Keluar" @click="logout" />
          <q-btn color="blue" flat label="Konfirmasi" @click="check" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState(["Auth"]),
  },
  mounted() {
    let vm=this;
    setTimeout(function check() {
      vm.$store.dispatch("Auth/getPaymentStatus").then((res) => {
        //alert('test')

        if (res.data.user_activated_at == null || vm.isExpired(res.data.user_activated_at)) {
          //jika user_activated_at NULL ( pembayaran tidak ada) atau user_activated_at'nya expired, jadi harus panggil lagi fungsi untuk mengecek pembyarannya
          console.log("check again");
          setTimeout(check, 10000);
        } else if (res.data) {
          vm.$store.dispatch("Auth/getAuth").then((res) => {
            vm.$q.notify("Pembayaran anda sudah kami terima");
            vm.$router.push("/");
          });
        }
      });
    }, 10000);
  },
  methods: {
    moment,
    isExpired(datetime) {
      if(datetime){
          const diff = this.moment(new Date()).diff(new Date(datetime), "months", true);
          console.log(diff)
          return diff > 6;
      }else return false;
    },
    check() {
      this.$store.dispatch("Auth/getPaymentStatus").then((res) => {
        //alert('test')

        if (res.data.user_activated_at == null) {
          this.$q.notify("Terimakasih silahkan tunggu 1x24 jam");
        } else {
          this.$store.dispatch("Auth/getAuth").then((res) => {
            this.$q.notify("Pembayaran anda sudah kami terima");
            this.$router.push("/");
          });
        }
      });
    },
    logout() {
      this.$store.dispatch("Auth/logout").then(() => {
        this.$router.push("/login");
      });
    },
    openKta() {
      if (this.$q.platform.is.mobile) {
        var successCallback = (data) => {
          window.plugins.launcher.launch({ packageName: "org.agpaiidigital.kta2" });
        };
        var errorCallback = (errMsg) => {
          cordova.InAppBrowser.open(
            `https://play.google.com/store/apps/details?id=org.agpaiidigital.kta2`,
            "_system",
            "location=no"
          );
        };
        window.plugins.launcher.canLaunch(
          { packageName: "org.agpaiidigital.kta2" },
          successCallback,
          errorCallback
        );
      } else {
        window.open("http://kta.agpaiidigital.org/", "_blank") ||
          window.location.replace("http://kta.agpaiidigital.org/");
      }
    },
  },
};
</script>
