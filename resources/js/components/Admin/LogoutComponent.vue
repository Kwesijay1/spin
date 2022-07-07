<template>
    <li @click="logout">
        <a class="nav-link" href="#" >
            Logout</a>
        <v-form id="logout-form" ref="logoutForm" :action="logoutUrl" method="POST" style="display: none;">
            <input type="hidden" name="_token" :value="csrf_token">
            <v-btn type="submit" ref="submitButton"></v-btn>
        </v-form>
    </li>
</template>

<script>
export default {
    name: "LogoutComponent",
    props: ['logoutUrl', 'csrf_token'],
    methods:{
        logout(){
            console.log('we are')
            this.$refs.submitButton.$el.click()
        }
    }
}
</script>

<style scoped>

</style>
