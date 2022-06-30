import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
import axios from 'axios';
import moment from "moment";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })],
    state: {
        dashboardTab: null,
        mainNavTab: null
    },

    getters: {
        dashboardTab(state){
            return state.dashboardTab
        },
        mainNavTab(state){
            return state.mainNavTab
        }
    },

    mutations: {
        SET_DASHBOARD_TAB_IN_STATE(state, data){
            state.dashboardTab = data
        },
        SET_MAIN_NAV_TAB_IN_STATE(state, data){
            state.mainNavTab = data
        },
    },

    actions: {

    },

})
