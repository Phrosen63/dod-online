<template>
  <transition name="bounce">
    <div
      v-if="error.hasError"
      class="error-handler"
    >
      <button
        class="close-button"
        @click="close"
      >
        Close
      </button>
      <div class="grid">
        <div class="row">
          <div class="col-12">
            <h1>Error</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p class="error-message">
              {{ error.message }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ErrorHandler',
  computed: {
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    close() {
      this.$store.commit('resetError');
    }
  },
};
</script>

<style scoped>
.error-handler {
  position: relative;
  margin: 100px auto 25px auto;
  max-width: 1440px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: white;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #e3e2e1;
}

.bounce-enter-active {
  animation: bounce-in 0.6s;
}

.bounce-leave-active {
  animation: bounce-in 0.6s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
