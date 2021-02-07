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
  name: 'LoginScreen',
  data() {
    return {
      email: undefined,
      pass: undefined,
    };
  },
  created() {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // User is logged in
        console.log('User logged in successfully!');
        console.log(firebaseUser);
        this.$store.commit('setUser', firebaseUser);
        console.log(this.$store.state.user);
        // this.$router.push('About');
      } else {
        // User is not logged in
        console.log('User is not logged in..');
      }
    });
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

<style scoped>
.login-screen {
  margin: 200px auto 50px auto;
  width: 30%;
  padding: 20px 20px 50px 20px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #000;
  background-color:rgba(245, 235, 201, 0.65);
}

.login-screen > h1 {
  margin: 20px 0 35px 0;
}

#login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#login-form .form-control {
  padding: 10px;
  margin: 0 0 12px 0;
  width: 60%;
  font-size: 20px;
  border: 0;
}

#login-form > #btnLogin {
  background-color: #6cd92e;
  cursor: pointer;
  transition: ease-in 100ms;
}

#login-form > #btnLogin:hover {
  background-color: #5bb528;
}

#login-form > #btnSignUp {
  background-color: #34dbeb;
  cursor: pointer;
  transition: ease-in 100ms;
}

#login-form > #btnSignUp:hover {
  background-color: #2dbecc;
}
</style>
