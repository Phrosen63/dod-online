<template>
  <div class="characters-list">
    <ul>
      <li v-for="(character, key) in characters" :key="key">
        {{ character.name }}
        {{ character.class }}
        {{ character.race }}
        {{ character.inventory }}
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '@/api/db';

export default {
  name: 'CharacterList',
  data() {
    return {
      userId: undefined,
      characters: undefined,
    };
  },
  created() {
    const currentUser = this.$store.state.user;
    this.userId = currentUser.uid;

    this.getCharacters(this.userId);
  },
  methods: {
    async getCharacters(uid) {
      if (uid) {
        const COLLECTION_NAME = `/users/${uid}/characters`;
        const snapshot = await db.collection(COLLECTION_NAME).get()
        this.characters = snapshot.docs.map(doc => doc.data());
      }
    }
  },
}
</script>

<style scoped>

</style>
