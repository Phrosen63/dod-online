<template>
  <div class="col-10">
    <pulse-loader
      v-if="loading"
      class="spinner"
      :size="size"
      :color="color"
    /> 
    <div v-else-if="!loading && selectedCharacter">
      <vue-tabs>
        <v-tab :title="$t('front')">
          <div class="grid">
            <div class="row character-viewer-wrapper">
              <div class="col-3">
                <CharacterInfo />
              </div>
              <div class="col-3">
                <CharacterStats />
              </div>
              <div class="col-6">
                <CharacterWealth />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <CharacterSkills />
              </div>
            </div>
          </div>
        </v-tab>
        <v-tab :title="$t('back')">
          <div class="grid">
            <div class="row character-viewer-wrapper">
              <div class="col-12">
                <CharacterInventory />
              </div>
            </div>
            <div class="row character-viewer-wrapper">
              <div class="col-12">
                <CharacterHealth />
              </div>
            </div>
            <div class="row character-viewer-wrapper">
              <div class="col-12">
                <CharacterArmor />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <CharacterNotes />
              </div>
            </div>
          </div>
        </v-tab>
      </vue-tabs>
    </div>
  </div>
</template>

<script>
// Components
import CharacterInfo from '@/components/character/CharacterInfo';
import CharacterStats from '@/components/character/CharacterStats';
import CharacterWealth from '@/components/character/CharacterWealth';
import CharacterArmor from '@/components/character/CharacterArmor';
import CharacterHealth from '@/components/character/CharacterHealth';
import CharacterInventory from '@/components/character/CharacterInventory';
import CharacterSkills from '@/components/character/CharacterSkills';
import CharacterNotes from '@/components/character/CharacterNotes';

// Modules
import {VueTabs, VTab} from 'vue-nav-tabs';

// Modules
import { db } from '@/api/database/db';
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min';

export default {
  name: 'CharacterViewer',
  components: {
    CharacterInfo,
    CharacterStats,
    CharacterWealth,
    CharacterArmor,
    CharacterHealth,
    CharacterInventory,
    CharacterSkills,
    CharacterNotes,
    VueTabs,
    VTab,
    PulseLoader,
  },
  data() {
    return {
      loading: false,
      color: '#75a1de',
      size: '25px',
    };
  },
  computed: {
    selectedCharacter() {
      const query = this.getQuery();

      if (query.uid && query.characterId) {
        if (this.getSelectedCharacterId() !== query.characterId) {
          this.getCharacterById(query.uid, query.characterId);
        }
      }

      return this.$store.state.selectedCharacter;
    },
  },
  methods: {
    getQuery() {
      const query = this.$route.query;
      return query ? {
        uid: query.uid || undefined,
        characterId: query.characterId || undefined,
      } : undefined;
    },
    getSelectedCharacterId() {
      return this.$store.state.selectedCharacter ? this.$store.state.selectedCharacter.id : '';
    },
    async getCharacterById(uid, characterId) {
      this.loading = true;
      const selectedCharacter = [];
      selectedCharacter.id = characterId;

      const CHARACTER_COLLECTION = `/users/${uid}/characters/`;
      const docRef = await db.collection(CHARACTER_COLLECTION).doc(characterId);
      const characterDocRef = await docRef.get();

      // Info and Stats
      const info = characterDocRef.data().info;
      const stats = characterDocRef.data().stats;
      selectedCharacter.info = info;
      selectedCharacter.stats = stats;

      // Notes
      const NOTES_COLLECTION = `/users/${uid}/characters/${characterId}/notes`;
      const notesSnapshot = await db.collection(NOTES_COLLECTION).get();
      const notes = notesSnapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < notesSnapshot.docs.length; i += 1) {
        const noteId = notesSnapshot.docs[i].id;
        notes[i].id = noteId;
      }
      selectedCharacter.notes = notes;

      // Inventory
      const INVENTORY_COLLECTION = `/users/${uid}/characters/${characterId}/inventory`;
      const inventorySnapshot = await db.collection(INVENTORY_COLLECTION).get();
      const inventory = inventorySnapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < inventorySnapshot.docs.length; i += 1) {
        const inventoryId = inventorySnapshot.docs[i].id;
        inventory[i].id = inventoryId;
      }
      selectedCharacter.inventory = inventory;

      // Injuries
      const INJURIES_COLLECTION = `/users/${uid}/characters/${characterId}/injuries`;
      const injuriesSnapshot = await db.collection(INJURIES_COLLECTION).get();
      const injuries = injuriesSnapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < injuriesSnapshot.docs.length; i += 1) {
        const injuriesId = injuriesSnapshot.docs[i].id;
        injuries[i].id = injuriesId;
      }
      selectedCharacter.injuries = injuries;

      // Armor
      const ARMOR_COLLECTION = `/users/${uid}/characters/${characterId}/armor`;
      const armorSnapshot = await db.collection(ARMOR_COLLECTION).get();
      const armor = armorSnapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < armorSnapshot.docs.length; i += 1) {
        const armorId = armorSnapshot.docs[i].id;
        armor[i].id = armorId;
      }
      selectedCharacter.armor = armor;

      // Skills
      const SKILLS_COLLECTION = `/users/${uid}/characters/${characterId}/skills`;
      const skillsSnapshot = await db.collection(SKILLS_COLLECTION).get();
      const skills = skillsSnapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < skillsSnapshot.docs.length; i += 1) {
        const skillsId = skillsSnapshot.docs[i].id;
        skills[i].id = skillsId;
      }
      selectedCharacter.skills = skills;

      // Wealth
      const WEALTH_COLLECTION = `/users/${uid}/characters/${characterId}/wealth`;
      const wealthSnapshot = await db.collection(WEALTH_COLLECTION).get();
      const wealth = wealthSnapshot.docs.map((doc) => doc.data());
      for (let i = 0; i < wealthSnapshot.docs.length; i += 1) {
        const wealthId = wealthSnapshot.docs[i].id;
        wealth[i].id = wealthId;
      }
      selectedCharacter.wealth = wealth;

      this.$store.commit('setSelectedCharacter', selectedCharacter);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.character-viewer-wrapper {
  border-bottom: 1px solid #a2a2a2;
  padding: 0 0 25px 0;
}
</style>
