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
          <div class="col-4">
            <ul>
              <li
                v-for="user in list"
                :key="user.uid"
              >
                {{ user.displayName }}
              </li>
            </ul>
          </div>
          <div class="col-8">
            col-8
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
      color: '#75a1de',
      size: '25px',
      list: [],
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
      })
    });

    this.loading = false;
  },
};
</script>
