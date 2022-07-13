<template>
<div>
    <v-data-table
        :headers="headers"
        :items="daysValue"
        :items-per-page="10"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>Days</v-toolbar-title>
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
                    New Record
                </v-btn>

            </v-toolbar>
        </template>
        <template v-slot:item.id="{ item, index }">
            {{++index}}
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
                    @click="getDaysValue"
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
                {{editMode ? 'Update' : 'Add'}} Day Record
            </v-card-title>
            <v-divider></v-divider>
            <v-form @submit.prevent="editMode ? updateDiscount() : saveDiscount()" ref="discountForm" v-model="valid">

                <v-card-text>
                    <v-row class="pa-0 m-0">
                        <v-col cols="12" md="12">
                            <v-text-field
                                label="Day Of The Week"
                                name="day"
                                v-model="discountForm.day"
                                @input="discountForm.day = discountForm.day.toLowerCase()"
                                class="fields"
                                filled rounded
                                dense flat
                                :rules="[required('Day Of The Week')]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="pa-0 m-0">
                        <v-col cols="12" md="12">
                            <v-text-field
                                label="Value"
                                name="value"
                                v-model="discountForm.value"
                                class="fields"
                                filled rounded
                                dense flat
                                :rules="[required('Value'), onlyNumbers(discountForm.value)]"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="pa-0 m-0">
                        <v-col cols="12" md="12">
                            <v-autocomplete
                                v-model="discountForm.matching_discount_id"
                                :items="discountList"
                                item-text="name"
                                item-value="id"
                                filled rounded
                                dense flat
                                :clearable="true"
                                class="fields"
                                id="matching_discount_id"
                                label="Select Matching Discount"
                                aria-required=""
                            >
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row class="pa-0 m-0">
                        <v-col cols="12" md="12">
                            <v-autocomplete
                                v-model="discountForm.opposite_discount_id"
                                :items="discountList"
                                item-text="name"
                                item-value="id"
                                filled rounded
                                dense flat
                                :clearable="true"
                                class="fields"
                                id="opposite_discount_id"
                                label="Select Opposite Discount"
                                aria-required=""
                            >
                            </v-autocomplete>
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
            <v-card-title class="text-h6 d-flex justify-content-center text-center">Are you sure you want to delete this Discount of {{selectedDiscount.day}}?</v-card-title>
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
    name: "DaysValueComponent",
    data(){
        return{
            daysValue: [],
            discountList: [],
            discountForm: new Form({
                id: null,
                matching_discount_id: null,
                opposite_discount_id: null,
                day: '',
                value: null,
            }),
            headers: [
                {text: 'ID', value: 'id', sortable: true},
                {text: 'Day Of The Week', value: 'day', sortable: true},
                {text: 'Value', value: 'value', sortable: true},
                {text: 'Matching Discount', value: 'matching_discount.name'},
                {text: 'Opposite Discount', value: 'opposite_discount.name'},
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
        getDaysValue(){
            axios.get('/days-value')
                .then((response) => {
                    this.daysValue = response.data
                })
                .catch((error) => {
                })
        },
        getDiscountList(){
            axios.get('/discount-list')
                .then((response) => {
                    this.discountList = response.data
                })
                .catch((error) => {
                })
        },
        editItem(item){
            let data = {
                id: item.id,
                matching_discount_id: item.matching_discount_id,
                opposite_discount_id: item.opposite_discount_id,
                day: item.day,
                value: item.value.toString()
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
            axios.post('/days-value', this.discountForm)
                .then((response) => {
                    this.spinnerDialog = false
                    this.alertMessage = response.data.message
                    this.alertType = 'success'
                    this.alertDialog = true
                    this.getDaysValue()
                })
                .catch((error) => {
                    this.spinnerDialog = false
                    this.alertMessage = error.response.data.message
                    this.alertType = 'error'
                    this.alertDialog = true
                    this.getDaysValue()
                })
        },
        updateDiscount(){
            if(!this.$refs.discountForm.validate()) return
            this.discountDialog = false
            this.spinnerDialog = true
            axios.put(`/days-value/${this.discountForm.id}`, this.discountForm)
                .then((response) => {
                    this.spinnerDialog = false
                    this.alertMessage = response.data.message
                    this.alertType = 'success'
                    this.alertDialog = true
                    this.getDaysValue()
                })
                .catch((error) => {
                    this.spinnerDialog = false
                    this.alertMessage = error.response.data.message
                    this.alertType = 'error'
                    this.alertDialog = true
                    this.getDaysValue()
                })
        },
        deleteDiscount(){
            this.deleteDialog = false
            this.spinnerDialog = true
            axios.delete(`/days-value/${this.selectedDiscount.id}`)
                .then((response) => {
                    this.spinnerDialog = false
                    this.alertMessage = response.data.message
                    this.alertType = 'success'
                    this.alertDialog = true
                    this.getDaysValue()
                })
                .catch((error) => {
                    this.spinnerDialog = false
                    this.alertMessage = error.response.data.message
                    this.alertType = 'error'
                    this.alertDialog = true
                    this.getDaysValue()
                })
        },
        cancelDelete(){
            this.deleteDialog = false
            this.selectedDiscount = {}
        },
    },
    created() {
        this.getDaysValue()
        this.getDiscountList()
    }
}
</script>

<style scoped>

</style>
