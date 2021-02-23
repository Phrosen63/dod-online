<template>
  <div class="add-multiple">
    <h1 class="prompt-modal__title">
      {{ title }}
    </h1>
    <p class="preamble">
      ~ First add a field by filling out Field name<br>
      and click the Add field button<br>
      Then fill out the new field,<br>
      repeat until satisfied, <br>
      then click the Add button ~
    </p>
    <p
      class="error-message"
      :class="showErrorMessage ? '' : 'hide'"
    >
      {{ errorMessage }}
    </p>
    <div class="add-multiple-wrapper">
      <label class="add-multiple__label">Field name: </label>
      <input
        v-model="newFieldTitle"
        class="add-multiple__input"
        type="text"
        value=""
      >
    </div>
    <button
      class=""
      @click="AddField"
    >
      Add field
    </button>
    <div class="add-multiple-field-list">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="add-multiple-field"
      >
        <label class="add-multiple__label">
          {{ item.key }}:
        </label>
        <input
          v-model="result[item.key]"
          class="add-multiple__input"
          type="text"
        >
      </div>
    </div>
    <div class="add-multiple-wrapper">
      <button
        class="add-multiple__button"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        class="add-multiple__button"
        @click="add"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
// Modules
import { EventBus } from '@/eventBus';

export default {
  name: 'AddFieldsMultipleModal',
  data() {
    return {
      result: {},
      list: [],
      data: [],
      title: undefined,
      newFieldTitle: undefined,
      showErrorMessage: false,
      errorMessage: undefined,
      EVENT_NAME: undefined,
    };
  },
  created() {
    this.data = this.$attrs.data;
    this.title = this.$attrs.title;
    this.EVENT_NAME = this.$attrs.eventName;
  },
  methods: {
    resetErrors() {
      this.showErrorMessage = false;
      this.errorMessage = undefined;
    },
    AddField() {
      this.resetErrors();
      if (this.newFieldTitle) {
        const alreadyInList = this.list.filter(item => item.key === this.newFieldTitle).length > 0;
  
        if (alreadyInList) {
          // Already in list, do not add new field
          this.showErrorMessage = true;
          this.errorMessage = 'A field with that name already exists, please choose a different name.';
        } else {
          // New field, add to list
          this.list.push({
            key: this.newFieldTitle,
            value: '',
          });
          this.newFieldTitle = undefined;
        }
      } else {
        // No field name
        this.showErrorMessage = true;
        this.errorMessage = 'Please fill out the Field name field.';
      }
    },
    cancel() {
      this.$modal.hideAll();
    },
    removeEmptyFields(obj) {
      return Object.entries(obj).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {});
    },
    add() {
      this.resetErrors();
      const cleanedObject = this.removeEmptyFields(this.result);
      if (Object.keys(cleanedObject).length > 0) {
        // Cleaned object has keys
        EventBus.$emit(this.EVENT_NAME, cleanedObject);
        this.$modal.hideAll();
      } else {
        // Cleaned object has no keys
        this.showErrorMessage = true;
        this.errorMessage = 'Please fill out the custom field(s).';
      }
    },
  },
}
</script>

<style scoped>
.add-multiple {
  padding: 10px;
}

.add-multiple-field-list {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  padding: 10px 0;
}

.add-multiple-field {
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
  margin: 5px 0;
}

.add-multiple__label {
  flex: 0 0 20%;
  font-size: 20px;
}

.add-multiple__input {
  flex: 1 0 80%;
  font-size: 20px;
}

.add-multiple-wrapper {
  flex: 1 0 auto;
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.add-multiple__button {
  flex: 1 0 auto;
  max-width: 49%;
  margin: 0;
  padding: 5px 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
