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
      class="grid profile-info"
    >
      <div class="row">
        <div class="col-6">
          <label
            for="field_UserName"
            class="profile-info__label profile-info__user-name"
          >
            {{ $t('user_name') }}:
          </label>
          <input
            id="field_UserName"
            type="text"
            class="hidden-textfield"
            :value="displayName"
            :title="$t('title_click_to_edit')"
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
        <div class="col-6">
          <p
            v-if="isModeratorOrAdmin"
            class="preamble"
          >
            {{ $t('admin_settings') }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <p>{{ $t('email') }}: <span>{{ email }}</span></p>
        </div>
        <div class="col-6">
          <div
            v-if="isModeratorOrAdmin"
            class="profile-enable-user"
          >
            <input
              ref="enableUserInput"
              v-model="newUserId"
              class="profile-enable-user__input"
              type="text"
              placeholder="User id"
            >
            <button
              class="profile-enable-user__button"
              @click="enableUser"
            >
              {{ $t('enable_user') }}
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <p>{{ $t('role') }}: <span>{{ role }}</span></p>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
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
  </div>
</template>

<script>
// Modules
import { getFirebaseUser } from '@/api/database/user';
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min';
import { generateName } from '@/api/randomNameGenerator';
import { addUserDocument, updateDocument } from '@/api/database/write';

export default {
  name: 'Profile',
  components: {
    PulseLoader,
  },
  data() {
    return {
      newUserId: undefined,
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
    isModeratorOrAdmin() {
      return this.$store.state.settings.role < 3;
    }
  },
  created() {
    this.language = this.$store.state.settings.language;
    this.loading = false;
  },
  methods: {
    async getCollectionPath() {
      const currentUser = await getFirebaseUser();
      if (currentUser && currentUser.uid) {
        return `users/${currentUser.uid}/settings/`;
      }
      return undefined;
    },
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
      const SETTINGS_COLLECTION = await this.getCollectionPath();

      if (currentUser && SETTINGS_COLLECTION) {
        const newDisplayName = event.target.value;
        currentUser.updateProfile({displayName: newDisplayName});

        updateDocument({
          collectionPath: SETTINGS_COLLECTION,
          document: this.settingsId,
          data: {
            displayName: newDisplayName,
          },
        }).then(() => {
          this.$store.commit('updateUserDisplayName', {
            data: {
              value: newDisplayName,
            },
          });
        }).catch(e => console.log('Error: ' + e));
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
    },
    async languageUpdated(event) {
      const SETTINGS_COLLECTION = await this.getCollectionPath();

      if (SETTINGS_COLLECTION) {
        const value = event.target.value;
        const data = {
          language: value,
        };
  
        updateDocument({
          collectionPath: SETTINGS_COLLECTION,
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
      }
    },
    async enableUser() {
      if (this.newUserId.length === 28) {
        await addUserDocument(this.newUserId);
        this.$refs.enableUserInput.value = '';
      }
    },
  },
};
</script>

<style scoped>
.profile p {
  margin: 5px 0;
}

.profile-info__label {
  font-size: 18px;
}

.profile-info__random-name-button {
  cursor: pointer;
}

.profile-enable-user {
  display: flex;
  flex-direction: row;
  margin: 18px 0;
}

.profile-enable-user__input {
  flex: 1 0 auto;
  max-width: 400px;
  height: 40px;
  padding: 0 5px;
  font-size: 22px;
  margin: 0 5px 0 0;
}

.profile-enable-user__button {
  flex: 0 0 auto;
  padding: 0 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
