<template>
    <div class="login-screen">
      <h1>DoD-online<br>Log in or Sign up</h1>
      <form id="login-form">
        <input
          id="txtEmail"
          class="form-control"
          type="email"
          placeholder="Email"
          v-model="email"
          required
        >
        <input
          id="txtPassword"
          class="form-control"
          type="password"
          placeholder="Password"
          v-model="pass"
          required
        >
        <button
          id="btnLogin"
          class="form-control"
          @click="login"
        >
          Log in
        </button>
        <button
          id="btnSignUp"
          class="form-control"
          @click="signUp"
        >
          Sign up
        </button>
        <button
          id="btnLogout"
          class="hide"
        >
          Log out
        </button>
      </form>
    </div>
</template>

<script>
import { auth } from '@/api/auth';

export default {
  name: 'About',
  data() {
    return {
      email: undefined,
      pass: undefined,
    };
  },
  methods: {
    login() {
      const promise = auth.signInWithEmailAndPassword(this.email, this.pass);
      promise.catch(e => console.log(e.message));
    },
    signUp() {
      const promise = auth.createUserWithEmailAndPassword(this.email, this.pass);
      promise.catch(e => console.log(e.message));
    },
  },
}
</script>
