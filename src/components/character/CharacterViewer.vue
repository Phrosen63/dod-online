<template>
  <div
    v-if="selectedCharacter"
    class="col-10"
  >
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
.character-viewer-wrapper {
  border-bottom: 1px solid #a2a2a2;
  padding: 0 0 25px 0;
}
</style>
