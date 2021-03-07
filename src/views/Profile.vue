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
        <label>{{ $t('user_name') }}:</label>
        <input
          v-model="displayName"
          type="text"
          class="hidden-textfield"
          title="Click to edit"
          @focus="$event.target.select()"
          @change="updateUserDisplayName($event)"
        >
        <button @click="generateRandomName">
          {{ $t('generate_random_name') }}
        </button>
      </div>
      <p>{{ $t('email') }}: <span>{{ user.email }}</span></p>
      <p>{{ $t('role') }}: <span>{{ role }}</span></p>
    </div>
  </div>
</template>

<script>
// Modules
import { db } from '@/api/database/db';
import { getFirebaseUser } from '@/api/database/user';
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min';
import { generateName } from '@/api/randomNameGenerator';

export default {
  name: 'Profile',
  components: {
    PulseLoader,
  },
  data() {
    return {
      user: {},
      displayName: undefined,
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
      const result = snapshot.docs.map((doc) => doc.data());
      const role = result[0].role;
      return this.convertRole(role);
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
  },
};
</script>
