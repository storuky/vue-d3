<template>
  <div class="sign-wrapper">
    <div class="sign-in-up sign-in">
      <div class="sign-in-up-body">
        <div class="sign-links">
          <router-link class="weight-500" to="/sign-in">
            <v-icon class="sign-link-icon">keyboard_arrow_left</v-icon>
            Sign In
          </router-link>
        </div>
        <div class="welcome">
          <div class="welcome-logo gradient">
            V
          </div>
          <div class="welcome-title">Welcome to Vulcan</div>
          <div class="welcome-subtitle">Sign Up to continue</div>
        </div>
        <v-text-field @keyup.enter.native="signUp" v-model="params.email" type="email" label="Email"></v-text-field>
        <v-text-field @keyup.enter.native="signUp" autocomplete="off" v-model="params.password" type="password" label="Password"></v-text-field>

      </div>
      <div class="submit-sign" @click="signUp">Sign Up</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignIn',
    methods: {
      signUp () {
        this.$http.post('/vulcan/v1/auth/register', {user: this.params})
          .then(res => {
            this.$store.dispatch('user/setCurrent', res.data)
            if (this.$route.query.redirect) {
              this.$router.push({path: this.$route.query})
            } else {
              this.$router.push({name: 'dashboard'})
            }
          })
      }
    },
    data () {
      return {
        params: {}
      }
    }
  }
</script>

<style>
  
</style>