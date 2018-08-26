<template>
  <div class="sign-wrapper">
    <div class="sign-in-up sign-in">
      <div class="sign-in-up-body">
        <div class="welcome">
          <div class="welcome-logo gradient">
            V
          </div>
          <div class="welcome-title">Welcome Back</div>
          <div class="welcome-subtitle">Sign In to continue</div>
        </div>
        <v-text-field v-model="params.email" type="email" label="Email"></v-text-field>
        <v-text-field v-model="params.password" type="password" label="Password"></v-text-field>

        <div class="sign-links">
          <router-link class="weight-500" to="/sign-up">Sign Up</router-link>
          <router-link class="weight-500" to="/forgot-password">Forgot Password</router-link>
        </div>
      </div>
      <div class="submit-sign" @click="signIn">
        Sign In
      </div>
    </div>
  </div>
</template>

<script>
  import './index.css'
  export default {
    name: 'SignIn',
    methods: {
      signIn () {
        this.$http.post('/vulcan/v1/auth/login', {user: this.params})
          .then(res => {
            this.$store.dispatch('setCurrentUser', res.data)
            if (this.$route.query.redirect) {
              this.$router.push({path: this.$route.query})
            } else {
              this.$router.push({name: 'root'})
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