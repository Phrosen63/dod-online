<template>
  <div class="modal-window add-multiple">
    <h1 class="modal-heading">
      {{ title }}
    </h1>
    <template v-if="isCustomItem">
      <p class="preamble">
        ~ {{ $t('add_fields_multiple_info_1') }}<br>
        {{ $t('add_fields_multiple_info_2') }}<br>
        {{ $t('add_fields_multiple_info_3') }}<br>
        {{ $t('add_fields_multiple_info_4') }}<br>
        {{ $t('add_fields_multiple_info_5') }} ~
      </p>
      <p
        class="error-message"
        :class="showErrorMessage ? '' : 'hide'"
      >
        {{ errorMessage }}
      </p>
      <div class="modal-wrapper">
        <label class="modal-label">
          {{ $t('field_name') }}:
        </label>
        <input
          v-model="newFieldTitle"
          class="add-multiple__input"
          type="text"
          value=""
        >
      </div>
      <button
        class=""
        @click="addField"
      >
        {{ $t('add_field') }}
      </button>
    </template>
    <div class="add-multiple-field-list">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="add-multiple-field"
      >
        <label class="modal-label">
          {{ item.key }}:
        </label>
        <input
          v-model="result[item.key]"
          class="add-multiple__input"
          type="text"
        >
      </div>
    </div>
    <div class="modal-wrapper">
      <button
        class="modal-button"
        @click="cancel"
      >
        {{ $t('cancel') }}
      </button>
      <button
        class="modal-button"
        @click="add"
      >
        {{ $t('add') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddFieldsMultipleModal',
  data() {
    return {
      result: {},
      isCustomItem: false,
      list: [],
      title: undefined,
      newFieldTitle: undefined,
      showErrorMessage: false,
      errorMessage: undefined,
      mutation: undefined,
    };
  },
  created() {
    this.isCustomItem = this.$attrs.data.length === 0;
    this.list = this.$attrs.data;
    this.title = this.$attrs.title;
    this.mutation = this.$attrs.mutation;
    this.collectionPath = this.$attrs.collectionPath;
  },
  methods: {
    resetErrors() {
      this.showErrorMessage = false;
      this.errorMessage = undefined;
    },
    addField() {
      this.resetErrors();
      if (this.newFieldTitle) {
        const alreadyInList = this.list.filter(item => item.key === this.newFieldTitle).length > 0;
  
        if (alreadyInList) {
          // Already in list, do not add new field
          this.showErrorMessage = true;
          this.errorMessage = this.$i18n.locale === 'en' ?
            'A field with that name already exists, please choose a different name.' :
            'Ett fält med samma namn existerar redan, vänligen välj ett annat namn';
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
        this.errorMessage = this.$i18n.locale === 'en' ?
          'Please fill out the Field name field.' :
          'Fyll i Fältets namn-fältet.';
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
        const payload = {
          collectionPath: this.collectionPath,
          data: cleanedObject,
        };
        this.$store.commit(this.mutation, payload);
        this.$modal.hideAll();
      } else {
        // Cleaned object has no keys
        this.showErrorMessage = true;
        this.errorMessage = this.$i18n.locale === 'en' ?
          'Please fill out the custom field(s).' :
          'Vänligen fyll i custom fält(en).';
      }
    },
  },
}
</script>

<style scoped>
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

.add-multiple__input {
  flex: 1 0 80%;
  font-size: 20px;
}

.add-multiple .modal-label {
  flex: 0 0 20%;
}
</style>
