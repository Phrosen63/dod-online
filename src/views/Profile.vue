<template>
  <div class="profile">
    <h1>Profile</h1>
    <pulse-loader
      v-if="loading"
      class="spinner"
      :size="size"
      :color="color"
    />
    <div class="profile-info">
      <div>
        <label>User name:</label>
        <input
          type="text"
          :value="user.displayName"
          class="hidden-textfield"
          title="Click to edit"
          @focus="$event.target.select()"
          @change="updateUserDisplayName($event)"
        >
      </div>
      <p>Email: <span>{{ user.email }}</span></p>
      <p>Role: <span>{{ role }}</span></p>
    </div>
  </div>
</template>

<script>
// Modules
import { db } from '@/api/database/db';
import { getFirebaseUser } from '@/api/database/user';
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min';

export default {
  name: 'Profile',
  components: {
    PulseLoader,
  },
  data() {
    return {
      user: {},
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
    }
  },
};
</script>

<style scoped>
.profile {
  width: 80%;
  margin: 100px auto;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  min-height: 500px;
}
</style>

