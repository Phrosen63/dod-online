<template>
  <div class="character-health">
    <h2>Character health</h2>
    <div class="character-health-wrapper">
      <div class="character-health__stats">
        <p class="character-health-stat">
          Total hp: {{ max }} / {{ half }}
        </p>
        <p class="character-health-stat">
          Head: {{ fourth }}
        </p>
        <p class="character-health-stat">
          Arms: {{ fourth }}
        </p>
        <p class="character-health-stat">
          Chest: {{ half }}
        </p>
        <p class="character-health-stat">
          Stomach: {{ third }}
        </p>
        <p class="character-health-stat">
          Legs: {{ third }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterHealth',
  computed: {
    selectedCharacter() {
      return this.$store.state.selectedCharacter;
    },
    max() {
      const physique = parseInt(this.selectedCharacter.stats.physique);
      const psyche = parseInt(this.selectedCharacter.stats.psyche);
      const size = parseInt(this.selectedCharacter.stats.size);
      return physique + psyche + size;
    },
    half() {
      return Math.floor(this.max / 2);
    },
    third() {
      return Math.floor(this.max / 3);
    },
    fourth() {
      return Math.floor(this.max / 4);
    },
  },
};
</script>

<style scoped>
.character-health {
  flex: 1 0 auto;
}

.character-health-stat {
  margin: 0 0 5px 0;
}

.character-health-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.character-health__stats {
  flex: 1 0 30%;
}
</style>
