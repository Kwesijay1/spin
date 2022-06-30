"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Layout_AppBar_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/validation */ "./resources/js/services/validation.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'CoreAppBar',
  props: {
    links: Array
  },
  data: function data() {
    return _objectSpread({
      tab: null,
      drawer: false,
      profileDialog: false,
      valid: false,
      registerForm: new Form({
        id: null,
        name: '',
        email: '',
        phone_number: '',
        position_id: null,
        constituency_id: null
      }),
      constituencies: [],
      positions: []
    }, _services_validation__WEBPACK_IMPORTED_MODULE_0__["default"]);
  },
  inject: ['logoutRoute', 'authUser', 'webRegisterRoute'],
  computed: {
    mainNavTab: {
      get: function get() {
        return this.$store.getters.mainNavTab;
      },
      set: function set(val) {
        this.$store.commit('SET_MAIN_NAV_TAB_IN_STATE', val);
      }
    },
    csrf_token: function csrf_token() {
      return this.$root.csrf;
    },
    isLoggedIn: function isLoggedIn() {
      return this.authUser !== null;
    },
    user: function user() {
      return this.authUser;
    },
    baseLink: function baseLink() {
      return this.$root.baseUrl;
    }
  },
  methods: {
    logout: function logout() {
      this.$refs.logoutForm.$el.click();
    },
    editProfile: function editProfile() {
      this.registerForm.fill(this.authUser);
      this.profileDialog = true;
    },
    cancelJoinUs: function cancelJoinUs() {
      this.profileDialog = false;
    },
    joinUs: function joinUs() {
      if (!this.$refs.registerForm.validate()) return;
      this.$refs.submitBtn.$el.click();
    },
    setActiveLink: function setActiveLink() {
      var _this = this;

      var currentPath = 0;
      this.links.map(function (link, index) {
        if (link.link === _this.$root.currentRoute) {
          currentPath = index;
        }
      });

      if (this.mainNavTab === 0) {
        this.$store.commit('SET_MAIN_NAV_TAB_IN_STATE', currentPath);
      }
    },
    toggleDrawer: function toggleDrawer() {
      this.drawer = !this.drawer; //Fire.$emit('toggle-drawer')
    },
    onClick: function onClick(e, item) {
      e.stopPropagation();
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href.endsWith('!') ? 0 : item.href);
    },
    getPositions: function getPositions() {
      var _this2 = this;

      axios.get('/get-all-positions').then(function (response) {
        _this2.positions = response.data;
      })["catch"]();
    },
    getConstituencies: function getConstituencies() {
      var _this3 = this;

      axios.get('/get-all-constituencies').then(function (response) {
        _this3.constituencies = response.data;
      })["catch"]();
    }
  },
  mounted: function mounted() {
    this.setActiveLink();
  },
  created: function created() {
    this.getPositions();
    this.getConstituencies();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n#NavBanner{\n    position: fixed !important\n}\n.list-item-bg:hover{\n    background-color: rgba(108, 163, 245, 0.99);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppBar.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=style&index=0&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/components/Layout/AppBar.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/Layout/AppBar.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AppBar_vue_vue_type_template_id_533ff0fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppBar.vue?vue&type=template&id=533ff0fc& */ "./resources/js/components/Layout/AppBar.vue?vue&type=template&id=533ff0fc&");
/* harmony import */ var _AppBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppBar.vue?vue&type=script&lang=js& */ "./resources/js/components/Layout/AppBar.vue?vue&type=script&lang=js&");
/* harmony import */ var _AppBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppBar.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/Layout/AppBar.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AppBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AppBar_vue_vue_type_template_id_533ff0fc___WEBPACK_IMPORTED_MODULE_0__.render,
  _AppBar_vue_vue_type_template_id_533ff0fc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Layout/AppBar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Layout/AppBar.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Layout/AppBar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppBar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Layout/AppBar.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/Layout/AppBar.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppBar.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=style&index=0&lang=css&");


/***/ }),

