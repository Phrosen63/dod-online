<template>
  <div class="profile view-window">
    <h1>{{ $t('profile') }}</h1>
    <pulse-loader
      v-if="loading"
      class="spinner"
      :size="size"
      :color="color"
    />
    <div
      v-else
      class="profile-info"
    >
      <div>
        <label
          for="field_UserName"
          class="profile-info__label profile-info__user-name"
        >
          {{ $t('user_name') }}:
        </label>
        <input
          id="field_UserName"
          v-model="displayName"
          type="text"
          class="hidden-textfield"
          title="Click to edit"
          @focus="$event.target.select()"
          @change="updateUserDisplayName($event)"
        >
        <button
          class="profile-info__random-name-button"
          @click="generateRandomName"
        >
          {{ $t('generate_random_name') }}
        </button>
      </div>
      <p>{{ $t('email') }}: <span>{{ email }}</span></p>
      <p>{{ $t('role') }}: <span>{{ role }}</span></p>
      <div>
        <label
          for="language"
          class="profile-info__label"
        >
          {{ $t('prefered_language') }}:
        </label>
        <select
          id="language"
          v-model="language"
          @change="languageUpdated($event)"
        >
          <option value="en">
            {{ $t('english') }}
          </option>
          <option value="sv">
            {{ $t('swedish') }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
// Modules
import { getFirebaseUser } from '@/api/database/user';
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min';
import { generateName } from '@/api/randomNameGenerator';
import { updateDocumentFieldForCurrentUser } from '@/api/database/write';

export default {
  name: 'Profile',
  components: {
    PulseLoader,
  },
  data() {
    return {
      user: {},
      language: undefined,
      loading: true,
      color: '#75a1de',
      size: '25px',
    };
  },
  computed: {
    role() {
      return this.convertRole(this.$store.state.settings.role);
    },
    settingsId() {
      return this.$store.state.settings.id;
    },
    displayName() {
      return this.$store.state.settings.displayName;
    },
    email() {
      return this.$store.state.settings.email;
    },
  },
  created() {
    this.language = this.$store.state.settings.language;
    this.loading = false;
  },
  methods: {
    convertRole(role) {
      switch (role) {
        case 1:
          return this.$t('admin');
        case 2:
          return this.$t('moderator');
        case 4:
          return this.$t('reader');
      }
      return this.$t('user'); // 3
    },
    async updateUserDisplayName(event) {
      const currentUser = await getFirebaseUser();

      if (currentUser) {
        currentUser.updateProfile({displayName: event.target.value});
      }
    },
    generateRandomName() {
      const randomName = generateName();

      const fakeEvent = {
        target: {
          value: randomName,
        },
      };
      this.updateUserDisplayName(fakeEvent);
      this.displayName = randomName;
    },
    async languageUpdated(event) {
      const value = event.target.value;
      const data = {
        language: value,
      };

      updateDocumentFieldForCurrentUser({
        collection: 'settings',
        document: this.settingsId,
        data,
      }).then(() => {
        this.$i18n.locale = value;
        this.$store.commit('updateLanguage', {
          data: {
            value: value,
          },
        });
      }).catch(e => console.log('Error: ' + e));
    },
  },
};
</script>

<style scoped>
.profile-info__label {
  font-size: 18px;
}

.profile-info__random-name-button {
  cursor: pointer;
}
</style>
