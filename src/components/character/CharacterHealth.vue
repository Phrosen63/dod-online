<template>
  <div class="character-health">
    <h2>{{ $t('health') }}</h2>
    <p class="preamble">
      {{ $t('health_info') }}
    </p>
    <div class="character-health-wrapper">
      <div class="character-health__stats">
        <p class="character-health-stat">
          {{ $t('total_hp') }}: {{ max }} / {{ half }}
        </p>
        <p class="character-health-stat">
          {{ $t('head') }}: {{ fourth }}
        </p>
        <p class="character-health-stat">
          {{ `${$t('left')} ${$t('arm')}` }}: {{ fourth }}
        </p>
        <p class="character-health-stat">
          {{ `${$t('right')} ${$t('arm')}` }}: {{ fourth }}
        </p>
        <p class="character-health-stat">
          {{ $t('chest') }}: {{ half }}
        </p>
        <p class="character-health-stat">
          {{ $t('stomach') }}: {{ third }}
        </p>
        <p class="character-health-stat">
          {{ `${$t('left')} ${$t('leg')}` }}: {{ third }}
        </p>
        <p class="character-health-stat">
          {{ `${$t('right')} ${$t('leg')}` }}: {{ third }}
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
  flex: 0 1 auto;
}

.character-health > .preamble {
  text-align: left;
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
