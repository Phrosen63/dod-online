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
        v-model="email"
        class="form-control"
        type="email"
        placeholder="Email"
        required
      >
      <input
        id="txtPassword"
        v-model="pass"
        class="form-control"
        type="password"
        placeholder="Password"
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
import { auth } from '@/api/database/auth';
import { getFirebaseUser } from '@/api/database/user';

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
          if (this.$route.name === 'LoginScreen') {
            this.$router.push('Lobby');
          }
        }
      })
        .catch((e) => {
          this.showErrorMessage = true;
          this.errorMessage = e.message;
        });
    },
    signUp() {
      this.resetErrors();
      const promise = auth.createUserWithEmailAndPassword(this.email, this.pass);
      promise.catch((e) => {
        this.showErrorMessage = true;
        this.errorMessage = e.message;
      });
    },
  },
  async beforeRouteLeave(to, from, next) {
    const currentUser = await getFirebaseUser();
    if (currentUser) {
      next();
    } else {
      if (this.$route.name !== 'LoginScreen') {
        this.$router.push('/');
      }
    }
  },
};
</script>

<style scoped>
.login-screen {
  margin: 200px auto 50px auto;
  width: 30%;
  padding: 20px 20px 50px 20px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #000;
  background-color: rgba(245, 235, 201, 0.65);
}

.login-screen > h1 {
  margin: 20px 0 35px 0;
}

.error-message {
  color: crimson;
  font-size: 20px;
  text-shadow: black 0 1px 0;
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
