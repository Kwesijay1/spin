/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import vuetify from "./plugins/vuetify";
require('./bootstrap');

import '../sass/_variables.scss';

window.Vue = require('vue').default;

import { Form, HasError, AlertError, AlertErrors, AlertSuccess } from "vform";

window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
Vue.component(AlertErrors.name, AlertErrors);
Vue.component(AlertSuccess.name, AlertSuccess);
window.Fire = new Vue();

import moment from "moment";

import 'vue-spinners/dist/vue-spinners.css'
import { CircleSpinner } from 'vue-spinners/dist/vue-spinners.common'

Vue.component('circle-spin', CircleSpinner)




import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
import { MotionPlugin } from '@vueuse/motion'
Vue.use(MotionPlugin)

import AOS from 'aos'
import 'aos/dist/aos.css'

Vue.filter('myDateTime', function (text) {
    return moment(text).format('Do MMM YYYY, hh:mm a')
})
Vue.filter('myDate', function (text) {
    return moment(text).format('Do MMM YYYY')
})
Vue.filter('myTime', function (text) {
    return moment(text).format('hh:mm a')
})
Vue.filter('shortenText', function (text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...'
    } else return text
})






/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('discount-component', require('./components/DiscountComponent.vue').default);
Vue.component('dash-component', require('./components/DashboardComponent.vue').default);
Vue.component('logout-component', require('./components/Admin/LogoutComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


import store from "./store";

const app = new Vue({
    el: '#app',
    vuetify,
    store,
    data: () => ({
        /*csrf: document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),

        baseLink: document
            .querySelector('meta[name="base-link"]')
            .getAttribute("content"),

        baseUrl: document
            .querySelector('meta[name="base-url"]')
            .getAttribute("content"),

        currentRoute: document
            .querySelector('meta[name="current-route"]')
            .getAttribute("content"),

        donationRoute: document
            .querySelector('meta[name="donation-route"]')
            .getAttribute("content")*/


    }),
    mounted() {
        AOS.init({
            // Global settings:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 400, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
        })
    },
});
