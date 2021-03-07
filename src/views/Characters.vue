<template>
  <div class="characters  view-window">
    <pulse-loader
      v-if="loading"
      class="spinner"
      :size="size"
      :color="color"
    />
    <template v-else>
      <h1>{{ $t('characters') }}</h1>
      <p class="preamble">
        ~ {{ $t('click_to_edit') }} ~
      </p>
      <div class="characters-wrapper">
        <CharacterList />
        <CharacterViewer />
      </div>
    </template>
  </div>
</template>

<script>
// Components
import CharacterList from '@/components/character/CharacterList';
import CharacterViewer from '@/components/character/CharacterViewer';

// Modules
import { db } from '@/api/database/db';
import { getFirebaseUser } from '@/api/database/user';
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min';

export default {
  name: 'Characters',
  components: {
    CharacterList,
    CharacterViewer,
    PulseLoader,
  },
  data() {
    return {
      loading: true,
      color: '#75a1de',
      size: '25px',
    };
  },
  async beforeCreate() {
    const currentUser = await getFirebaseUser();
    const { uid } = currentUser;

    if (uid) {
      const characterCollection = `/users/${uid}/characters`;
      const snapshot = await db.collection(characterCollection).get();
      const chars = snapshot.docs.map((doc) => doc.data());

      for (let i = 0; i < snapshot.docs.length; i += 1) {
        // Character id
        const characterId = snapshot.docs[i].id;
        chars[i].id = characterId;

        // Notes
        const notesCollection = `/users/${uid}/characters/${characterId}/notes`;
        const notesSnapshot = await db.collection(notesCollection).get();

        const notes = notesSnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < notesSnapshot.docs.length; i += 1) {
          const noteId = notesSnapshot.docs[i].id;
          notes[i].id = noteId;
        }
        chars[i].notes = notes;

        // Inventory
        const inventoryCollection = `/users/${uid}/characters/${characterId}/inventory`;
        const inventorySnapshot = await db.collection(inventoryCollection).get();

        const inventory = inventorySnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < inventorySnapshot.docs.length; i += 1) {
          const inventoryId = inventorySnapshot.docs[i].id;
          inventory[i].id = inventoryId;
        }
        chars[i].inventory = inventory;

        // Armor
        const armorCollection = `/users/${uid}/characters/${characterId}/armor`;
        const armorSnapshot = await db.collection(armorCollection).get();

        const armor = armorSnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < armorSnapshot.docs.length; i += 1) {
          const armorId = armorSnapshot.docs[i].id;
          armor[i].id = armorId;
        }
        chars[i].armor = armor;

        // Skills
        const skillsCollection = `/users/${uid}/characters/${characterId}/skills`;
        const skillsSnapshot = await db.collection(skillsCollection).get();

        const skills = skillsSnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < skillsSnapshot.docs.length; i += 1) {
          const skillsId = skillsSnapshot.docs[i].id;
          skills[i].id = skillsId;
        }
        chars[i].skills = skills;

        // Wealth
        const wealthCollection = `/users/${uid}/characters/${characterId}/wealth`;
        const wealthSnapshot = await db.collection(wealthCollection).get();

        const wealth = wealthSnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < wealthSnapshot.docs.length; i += 1) {
          const wealthId = wealthSnapshot.docs[i].id;
          wealth[i].id = wealthId;
        }
        chars[i].wealth = wealth;
      }
      this.$store.commit('setCharacterList', chars);
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.characters > h1 {
  margin: 22px 0 10px 0;
}

.characters-wrapper {
  display: flex;
  flex-direction: row;
}
</style>
