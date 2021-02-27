<template>
  <div class="login-screen  view-window">
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
    <form
      id="login-form"
      @submit.prevent
    >
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
import { getFirebaseUser, createNewUser } from '@/api/database/user';

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
      auth.signInWithEmailAndPassword(this.email, this.pass)
      .then((userCredential) => {
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
    async signUp() {
      this.resetErrors();
      try {
        await createNewUser(this.email, this.pass);
        this.$router.push('Profile');
      } catch (e) {
        this.showErrorMessage = true;
        this.errorMessage = e.message;
      }
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
  text-align: center;
  border: 1px solid #000;
  background-color: rgba(245, 235, 201, 0.65);
  min-height: unset;
}

.login-screen > h1 {
  margin: 20px 0 35px 0;
}

#login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#login-form > .form-control {
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

@media all and (max-width: 1200px) {
  .login-screen {
    width: 80%;
  }
}

@media all and (max-width: 400px) {
  .login-screen {
    width: 90%;
    margin: 50px auto 25px auto;
  }

  #login-form > .form-control {
    width: 90%;
  }
}
</style>
