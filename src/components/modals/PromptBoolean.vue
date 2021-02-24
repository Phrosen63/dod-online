<template>
  <div class="prompt-modal">
    <div class="prompt-modal-heading">
      <h1 class="prompt-modal__title">
        {{ heading.title }}
      </h1>
      <p class="prompt-modal__preamble">
        {{ heading.preamble }}
      </p>
      <p class="prompt-modal__content">
        {{ heading.content }}
      </p>
    </div>
    <div class="prompt-modal-wrapper">
      <button
        class="prompt-modal__button"
        @click="no"
      >
        Cancel
      </button>
      <button
        class="prompt-modal__button"
        @click="yes"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromptBoolean',
  data() {
    return {
      data: [],
      heading: undefined,
      objectId: undefined,
      mutation: undefined,
    };
  },
  created() {
    this.data = this.$attrs.data;
    this.heading = this.$attrs.heading;
    this.objectId = this.$attrs.objectId;
    this.mutation = this.$attrs.mutation;
  },
  methods: {
    no() {
      this.$store.dispatch('commitBoolean', {
        mutation: this.mutation,
        payload: {
          value: false,
        },
      });
      this.$modal.hideAll();
    },
    yes() {
      this.$store.dispatch('commitBoolean', {
        mutation: this.mutation,
        payload: {
          value: true,
          id: this.objectId,
        },
      });
      this.$modal.hideAll();
    },
  },
}
</script>

<style scoped>
.prompt-modal {
  padding: 10px;
}

.prompt-modal-heading {
  margin: 0 0 30px 0;
}

.prompt-modal__title,
.prompt-modal__preamble,
.prompt-modal__content {
  text-align: center;
  font-size: 20px;
}

.prompt-modal__title {
  font-size: 32px;
}

.prompt-modal__preamble {
  margin: 0;
}

.prompt-modal__content {
  margin: 0;
}

.prompt-modal-wrapper {
  flex: 1 0 auto;
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.prompt-modal__button {
  flex: 1 0 auto;
  max-width: 49%;
  margin: 0;
  padding: 5px 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
