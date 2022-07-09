<template>
<div>
    <v-data-table
        :headers="headers"
        :items="discountList"
        :items-per-page="10"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>Discount</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    @click="addNewDiscount"
                >
                    New Discount
                </v-btn>

            </v-toolbar>
        </template>
        <template v-slot:item.id="{ item, index }">
            {{++index}}
        </template>
        <template v-slot:item.color="{ item }">
            <span class="pa-3" :style="{backgroundColor: item.bg_color, color: item.color}">{{item.name}}</span>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
                color="primary"
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                color="error"
                small
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <div class="py-3 my-3">
                <h5 class="d-flex justify-content-center text-center">No Data Available</h5>
                <v-btn
                    color="primary"
                    @click="getDiscountList"
                >
                    Reset
                </v-btn>
            </div>
        </template>
    </v-data-table>
    <v-dialog
        v-model="discountDialog"
        max-width="400"
        persistent
    >
        <v-card>
            <v-card-title class="mb-2 d-flex justify-content-center text-center text-primary">
                {{editMode ? 'Update' : 'Add'}} Discount
            </v-card-title>
            <v-divider></v-divider>
            <v-form @submit.prevent="editMode ? updateDiscount() : saveDiscount()" ref="discountForm" v-model="valid">

                <v-card-text>
                    <v-row class="pa-0 m-0">
                        <v-col cols="12" md="12">
                            <v-text-field
                                label="Discount Rate"
                                name="rate"
                                v-model="discountForm.rate"
                                class="fields"
                                filled rounded
                                dense flat
                                :rules="[required('Discount Rate')]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="pa-0 m-0">
                        <v-col cols="6" md="6">
                            <label>Text Color</label>
                            <v-dialog
                                ref="colorMenu"
                                v-model="colorMenu"
                                width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-avatar size="30" color="black">
                                    <v-icon
                                        v-bind="attrs"
                                        v-on="on"
                                        :color="discountForm.color.hex">mdi-brightness-1</v-icon>
                                    </v-avatar>
                                </template>
                                <v-color-picker
                                    dot-size="25"
                                    mode="hex"
                                    swatches-max-height="200"
                                    v-model="discountForm.color"
                                >
                                </v-color-picker>
                                <div class="justify-content-center d-flex bg-white pa-2">
                                    <v-btn color="primary" class="btn" @click="colorMenu = false">Ok</v-btn>
                                </div>
                            </v-dialog>
                        </v-col>
                        <v-col cols="6" md="6">
                            <label>Background Color</label>
                            <v-dialog
                                ref="bgColorMenu"
                                v-model="bgColorMenu"
                                width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-avatar size="30" color="black">
                                        <v-icon
                                            v-bind="attrs"
                                            v-on="on"
                                            :color="discountForm.bg_color.hex">mdi-brightness-1</v-icon>
                                    </v-avatar>
                                </template>
                                <v-color-picker
                                    dot-size="25"
                                    mode="hex"
                                    swatches-max-height="200"
                                    v-model="discountForm.bg_color"
                                >
                                </v-color-picker>
                                <div class="justify-content-center d-flex bg-white pa-2">
                                    <v-btn color="primary" class="btn" @click="bgColorMenu = false">Ok</v-btn>
                                </div>
                            </v-dialog>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="d-flex justify-content-end text-right">
                    <v-btn
                        depressed
                        color="error"
                        class="mr-2"
                        @click="cancelDiscount"
                        aria-label="Cancel"
                        text
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        class="createBtn"
                        color="info"
                        depressed
                        aria-label="Submit"
                        type="submit"
                    >
                        {{editMode ? 'Update' : 'Save'}}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog
        v-model="spinnerDialog"
        width="200px"
        height="300px"
        persistent
    >
        <v-card width="100%" class="justify-content-center d-flex overflow-hidden align-items-center" height="120px">
            <circle-spin
                color="#0371c7"
            ></circle-spin>
        </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="500px">
        <v-card>
            <v-card-title class="text-h6 d-flex justify-content-center text-center">Are you sure you want to delete this Discount of {{selectedDiscount.rate_name}}?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="cancelDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteDiscount">Yes</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
        v-model="alertDialog"
        persistent
        max-width="500px"
    >
        <div class="d-flex justify-content-center align-items-center">
            <v-alert
                mode="in-out"
                prominent
                :type="alertType"
                :value="alertDialog"
                width="500"
                class="align-items-center"
            >
                <v-row align="center">
                    <v-col class="grow">
                        {{alertMessage}}
                    </v-col>
                    <v-col class="shrink">
                        <v-btn @click="closeAlert">Close</v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </div>
    </v-dialog>
