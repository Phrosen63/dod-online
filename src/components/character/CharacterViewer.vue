<template>
  <div
    v-if="selectedCharacter"
    class="character-viewer"
  >
    <div class="character-viewer-wrapper">
      <CharacterInfo />
      <CharacterStats />
    </div>
    <CharacterHealth />
    <CharacterInventory />
    <CharacterSkills />
    <CharacterNotes />
  </div>
</template>

<script>
// Components
import CharacterInfo from '@/components/character/CharacterInfo';
import CharacterStats from '@/components/character/CharacterStats';
import CharacterHealth from '@/components/character/CharacterHealth';
import CharacterInventory from '@/components/character/CharacterInventory';
import CharacterSkills from '@/components/character/CharacterSkills';
import CharacterNotes from '@/components/character/CharacterNotes';

export default {
  name: 'CharacterViewer',
  components: {
    CharacterInfo,
    CharacterStats,
    CharacterHealth,
    CharacterInventory,
    CharacterSkills,
    CharacterNotes,
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
  flex: 0 0 30%;
}
</style>
