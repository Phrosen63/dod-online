<template>
  <div class="characters view-window">
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
      <div class="grid">
        <div class="row">
          <CharacterList />
          <CharacterViewer />
        </div>
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
      const CHARACTER_COLLECTION = `/users/${uid}/characters`;
      const snapshot = await db.collection(CHARACTER_COLLECTION).get();
      const characters = snapshot.docs.map((doc) => doc.data());

      for (let i = 0; i < snapshot.docs.length; i += 1) {
        // Character id
        const characterId = snapshot.docs[i].id;
        characters[i].id = characterId;
        characters[i].uid = uid;

        // Notes
        const NOTES_COLLECTION = `/users/${uid}/characters/${characterId}/notes`;
        const notesSnapshot = await db.collection(NOTES_COLLECTION).get();

        const notes = notesSnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < notesSnapshot.docs.length; i += 1) {
          const noteId = notesSnapshot.docs[i].id;
          notes[i].id = noteId;
        }
        characters[i].notes = notes;

        // Inventory
        const INVENTORY_COLLECTION = `/users/${uid}/characters/${characterId}/inventory`;
        const inventorySnapshot = await db.collection(INVENTORY_COLLECTION).get();

        const inventory = inventorySnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < inventorySnapshot.docs.length; i += 1) {
          const inventoryId = inventorySnapshot.docs[i].id;
          inventory[i].id = inventoryId;
        }
        characters[i].inventory = inventory;

        // Injuries
        const INJURIES_COLLECTION = `/users/${uid}/characters/${characterId}/injuries`;
        const injuriesSnapshot = await db.collection(INJURIES_COLLECTION).get();

        const injuries = injuriesSnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < injuriesSnapshot.docs.length; i += 1) {
          const injuriesId = injuriesSnapshot.docs[i].id;
          injuries[i].id = injuriesId;
        }
        characters[i].injuries = injuries;

        // Armor
        const ARMOR_COLLECTION = `/users/${uid}/characters/${characterId}/armor`;
        const armorSnapshot = await db.collection(ARMOR_COLLECTION).get();

        const armor = armorSnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < armorSnapshot.docs.length; i += 1) {
          const armorId = armorSnapshot.docs[i].id;
          armor[i].id = armorId;
        }
        characters[i].armor = armor;

        // Skills
        const SKILLS_COLLECTION = `/users/${uid}/characters/${characterId}/skills`;
        const skillsSnapshot = await db.collection(SKILLS_COLLECTION).get();

        const skills = skillsSnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < skillsSnapshot.docs.length; i += 1) {
          const skillsId = skillsSnapshot.docs[i].id;
          skills[i].id = skillsId;
        }
        characters[i].skills = skills;

        // Wealth
        const WEALTH_COLLECTION = `/users/${uid}/characters/${characterId}/wealth`;
        const wealthSnapshot = await db.collection(WEALTH_COLLECTION).get();

        const wealth = wealthSnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < wealthSnapshot.docs.length; i += 1) {
          const wealthId = wealthSnapshot.docs[i].id;
          wealth[i].id = wealthId;
        }
        characters[i].wealth = wealth;

        // Magic/Prayers
        const MAGIC_COLLECTION = `/users/${uid}/characters/${characterId}/magic`;
        const magicSnapshot = await db.collection(MAGIC_COLLECTION).get();

        const magic = magicSnapshot.docs.map((doc) => doc.data());
        for (let i = 0; i < magicSnapshot.docs.length; i += 1) {
          const magicId = magicSnapshot.docs[i].id;
          magic[i].id = magicId;
        }
        characters[i].magic = magic;
      }
      this.$store.commit('setCharacterList', characters);
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.characters > h1 {
  margin: 22px 0 10px 0;
}
</style>
