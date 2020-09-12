<template>
<q-layout>
    <q-page-container>
        <q-img no-default-spinner src="~assets/background-login.png"></q-img>
        <div class="q-pa-md">
            <q-form @submit="onSubmit" ref="form" class="q-gutter-md">
                <q-input v-model="credential.username" color="red-10" label="Email" lazy-rules :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"></q-input>
                <q-input v-model="credential.password" type="password" color="red-10" label="Password" lazy-rules :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"></q-input>
            </q-form>
        </div>
        <div class="q-pa-md text-center">
            <q-btn @click="onSubmit()" :loading="loading" :disable="loading" color="red-10">
                Masuk
            </q-btn>
        </div>
    </q-page-container>
</q-layout>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    data() {
        return {
            credential: {},
            loading: false
        };
    },
    computed: {
        ...mapState(["Auth"])
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate().then(success => {
                if (success) {
                    this.loading = true;
                    this.$store
                        .dispatch("Auth/login", this.credential)
                        .then(res => {
                            this.$router.push("/");
                            window.history.pushState(null, null, window.location.href);
                        })
                        .catch(err => {
                            this.$q.notify("Email atau password Anda salah")
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            });
        }
    }
};
</script>
