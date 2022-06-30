import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
    breakpoint:{
        scrollBarWidth: 10,
        thresholds: {
            xs: 600,
            sm: 960,
            md: 1280,
            lg: 1920,
        },
    },
    icons: {
        iconfont: 'mdiSvg' || 'mdi' || 'mdiSvg' || 'md',
        values: {}
    },
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: "#0371c7",
                gray: "#f2f2f2",
                secondary: "#9e9e9e",
                accent: "#6e6f71",
                error: "#f62323",
                red: "#da1333",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#fdd24f",
                white: "#ffffff",
                cyan: "#00FFFF",
                fdrrd: "rgba(12,15,35,0.7)",
            }
        }
    },

})
