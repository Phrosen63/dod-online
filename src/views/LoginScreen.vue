<template>
  <div class="login-screen  view-window">
    <h1>DoD-online<br>{{ $t('login_or_signup') }}</h1>
    <p
      class="error-message"
      :class="showErrorMessage ? '' : 'hide'"
    >
      {{ $t('login_failed') }}
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
        :placeholder="$t('email')"
        required
      >
      <input
        id="txtPassword"
        v-model="pass"
        class="form-control"
        type="password"
        :placeholder="$t('password')"
        required
      >
      <button
        id="btnLogin"
        class="form-control"
        @click="login"
      >
        {{ $t('log_in') }}
      </button>
      <button
        id="btnSignUp"
        class="form-control"
        @click="signUp"
      >
        {{ $t('sign_up') }}
      </button>
    </form>
  </div>
</template>

<script>
// Modules
import { auth } from '@/api/database/auth';
import { getFirebaseUser, createNewUser, getUserSettings } from '@/api/database/user';

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
      .then(async (userCredential) => {
        // Signed in
        if (userCredential.user) {
          const settings = await getUserSettings();

          this.$i18n.locale = settings.language;
          this.$store.commit('updateLanguage', {
            data: {
              value: settings.language,
            },
          });

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
