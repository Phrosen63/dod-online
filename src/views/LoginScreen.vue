<template>
  <div class="login-screen">
    <h1>DoD-online<br>Log in or Sign up</h1>
    <p
      class="error-message"
      :class="showErrorMessage ? '' : 'hide'"
    >
      Login failed, please check your credentials and try again.
    </p>
    <p
      class="error-message"
      :class="showErrorMessage ? '' : 'hide'"
    >
      {{ errorMessage }}
    </p>
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
    </form>
  </div>
</template>

<script>
// Modules
import { auth } from '@/api/auth';

export default {
  name: 'LoginScreen',
  data() {
    return {
      showErrorMessage: false,
      errorMessage: undefined,
      email: undefined,
      pass: undefined,
    };
  },
  methods: {
    resetErrors() {
      this.showErrorMessage = false;
      this.errorMessage = undefined;
    },
    login() {
      this.resetErrors();
      const promise = auth.signInWithEmailAndPassword(this.email, this.pass);
      promise.then((userCredential) => {
        // Signed in
        if (userCredential.user) {
          this.$store.commit('setUser', userCredential.user);
          if (this.$route.name === 'LoginScreen') {
            this.$router.push('Lobby');
          }
        }
      })
      .catch(e => {
        this.showErrorMessage = true;
        this.errorMessage = e.message;
      });
    },
    signUp() {
      this.resetErrors();
      const promise = auth.createUserWithEmailAndPassword(this.email, this.pass);
      promise.catch(e => {
        this.showErrorMessage = true;
        this.errorMessage = e.message;
      });
    },
  },
  beforeRouteLeave (to, from, next) {
    if (this.$store.state.user) {
      next();
    } else {
      alert('Please login before proceeding.');
    }
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

.error-message {
  color: crimson;
  font-size: 20px;
  text-shadow: black 0px 1px 0px;
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
