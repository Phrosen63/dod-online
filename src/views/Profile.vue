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
      <p>{{ $t('email') }}: <span>{{ user.email }}</span></p>
      <p>{{ $t('role') }}: <span>{{ role }}</span></p>
      <div>
        <label
          for="language"
          class="profile-info__label"
        >
          {{ $t('prefered_language') }}
        </label>
        <select
          id="language"
          v-model="language"
          @change="languageUpdated($event)"
        >
          <option value="en">
            en
          </option>
          <option value="sv">
            sv
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
// Modules
import { db } from '@/api/database/db';
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
      displayName: undefined,
      settingsId: undefined,
      language: undefined,
      role: undefined,
      loading: true,
      color: '#75a1de',
      size: '25px',
    };
  },
  async created() {
    const currentUser = await getFirebaseUser();
    this.user = currentUser;
    this.role = await this.getUserRole();
    this.loading = false;
    this.displayName = this.user.displayName;
  },
  methods: {
    convertRole(role) {
      switch (role) {
        case 0:
          return 'Admin';
        case 1:
          return 'Moderator';
        case 3:
          return 'Reader';
      }
      return 'User'; // 2
    },
    async getUserRole() {
      const currentUser = this.user ? this.user : await getFirebaseUser();
      const { uid } = currentUser;
      const COLLECTION_NAME = `/users/${uid}/settings`;

      const snapshot = await db.collection(COLLECTION_NAME).get();
      snapshot.docs.map((doc) => {
        this.settingsId = doc.id || undefined;
        const data = doc.data();
        this.role = data.role || 2;
        this.language = data.language || 'en';
      });

      return this.convertRole(this.role);
    },
    updateUserDisplayName(event) {
      if (this.user) {
        this.user.updateProfile({displayName: event.target.value});
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
      const data = {
        language: event.target.value,
      };

      updateDocumentFieldForCurrentUser({
        collection: 'settings',
        document: this.settingsId,
        data,
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
