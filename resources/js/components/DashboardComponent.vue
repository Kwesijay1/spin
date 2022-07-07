<template>
<div class="page-section p-0" id="dashboard">
    <v-card min-height="400">
        <v-toolbar
            color="primary"
            dark
            flat
        >
            <template v-slot:extension>
                <v-tabs
                    v-model="tab"
                    align-with-title
                >
                    <v-tabs-slider color="white"></v-tabs-slider>

                    <v-tab
                        v-for="item in items"
                        :key="item"
                    >
                        {{ item }}
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">
            <v-tab-item
            >
                <v-card flat>
                    <DiscountListComponent></DiscountListComponent>
                </v-card>
            </v-tab-item>
            <v-tab-item
            >
                <v-card flat>
                    <DaysValueComponent></DaysValueComponent>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</div>
</template>

<script>
import DiscountListComponent from './Admin/DiscountListComponent'
import DaysValueComponent from './Admin/DaysValueComponent'
    export default {
        name: "DashboardComponent",
        components: {DiscountListComponent, DaysValueComponent},
        data () {
            return {
                tab: null,
                items: [
                    'Discounts', 'Days Configurations'
                ],
            }
        },
        methods: {
        },
        mounted() {
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
