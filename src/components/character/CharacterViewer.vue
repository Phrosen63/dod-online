<template>
  <div class="character-viewer">
    <div class="character-viewer-wrapper">
      <CharacterInfo
        :character-id="character.characterId"
        :info="character.info || {}"
      />
      <CharacterStats
        :character-id="character.characterId"
        :stats="character.stats || {}"
      />
    </div>
    <CharacterHealth
      :character-id="character.characterId"
      :stats="character.stats || {}"
    />
    <CharacterInventory
      :character-id="character.characterId"
      :inventory="character.inventory || []"
    />
    <CharacterSkills
      :character-id="character.characterId"
      :skills="character.skills || []"
    />
    <CharacterNotes
      :key="character.characterId"
      :character-id="character.characterId"
      :notes="character.notes || []"
    />
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
