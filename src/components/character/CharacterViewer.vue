<template>
  <div class="character-viewer">
    <div class="character-viewer-wrapper">
      <CharacterInfo
        :id="character.id"
        :info="character.info || {}"
      />
      <CharacterStats
        :id="character.id"
        :stats="character.stats || {}"
      />
    </div>
    <CharacterInventory
      :id="character.id"
      :inventory="character.inventory || {}"
    />
    <CharacterSkills
      :id="character.id"
      :skills="character.skills || {}"
    />
    <CharacterNotes
      :id="character.id"
      :key="character.id"
      :notes="character.notes || {}"
    />
  </div>
</template>

<script>
// Components
import CharacterInfo from '@/components/character/CharacterInfo';
import CharacterInventory from '@/components/character/CharacterInventory';
import CharacterStats from '@/components/character/CharacterStats';
import CharacterSkills from '@/components/character/CharacterSkills';
import CharacterNotes from '@/components/character/CharacterNotes';

export default {
  name: 'CharacterViewer',
  components: {
    CharacterInfo,
    CharacterInventory,
    CharacterStats,
    CharacterSkills,
    CharacterNotes,
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
  flex: 1 0 80%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
}

.character-viewer-wrapper {
  flex: 0 0 30%;
}
</style>
