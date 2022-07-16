<template>
<div>
    <v-btn @click="spinForDiscount" color="primary" class="btn-primary rounded-3">spin for discount</v-btn>
    <v-dialog
        v-model="spinForDiscountDialog"
        max-width="600"
        persistent
    >
        <v-card class="p-12">
            <v-card-title class="mb-2 d-flex justify-content-center text-center text-primary">
                Spin For Discount
            </v-card-title>
            <v-divider></v-divider>
            <v-form @submit.prevent="checkDiscount" ref="donationForm" v-model="valid">

            <v-card-text>
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
            </v-card-text>
            <v-card-actions class="d-flex justify-content-end">
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
            </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog
        v-model="spinnerComDialog"
        max-width="600"
        persistent
    >
        <v-card >
            <v-card-title class="mb-2 d-flex justify-content-center text-center text-primary">
                Tula secret
            </v-card-title>
            <v-divider></v-divider>


            <v-card-text>
                <v-row class="pa-0 m-0 justify-content-center d-flex">
                    <v-col cols="12 pa-0 m-0" >
                        <!-- type: canvas -->
                        <FortuneWheel
                            style="width: 90%"
                            :canvas="canvasOptions"
                            :prizes="discountPrices"
                            :verify="canvasVerify"
                            @rotateStart="onCanvasRotateStart"
                            @rotateEnd="onRotateEnd"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="w-100 d-flex justify-content-end text-right my-0 pt-5 pb-4">
                <v-btn
                    depressed
                    color="error"
                    class="mr-2"
                    @click="closeSpin"
                    aria-label="Cancel"
                >
                    Cancel
                </v-btn>
            </v-card-actions>

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
import FortuneWheel from 'vue-fortune-wheel'
import 'vue-fortune-wheel/lib/vue-fortune-wheel.css'
export default {
    name: "DiscountComponent",
    components: {
        FortuneWheel
    },
    data(){
        return{
            ...validation,
            valid: false,
            spinnerComDialog: false,
            spinForDiscountDialog: false,
            spinnerDialog: false,
            showAlert: false,
            spinForm: new Form({
                name: '',
                email: '',
                phone_number: '',
                discount_amount: 0
            }),
            alertType: 'success',
            alertMessage: '',
            canvasVerify: true, // Whether the turntable in canvas mode is enabled for verification
            canvasOptions: {
                borderWidth: 6,
                borderColor: '#584b43'
            },
            prizes: [
                {
                    id: 1, //* The unique id of each prize, an integer greater than 0
                    name: '10%', // Prize name, display value when type is canvas (this parameter is not needed when type is image)
                    value: 10, //* Prize value, return value after spinning
                    bgColor: '#45ace9', // Background color (no need for this parameter when type is image)
                    color: '#ffffff', // Font color (this parameter is not required when type is image)
                    probability: 100, //* Probability, up to 4 decimal places (the sum of the probabilities of all prizes
                    weight: 1 // Weight, if useWeight is true, the probability is calculated by weight (weight must be an integer), so probability is invalid
                },
                {
                    id: 2,
                    name: '20%',
                    value: 20,
                    bgColor: '#dd3832',
                    color: '#ffffff',
                    probability: 0,
                    weight: 1
                },
                {
                    id: 3,
                    name: '30%',
                    value: 30,
                    bgColor: '#fef151',
                    color: '#ffffff',
                    probability: 0,
                    weight: 1
                },
                {
                    id: 4,
                    name: '40%',
                    value: 40,
                    bgColor: '#b0fe51',
                    color: '#ffffff',
                    probability: 0,
                    weight: 1
                },
                {
                    id: 5,
                    name: '50%',
                    value: 50,
                    bgColor: '#de51fe',
                    color: '#ffffff',
                    probability: 0,
                    weight: 1
                },
            ],
            discountPrices: []
        }
    },
    methods:{
        spinForDiscount(){
            scrollTo(0, 0)
            this.spinForDiscountDialog = true
        },
        cancelSpin(){
            this.spinForm.reset()
            this.$refs.donationForm.reset()
            this.spinForDiscountDialog = false
        },
        closeSpin(){
            this.spinForm.reset()
            this.$refs.donationForm.reset()
            this.spinnerComDialog = false
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
                        if(response.data.canSpin === 'true'){
                            //User qualifies to Spin
                            this.discountPrices = response.data.discountList
                            this.spinnerDialog = false
                            this.spinnerComDialog = true
                        } else {
                            this.alertType = response.data.alertType
                            this.alertMessage = response.data.message
                            this.spinnerDialog = false
                            this.showAlert = true
                        }
                    })
                    .catch((error) => {
                        this.alertType = 'error'
                        this.alertMessage = error.response.data.message
                        this.spinnerDialog = false
                        this.showAlert = true
                    })
                this.spinnerDialog = false
            }, 3000)
        },
        DoServiceVerify(verified, duration) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(verified)
                }, duration)
            })
        },
        onRotateEnd(prize) {
            this.spinForm.discount_amount = prize.value
            console.log(prize)

            axios.post('/discount-generator/store', this.spinForm)
                .then((response) => {
                    this.closeSpin()
                    this.alertType = response.data.alertType
                    this.alertMessage = response.data.message
                    this.showAlert = true
                })
                .catch((error) => {
                    this.closeSpin()
                    this.alertType = 'error'
                    this.alertMessage = error.response.data.message
                    this.showAlert = true
                })
        },
        onCanvasRotateStart(rotate) {
            rotate() // Call the callback, start spinning
        },
        /*onCanvasRotateStart(rotate) {
            if (this.canvasVerify) {
                const verified = true // true: the test passed the verification, false: the test failed the verification
                this.DoServiceVerify(verified, 2000).then((verifiedRes) => {
                    if (verifiedRes) {
                        console.log('Verification passed, start to rotate')
                        rotate() // Call the callback, start spinning
                        this.canvasVerify = false // Turn off verification mode
                    } else {
                        this.alertType = 'error'
                        this.alertMessage = 'Failed verification'
                        this.showAlert = true
                    }
                })
                return
            }
            console.log('onCanvasRotateStart')
        },*/

        getDiscountPrices(){
            this.discountPrices = []
            axios.get('/get-discount-list')
                .then((response) => {
                    if(response.data.length > 0){
                        let itemsLength = response.data.length
                        let probability = 100/itemsLength
                        let records = []
                        let totalProb = 0
                        response.data.map((item) => {
                            let data = {
                                id: item.id,
                                name: item.name,
                                value: item.rate,
                                bgColor: item.bg_color,
                                color: item.color,
                                probability: probability,
                                weight: 1
                            }
                            records.push(data)
                        })
                        records.map((rec) => {
                            totalProb += rec.probability
                        })
                        if(totalProb !== 100){
                            let dif = (totalProb - 100)
                            if(dif > 0){

                                let max = records.reduce((prev, current) => {
                                    return (prev.value > current.value) ? prev : current
                                })
                                let index = this.getItemByIndexId(records, max.id)
                                console.log('records big', records)
                                console.log('index big', index)
                                records[index] = {
                                    id: records[index].id,
                                    name: records[index].name,
                                    value: records[index].value,
                                    bgColor: records[index].bgColor,
                                    color: records[index].color,
                                    probability: (records[index].probability - dif),
                                    weight: 1
                                }
                            }
                            if(dif < 0){
                                let max = records.reduce((prev, current) => {
                                    return (prev.value < current.value) ? prev : current
                                })
                                let index = this.getItemByIndexId(records, max.id)
                                console.log('records small', records)
                                console.log('index small', index)
                                records[index] = {
                                    id: records[index].id,
                                    name: records[index].name,
                                    value: records[index].value,
                                    bgColor: records[index].bgColor,
                                    color: records[index].color,
                                    probability: (records[index].probability + dif),
                                    weight: 1
                                }
                            }

                        }
                        let ddd = 0
                            records.map((rec) => {
                                ddd += rec.probability
                        })
                        console.log('new total', ddd)

                        this.discountPrices = records
                    } else {
                        this.discountPrices = this.prizes
                    }
                })
                .catch((error) => {})
        },
        getItemByIndexId(items, id){
            let data = null
            items.map((item, index) => {
                if(item.id === id){
                    data = index
                }
            })
            return data
        }
    },
    created() {
        //this.getDiscountPrices()
        this.discountPrices = this.prizes
    }
}
</script>

<style scoped>

</style>
