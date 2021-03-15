<template>
  <div
    v-if="selectedCharacter"
    class="character-viewer"
  >
    <vue-tabs>
      <v-tab :title="$t('front')">
        <div class="character-viewer-wrapper">
          <CharacterInfo />
          <CharacterStats />
          <CharacterWealth />
        </div>
        <CharacterSkills />
      </v-tab>
      <v-tab :title="$t('back')">
        <CharacterInventory />
        <div class="character-viewer-wrapper">
          <CharacterHealth />
        </div>
        <CharacterArmor />
        <CharacterNotes />
      </v-tab>
    </vue-tabs>
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
  },
  computed: {
    selectedCharacter() {
      return this.$store.state.selectedCharacter;
    },
  },
};
</script>

<style scoped>
.character-viewer {
  display: flex;
  flex: 1 0 80%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
}

.character-viewer-wrapper {
  flex: 1 0 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #a2a2a2;
  padding: 0 0 25px 0;
}
</style>
