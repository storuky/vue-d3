<template>
  <div class="sign-wrapper">
    <div class="sign-in-up sign-in">
      <div class="sign-in-up-body">
        <div class="sign-links">
          <router-link class="weight-500" to="/sign-in">
            <v-icon class="sign-link-icon">keyboard_arrow_left</v-icon>
            <span>Sign In</span>
          </router-link>
        </div>
        <div class="welcome">
          <div class="welcome-logo gradient">
            V
          </div>
          <div class="welcome-title">Forgot a password?</div>
          <div class="welcome-subtitle">Not a big deal</div>
        </div>
        <v-text-field v-model="params.email" type="email" label="Email"></v-text-field>

      </div>
      <div class="submit-sign" @click="reset">Reset</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ForgotPassword',
    methods: {
      reset () {
        this.$router.push({name: 'signIn'})
      }
    },
    data () {
      return {
        params: {}
      }
    }
  }
</script>