/***/ "./resources/js/components/Layout/AppBar.vue?vue&type=template&id=533ff0fc&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/Layout/AppBar.vue?vue&type=template&id=533ff0fc& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBar_vue_vue_type_template_id_533ff0fc___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBar_vue_vue_type_template_id_533ff0fc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AppBar_vue_vue_type_template_id_533ff0fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AppBar.vue?vue&type=template&id=533ff0fc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=template&id=533ff0fc&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=template&id=533ff0fc&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Layout/AppBar.vue?vue&type=template&id=533ff0fc& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-app-bar",
        {
          staticClass: "sticky-top",
          attrs: { app: "", flat: "", id: "NavBanner" },
        },
        [
          _c("v-app-bar-nav-icon", {
            staticClass: "hidden-md-and-up",
            on: { click: _vm.toggleDrawer },
          }),
          _vm._v(" "),
          _c("v-spacer", { staticClass: "hidden-md-and-up" }),
          _vm._v(" "),
          _c("v-img", {
            attrs: {
              src: _vm.baseLink + "assets/static_images/logo.png",
              alt: "logo",
              contain: "",
              height: "48",
              width: "180",
            },
            on: {
              click: function ($event) {
                return _vm.$vuetify.goTo(0)
              },
            },
          }),
          _vm._v(" "),
          _c("v-spacer", { staticClass: "hidden-sm-and-down" }),
          _vm._v(" "),
          _c(
            "v-tabs",
            {
              staticClass: "d-none d-sm-flex sticky-top justify-content-center",
              attrs: { "align-with-title": "", centered: "" },
              model: {
                value: _vm.mainNavTab,
                callback: function ($$v) {
                  _vm.mainNavTab = $$v
                },
                expression: "mainNavTab",
              },
            },
            [
              _c("v-tabs-slider", { attrs: { color: "primary" } }),
              _vm._v(" "),
              _vm._l(_vm.links, function (item, index) {
                return _c(
                  "v-tab",
                  { key: index + "-navs-tabs", attrs: { color: "primary" } },
                  [
                    _c(
                      "a",
                      {
                        staticClass: "text-decoration-none",
                        attrs: { href: item.link },
                      },
                      [_vm._v(_vm._s(item.name))]
                    ),
                  ]
                )
              }),
            ],
            2
          ),
          _vm._v(" "),
          _c("v-spacer", {}),
          _vm._v(" "),
          _vm.isLoggedIn
            ? _c(
                "v-menu",
                {
                  attrs: {
                    "offset-y": "",
                    "open-on-hover": "",
                    transition: "slide-y-transition",
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "activator",
                        fn: function (ref) {
                          var on = ref.on
                          var attrs = ref.attrs
                          return [
                            _c(
                              "v-avatar",
                              _vm._g(
                                _vm._b(
                                  { attrs: { color: "primary" } },
                                  "v-avatar",
                                  attrs,
                                  false
                                ),
                                on
                              ),
                              [
                                _c(
                                  "span",
                                  { staticClass: "white--text text-h5" },
                                  [_vm._v(_vm._s(_vm.user.initials))]
                                ),
                              ]
                            ),
                          ]
                        },
                      },
                    ],
                    null,
                    false,
                    3643055421
                  ),
                },
                [
                  _vm._v(" "),
                  _c(
                    "v-list",
                    [
                      _c(
                        "v-list-item",
                        {
                          staticClass: "list-item-bg py-0",
                          on: { click: _vm.editProfile },
                        },
                        [
                          _c(
                            "v-list-item-icon",
                            { staticStyle: { "font-size": "12px !important" } },
                            [
                              _c("v-icon", { attrs: { color: "primary" } }, [
                                _vm._v("mdi-account"),
                              ]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item-title",
                            { staticStyle: { "font-size": "12px !important" } },
                            [
                              _vm._v(
                                "\n                        Profile\n                    "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item",
                        {
                          staticClass: "list-item-bg py-0",
                          attrs: {
                            href: "https://privateemail.com/",
                            target: "_blank",
                          },
                        },
                        [
                          _c(
                            "v-list-item-icon",
                            { staticStyle: { "font-size": "12px !important" } },
                            [
                              _c("v-icon", { attrs: { color: "primary" } }, [
                                _vm._v("mdi-email"),
                              ]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item-title",
                            { staticStyle: { "font-size": "12px !important" } },
                            [
                              _vm._v(
                                "\n                        Mail Box\n                    "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item",
                        {
                          staticClass: "list-item-bg",
                          on: { click: _vm.logout },
                        },
                        [
                          _c(
                            "v-list-item-icon",
                            [
                              _c("v-icon", { attrs: { color: "error" } }, [
                                _vm._v("mdi-power"),
                              ]),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-list-item-title", [
                            _vm._v(
                              "\n                        Logout\n                    "
                            ),
                          ]),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "v-form",
            { attrs: { hidden: "", action: this.logoutRoute, method: "post" } },
            [
              _c("input", {
                attrs: { type: "hidden", name: "_token" },
                domProps: { value: _vm.csrf_token },
              }),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  ref: "logoutForm",
                  staticClass: "d-flex d-block",
                  attrs: { type: "submit", icon: "" },
                },
                [_c("v-icon", [_vm._v("mdi-power")])],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-navigation-drawer",
        {
          attrs: { app: "", temporary: "" },
          model: {
            value: _vm.drawer,
            callback: function ($$v) {
              _vm.drawer = $$v
            },
            expression: "drawer",
          },
        },
        [
          _c(
            "v-list",
            { attrs: { nav: "", dense: "" } },
            [
              _c(
                "v-list-item-group",
                _vm._l(_vm.links, function (item, index) {
                  return _c(
                    "v-list-item",
                    { key: index + "-nav" },
                    [
                      _c(
                        "v-list-item-title",
                        {
                          attrs: { color: "primary" },
                          on: {
                            click: function ($event) {
                              return _vm.mainNavTab.set(index)
                            },
                          },
                        },
                        [
                          _c(
                            "a",
                            {
                              staticClass: "text-decoration-none",
                              attrs: { href: item.link },
                            },
                            [_vm._v(_vm._s(item.name))]
                          ),
                        ]
                      ),
                    ],
                    1
                  )
                }),
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "600px", persistent: "" },
          model: {
            value: _vm.profileDialog,
            callback: function ($$v) {
              _vm.profileDialog = $$v
            },
            expression: "profileDialog",
          },
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-form",
                {
                  ref: "registerForm",
                  attrs: { method: "POST", action: this.webRegisterRoute },
                  model: {
                    value: _vm.valid,
                    callback: function ($$v) {
                      _vm.valid = $$v
                    },
                    expression: "valid",
                  },
                },
                [
                  _c("input", {
                    attrs: { type: "hidden", name: "_token" },
                    domProps: { value: _vm.csrf_token },
                  }),
                  _vm._v(" "),
                  _c("input", {
                    attrs: { type: "hidden", name: "id" },
                    domProps: { value: _vm.registerForm.id },
                  }),
                  _vm._v(" "),
                  _c(
                    "v-card-title",
                    {
                      staticClass:
                        "mb-2 d-flex justify-content-center text-center text-primary",
                    },
                    [
                      _c(
                        "v-avatar",
                        { attrs: { size: "80", color: "primary" } },
                        [
                          _c(
                            "v-icon",
                            {
                              staticClass: "text-white",
                              attrs: { color: "white", size: "75" },
                            },
                            [_vm._v("mdi-account")]
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-divider"),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    { staticClass: "pa-0 m-0" },
                    [
                      _c(
                        "v-col",
                        { attrs: { cols: "12", md: "12" } },
                        [
                          _c("v-text-field", {
                            staticClass: "fields",
                            attrs: {
                              color: "white darken-4",
                              filled: "",
                              rounded: "",
                              dense: "",
                              flat: "",
                              name: "name",
                              rules: [_vm.required("Full Name")],
                              label: "Full Name",
                              required: "",
                            },
                            model: {
                              value: _vm.registerForm.name,
                              callback: function ($$v) {
                                _vm.$set(_vm.registerForm, "name", $$v)
                              },
                              expression: "registerForm.name",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12", md: "6" } },
                        [
                          _c("v-text-field", {
                            staticClass: "fields",
                            attrs: {
                              color: "white darken-4",
                              filled: "",
                              rounded: "",
                              dense: "",
                              flat: "",
                              name: "email",
                              readonly: "",
                              rules: [_vm.required("E-mail")],
                              label: "E-mail",
                              required: "",
                            },
                            model: {
                              value: _vm.registerForm.email,
                              callback: function ($$v) {
                                _vm.$set(_vm.registerForm, "email", $$v)
                              },
                              expression: "registerForm.email",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12", md: "6" } },
                        [
                          _c("v-text-field", {
                            staticClass: "fields",
                            attrs: {
                              color: "white darken-4",
                              filled: "",
                              rounded: "",
                              dense: "",
                              flat: "",
                              name: "phone_number",
                              rules: [_vm.required("Phone Number")],
                              label: "Phone Number",
                              required: "",
                            },
                            model: {
                              value: _vm.registerForm.phone_number,
                              callback: function ($$v) {
                                _vm.$set(_vm.registerForm, "phone_number", $$v)
                              },
                              expression: "registerForm.phone_number",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12", md: "6" } },
                        [
                          _c("v-autocomplete", {
                            staticClass: "fields",
                            attrs: {
                              label: "Position",
                              name: "position_id",
                              items: _vm.positions,
                              "item-value": "id",
                              "item-text": "name",
                              filled: "",
                              rounded: "",
                              dense: "",
                              flat: "",
                              rules: [_vm.selectionRequired("Position")],
                            },
                            model: {
                              value: _vm.registerForm.position_id,
                              callback: function ($$v) {
                                _vm.$set(_vm.registerForm, "position_id", $$v)
                              },
                              expression: "registerForm.position_id",
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.registerForm.position_id,
                                  expression: "registerForm.position_id",
                                },
                              ],
                              attrs: {
                                hidden: "",
                                name: "position_id",
                                id: "position_id",
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.registerForm,
                                    "position_id",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            _vm._l(_vm.positions, function (position, i) {
                              return _c("option", {
                                key: i + "-const",
                                domProps: { value: position.id },
                              })
                            }),
                            0
                          ),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        { attrs: { cols: "12", md: "6" } },
                        [
                          _c("v-autocomplete", {
                            staticClass: "fields",
                            attrs: {
                              label: "Constituency",
                              name: "constituency_id",
                              items: _vm.constituencies,
                              "item-value": "id",
                              "item-text": "name",
                              filled: "",
                              rounded: "",
                              dense: "",
                              flat: "",
                              rules: [_vm.selectionRequired("Constituency")],
                            },
                            model: {
                              value: _vm.registerForm.constituency_id,
                              callback: function ($$v) {
                                _vm.$set(
                                  _vm.registerForm,
                                  "constituency_id",
                                  $$v
                                )
                              },
                              expression: "registerForm.constituency_id",
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.registerForm.constituency_id,
                                  expression: "registerForm.constituency_id",
                                },
                              ],
                              attrs: {
                                hidden: "",
                                name: "constituency_id",
                                id: "constituency_id",
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.registerForm,
                                    "constituency_id",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            _vm._l(
                              _vm.constituencies,
                              function (constituency, i) {
                                return _c("option", {
                                  key: i + "-const",
                                  domProps: { value: constituency.id },
                                })
                              }
                            ),
                            0
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    {
                      staticClass: "text-right my-0 pt-5 pb-4",
                      attrs: { cols: "12" },
                    },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "mr-2",
                          attrs: {
                            depressed: "",
                            color: "error",
                            "aria-label": "Cancel",
                            text: "",
                          },
                          on: { click: _vm.cancelJoinUs },
                        },
                        [
                          _vm._v(
                            "\n                        Cancel\n                    "
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "createBtn",
                          attrs: {
                            color: "info",
                            depressed: "",
                            "aria-label": "Submit",
                          },
                          on: { click: _vm.joinUs },
                        },
                        [
                          _vm._v(
                            "\n                        Update\n                    "
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c("v-btn", {
                        ref: "submitBtn",
                        attrs: { hidden: "", type: "submit" },
                      }),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);