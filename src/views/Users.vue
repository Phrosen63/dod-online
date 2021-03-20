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
            <UserList
              :list="list"
              @userSelected="selectUser($event)"
            />
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
              <UserCharactersList
                v-if="selectedUser"
                :characters="selectedUser.characters"
                :uid="selectedUser.uid"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// Components
import UserList from '@/components/users/UserList';
import UserCharactersList from '@/components/users/UserCharactersList';

// Modules
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min';
import { db } from '@/api/database/db';

export default {
  name: 'Users',
  components: {
    PulseLoader,
    UserList,
    UserCharactersList,
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

    // Characters
    userIds.forEach(async uid => {
      const CHARACTERS_COLLECTION = `/users/${uid}/characters`;
      const characterSnapshot = await db.collection(CHARACTERS_COLLECTION).get();
      const characters = characterSnapshot.docs.map((doc) => doc.data());

      for (let i = 0; i < characterSnapshot.docs.length; i += 1) {
        // Character id
        const characterId = characterSnapshot.docs[i].id;
        characters[i].id = characterId;
      }

      // Settings
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
    selectUser(e) {
      const uid = e;
      this.userLoading = true;
      this.selectedUser = this.list.find(user => user.uid === uid);

      this.list.forEach(user => user.selected = false);
      this.selectedUser.selected = true;

      this.userLoading = false;
    },
  },
};
</script>