</div>
</template>

<script>
import validation from "../../services/validation";
export default {
    name: "DiscountListComponent",
    data(){
        return{
            discountList: [],
            colorMenu: false,
            bgColorMenu: false,
            discountForm: new Form({
                id: null,
                rate: null,
                color: {},
                bg_color: {}
            }),
            headers: [
                {text: 'ID', value: 'id', sortable: true},
                {text: 'Rate', value: 'name', sortable: true},
                {text: 'Text/Background Color', value: 'color', sortable: true},
                {text: 'Action', value: 'actions'},
            ],
            ...validation,
            editMode: false,
            spinnerDialog: false,
            valid: false,
            discountDialog: false,
            deleteDialog: false,
            alertDialog: false,
            alertMessage: '',
            alertType: '',
            selectedDiscount: {}
        }
    },
    methods: {
        getDiscountList(){
            axios.get('/discount-list')
                .then((response) => {
                    this.discountList = response.data
                })
                .catch((error) => {
                })
        },
        editItem(item){
            this.discountForm.reset()
            let data = {
                id: item.id,
                rate: item.rate.toString(),
                color: {hex: item.color},
                bg_color: {hex: item.bg_color}
            }
            this.discountForm.fill(data)
            this.editMode = true
            this.discountDialog = true
        },
        closeAlert(){
            this.alertDialog = false
        },
        deleteItem(item){
            this.selectedDiscount = item
            this.deleteDialog = true
        },
        addNewDiscount(){
            this.discountDialog = true
            this.discountForm.reset()
            setTimeout(() => {
                this.$refs.discountForm.reset()
            }, 100)
        },
        cancelDiscount(){
            this.discountForm.reset()
            this.$refs.discountForm.reset()
            setTimeout(() => {
                this.discountDialog = false
            }, 100)
        },
        saveDiscount(){
            if(!this.$refs.discountForm.validate()) return
            this.discountDialog = false
            this.spinnerDialog = true
            let data = {
                rate: this.discountForm.rate,
                color: this.discountForm.color.hex,
                bg_color: this.discountForm.bg_color.hex
            }
            axios.post('/discount-list', data)
                .then((response) => {
                    this.spinnerDialog = false
                    this.alertMessage = response.data.message
                    this.alertType = 'success'
                    this.alertDialog = true
                    this.discountForm.reset()
                    this.getDiscountList()
                })
                .catch((error) => {
                    this.spinnerDialog = false
                    this.alertMessage = error.response.data.message
                    this.alertType = 'error'
                    this.alertDialog = true
                    this.discountForm.reset()
                    this.getDiscountList()
                })
        },
        updateDiscount(){
            if(!this.$refs.discountForm.validate()) return
            this.discountDialog = false
            this.spinnerDialog = true
            let data = {
                rate: this.discountForm.rate,
                color: this.discountForm.color.hex,
                bg_color: this.discountForm.bg_color.hex
            }
            axios.put(`/discount-list/${this.discountForm.id}`, data)
                .then((response) => {
                    this.spinnerDialog = false
                    this.alertMessage = response.data.message
                    this.alertType = 'success'
                    this.alertDialog = true
                    this.getDiscountList()
                })
                .catch((error) => {
                    this.spinnerDialog = false
                    this.alertMessage = error.response.data.message
                    this.alertType = 'error'
                    this.alertDialog = true
                    this.getDiscountList()
                })
        },
        deleteDiscount(){
            this.deleteDialog = false
            this.spinnerDialog = true
            axios.delete(`/discount-list/${this.selectedDiscount.id}`)
                .then((response) => {
                    this.spinnerDialog = false
                    this.alertMessage = response.data.message
                    this.alertType = 'success'
                    this.alertDialog = true
                    this.getDiscountList()
                })
                .catch((error) => {
                    this.spinnerDialog = false
                    this.alertMessage = error.response.data.message
                    this.alertType = 'error'
                    this.alertDialog = true
                    this.getDiscountList()
                })
        },
        cancelDelete(){
            this.deleteDialog = false
            this.selectedDiscount = {}
        },
    },
    created() {
        this.getDiscountList()
    }
}
</script>

<style scoped>

</style>
