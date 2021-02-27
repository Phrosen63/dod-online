<template>
  <div class="character-health">
    <h2>Character health</h2>
    <div class="character-health-wrapper">
      <div class="character-health__stats">
        <p class="character-health-stat">
          Total hp: {{ health.max }} / {{ health.half }}
        </p>
        <p class="character-health-stat">
          Head: {{ health.fourth }}
        </p>
        <p class="character-health-stat">
          Arms: {{ health.fourth }}
        </p>
        <p class="character-health-stat">
          Chest: {{ health.half }}
        </p>
        <p class="character-health-stat">
          Stomach: {{ health.third }}
        </p>
        <p class="character-health-stat">
          Legs: {{ health.third }}
        </p>
      </div>
      <div class="character-health__image">
        <img
          src="@/assets/human.svg"
          alt="The drawing of a human silhouette"
          class="character-health__image--human"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterHealth',
  props: {
    characterId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    stats: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      health: {},
    };
  },
  created() {
    const physique = parseInt(this.stats.physique);
    const psyche = parseInt(this.stats.psyche);
    const size = parseInt(this.stats.size);

    this.health.max = physique + psyche + size;
    this.health.half = Math.floor(this.health.max / 2);
    this.health.third = Math.floor(this.health.max / 3);
    this.health.fourth = Math.floor(this.health.max / 4);
  },
};
</script>

<style scoped>
.character-health {
  flex: 1 0 70%;
}

.character-health-stat {
  margin: 0 0 5px 0;
}

.character-health-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.character-health__stats {
  flex: 1 0 30%;
}

.character-health__image {
  flex: 1 0 70%;
}

.character-health__image--human {
  height: 350px;
}
</style>
