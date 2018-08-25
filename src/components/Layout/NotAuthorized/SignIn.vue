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
        <v-text-field type="email" label="Email"></v-text-field>
        <v-text-field type="password" label="Password"></v-text-field>

        <div class="text-right">
          <router-link class="weight-500" to="/forgot-password">Forgot Password</router-link>
        </div>
      </div>
      <div class="submit-sign" @click="$router.push('/')">Sign In</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SignIn"
  }
</script>

<style>
  .sign-wrapper {
    background: #f5f5f5;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .welcome-logo {
    height: 75px;
    width: 75px;
    margin: 20px auto;
    background: -webkit-gradient(linear, left top, right top, from(#e44e9d),to(#9c58a2));
    background: linear-gradient(to right, #e44e9d 0%,#9b58a2 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e44e9d', endColorstr='#505fa6',GradientType=1 );
    border-radius: 5px;
    color: white;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sign-in-up {
    width: 400px;
    margin: auto;
    box-shadow: 0px 0px 8px rgba(0,0,0,.12);
    background: white;
  }
  .welcome {
    text-align: center;
    margin: 0 0 80px 0;
  }
  .welcome-title {
    font-size: 30px;
    font-weight: 500;
  }

  .sign-in-up-body {
    padding: 30px;
  }

  .welcome-subtitle {
    font-size: 16px;
    color: #888484;
  }
  .submit-sign {
    color: white;
    background-color: #df4e9e;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    transition: .2s;
  }
  .submit-sign:hover {
    filter: brightness(108%);
  }
</style>