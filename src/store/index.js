import Vue from 'vue'
import Vuex from 'vuex'
// import the auto exporter
import modules from './modules'
import createLogger from 'vuex/dist/logger'
import VuexPersistence from 'vuex-persist'
// import Cookies from 'js-cookie'
// import { LocalStorage } from 'quasar'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const debug = process.env.DEV

const vuexLocal = new VuexPersistence({
    strictMode: true, // This **MUST** be set to true
    storage: localStorage, // wich storage u want to use
    reducer: (state) => ({ Auth: state.Auth }), // save given modules to storage
})

export default function( /* { ssrContext } */ ) {
    const Store = new Vuex.Store({
        modules, // give auto import modules
        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: debug,
        state: {},
        mutations: {
            RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
        },
        plugins: debug ? [createLogger(), vuexLocal.plugin, ] : [vuexLocal.plugin, ] // set logger only for development
    })

    return Store
}

// export default new Vuex.Store({
//     modules, // give auto import modules
//     // enable strict mode (adds overhead!)
//     // for dev mode only
//     strict: debug,
//     state: {},
//     mutations: {
//         RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
//     },
//     plugins: debug ? [createLogger(), vuexLocal.plugin, ] : [vuexLocal.plugin, ] // set logger only for development
// })