import Vue from 'vue'

require('moment/locale/id')

const moment = require('moment')

Vue.use(require('vue-moment'), {
    moment
})