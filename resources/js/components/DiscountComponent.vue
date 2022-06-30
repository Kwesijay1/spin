<template>
<div>
    <v-btn @click="spinForDiscount" color="primary" class="btn-primary rounded-3">spin for discount</v-btn>
    <v-dialog
        v-model="spinForDiscountDialog"
        max-width="600px"
        persistent
    >
        <v-card>
            <v-form @submit.prevent="checkDiscount" ref="donationForm" v-model="valid">
                <v-card-title class="mb-2 d-flex justify-content-center text-center text-primary">
                    Spin For Discount
                </v-card-title>
                <v-divider></v-divider>

                <v-row class="pa-0 m-0">
                    <v-col cols="12" md="12">
                        <v-text-field
                            label="Full Name"
                            name="first_name"
                            v-model="spinForm.name"
                            class="fields"
                            filled rounded
                            dense flat
                            :rules="[required('First Name')]"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field
                            label="Email"
                            v-model="spinForm.email"
                            name="email"
                            class="fields"
                            filled rounded
                            dense flat
                            :rules="[required('Email'), validEmail()]"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-text-field
                            label="Phone Number"
                            v-model="spinForm.phone_number"
                            name="phone"
                            class="fields"
                            filled rounded
                            dense flat
                            :rules="[required('Phone Number')]"
                        ></v-text-field>
                    </v-col>
                </v-row>


                <!-- save and close buttons -->
                <v-col cols="12" class="text-right my-0 pt-5 pb-4">
                    <v-btn
                        depressed
                        color="error"
                        class="mr-2"
                        @click="cancelSpin"
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
                        Spin
                    </v-btn>
                </v-col>
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
    <v-dialog
        v-model="showAlert"
        persistent
    >
        <div class="d-flex justify-content-center align-items-center">
            <v-alert
                mode="in-out"
                prominent
                :type="alertType"
                :value="showAlert"
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
import validation from "../services/validation";
export default {
    name: "DiscountComponent",
    data(){
        return{
            ...validation,
            valid: false,
            spinForDiscountDialog: false,
            spinnerDialog: false,
            showAlert: false,
            spinForm: new Form({
                name: '',
                email: '',
                phone_number: ''
            }),
            alertType: 'success',
            alertMessage: 'Nunc nonummy metus. Nunc interdum lacus sit amet orci.',
        }
    },
    methods:{
        spinForDiscount(){
            this.spinForDiscountDialog = true
        },
        cancelSpin(){
            this.spinForm.reset()
            this.$refs.donationForm.reset()
            this.spinForDiscountDialog = false
        },
        closeAlert(){
            this.showAlert = false
            setTimeout(() => {
                this.alertMessage = ''
            }, 100)
        },
        checkDiscount(){
            if(!this.$refs.donationForm.validate()) return
            this.spinForDiscountDialog = false
            this.spinnerDialog = true
            setTimeout(() => {
                axios.post('/discount-generator/check-discount', this.spinForm)
                    .then((response) => {
                        this.alertType = response.data.alertType
                        this.alertMessage = response.data.message
                        this.spinnerDialog = false
                        this.showAlert = true
                    })
                    .catch(() => {})
                this.spinnerDialog = false
            }, 5000)
        }
    }
}
</script>

<style scoped>

</style>
