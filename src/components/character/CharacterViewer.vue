<template>
  <div class="character-viewer">
    <div class="character-viewer-wrapper">
      <CharacterInfo :info="character.info || {}" />
      <CharacterStats :stats="character.stats || []" />
    </div>
    <CharacterInventory :inventory="character.inventory || {}" />
    <CharacterSkills :skills="character.skills || {}" />
  </div>
</template>

<script>
// Components
import CharacterInfo from '@/components/character/CharacterInfo';
import CharacterInventory from '@/components/character/CharacterInventory';
import CharacterStats from '@/components/character/CharacterStats';
import CharacterSkills from '@/components/character/CharacterSkills';

export default {
  name: 'CharacterViewer',
  components: {
    CharacterInfo,
    CharacterInventory,
    CharacterStats,
    CharacterSkills,
  },
  props: {
    character: {
      default: undefined,
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.character-viewer {
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  padding: 20px;
}

.character-viewer-wrapper {
  flex: 0 0 30%;
}
</style>
