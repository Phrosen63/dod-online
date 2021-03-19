<template>
  <div class="users view-window">
    <pulse-loader
      v-if="loading"
      class="spinner"
      :size="size"
      :color="color"
    />
    <template v-else>
      <h1>{{ $t('users') }}</h1>
      <div class="grid">
        <div class="row">
          <div class="col-3">
            <h2>{{ $t('users') }}</h2>
            <ul class="user-list">
              <li
                v-for="user in list"
                :key="user.uid"
                class="user-list-item"
                :class="isSelected(user.uid)"
                @click="selectUser(user.uid)"
              >
                {{ user.displayName }}
              </li>
            </ul>
          </div>
          <div class="col-9">
            <pulse-loader
              v-if="userLoading"
              class="spinner"
              :size="size"
              :color="color"
            />
            <div v-else>
              <h2>{{ $t('characters') }}</h2>
              <ul
                v-if="selectedUser"
                class="character-list"
              >
                <li
                  v-for="character in selectedUser.characters"
                  :key="getCharacterKey(character.info.name)"
                  class="character-list-item"
                >
                  <div class="grid">
                    <div class="row">
                      <div class="col-4">
                        <p>
                          {{ $t('name') }}: {{ character.info.name }}
                        </p>
                        <p>
                          {{ $t('race') }}: {{ character.info.race }}
                        </p>
                        <p>
                          {{ $t('class') }}: {{ character.info.class }}
                        </p>
                      </div>
                      <div class="col-8">
                        <ul class="stats-list">
                          <li
                            v-for="(stat, key) in character.stats"
                            :key="key"
                            class="stats-list-item"
                          >
                            <p class="stat">
                              {{ $t(key.toLowerCase()) }}: {{ stat }}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// Modules
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min';
import { db } from '@/api/database/db';

export default {
  name: 'Users',
  components: {
    PulseLoader,
  },
  data() {
    return {
      loading: true,
      userLoading: false,
      color: '#75a1de',
      size: '25px',
      list: [],
      selectedUser: undefined,
    };
  },
  async created() {
    const USERS_COLLECTION = `/users/`;
    const snapshot = await db.collection(USERS_COLLECTION).get();
    const userIds = snapshot.docs.map((doc) => doc.id);

    userIds.forEach(async uid => {
      const CHARACTERS_COLLECTION = `/users/${uid}/characters`;
      const characterSnapshot = await db.collection(CHARACTERS_COLLECTION).get();
      const characters = characterSnapshot.docs.map((doc) => doc.data());

      const SETTINGS_COLLECTION = `/users/${uid}/settings`;
      const settingsSnapshot = await db.collection(SETTINGS_COLLECTION).get();
      const settingId = settingsSnapshot.docs.map((doc) => doc.id)[0];

      const docRef = await db.collection(SETTINGS_COLLECTION).doc(settingId);
      const settingsDocRef = await docRef.get();
      const displayName = settingsDocRef.data().displayName || uid;

      this.list.push({
        uid,
        displayName,
        characters,
        settingId,
        selected: false,
      })
    });

    this.loading = false;
  },
  methods: {
    selectUser(uid) {
      this.userLoading = true;
      this.selectedUser = this.list.find(user => user.uid === uid);

      this.list.forEach(user => user.selected = false);
      this.selectedUser.selected = true;

      this.userLoading = false;
    },
    isSelected(uid) {
      return this.selectedUser && this.selectedUser.uid === uid ? 'user-list-item--selected' : '';
    },
    getCharacterKey(characterName) {
      return `${this.selectedUser.uid}_${characterName}`;
    },
  },
};
</script>

<style scoped>
.user-list-item {
  cursor: pointer;
  margin: 10px 0;
}

.user-list-item--selected {
  font-weight: bold;
  background-color: #ffeac4;
}

.user-list-item:hover {
  background-color: #ffeac4;
}

.character-list-item {
  background-color: #b5cdef;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
}

.character-list-item:first-of-type {
  margin: 0 0 10px 0;
}

.stat {
  margin: 5px 0;
}
</style>
