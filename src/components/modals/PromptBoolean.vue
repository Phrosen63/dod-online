<template>
  <div class="modal-window">
    <div class="prompt-modal-heading">
      <h1 class="modal-heading">
        {{ heading.title }}
      </h1>
      <p class="prompt-modal__preamble">
        {{ heading.preamble }}
      </p>
      <p class="prompt-modal__content">
        {{ heading.content }}
      </p>
    </div>
    <div class="modal-wrapper">
      <button
        class="modal-button"
        @click="no"
      >
        {{ data.button.no }}
      </button>
      <button
        class="modal-button"
        @click="yes"
      >
        {{ data.button.yes }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromptBoolean',
  data() {
    return {
      data: {},
      heading: undefined,
      objectId: undefined,
      mutation: undefined,
      stateTarget: undefined,
    };
  },
  created() {
    this.data = this.$attrs.data;
    this.heading = this.$attrs.heading;
    this.objectId = this.$attrs.objectId;
    this.mutation = this.$attrs.mutation;
    this.collectionPath = this.$attrs.collectionPath;
    this.stateTarget = this.$attrs.stateTarget;
  },
  methods: {
    no() {
      this.$modal.hideAll();
    },
    yes() {
      const data = {
        id: this.objectId,
        collectionPath: this.collectionPath,
        stateTarget: this.stateTarget,
      };
      this.$store.commit(this.mutation, data);
      this.$modal.hideAll();
    },
  },
}
</script>

<style scoped>
.prompt-modal-heading {
  margin: 0 0 30px 0;
}

.prompt-modal__preamble,
.prompt-modal__content {
  text-align: center;
  font-size: 20px;
}

.prompt-modal__preamble {
  margin: 0;
}

.prompt-modal__content {
  margin: 0;
}
</style>
