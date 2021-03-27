<template>
  <div class="character-health">
    <h2>{{ $t('health') }}</h2>
    <div class="character-health-row">
      <div class="character-health__image">
        <img
          src="@/assets/humanoid.svg"
          alt="The drawing of a human silhouette"
          class="character-health__image--human"
        >
      </div>
      <div class="character-health-wrapper">
        <p class="preamble">
          {{ $t('health_info') }}
        </p>
        <div class="character-health__stats">
          <div class="character-health-heading-wrapper">
            <h3 class="character-health-heading">
              {{ $t('hp') }}
            </h3>
            <h3 class="character-health-heading">
              {{ $t('injuries') }}
            </h3>
          </div>
          <div
            v-for="bodypart in bodyparts"
            :key="bodypart.key"
            class="character-health-heading-wrapper"
          >
            <p class="character-health-stat">
              {{ bodypart.fieldName }} : {{ bodypart.value }}
            </p>
            <input
              type="text"
              class="hidden-textfield hidden-textfield--injury"
              :title="$t('title_click_to_edit')"
              :value="getInjuryValue(bodypart.key)"
              @focus="$event.target.select()"
              @change="updateText(bodypart.key, $event)"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Modules
import { writeObject } from '@/api/database/write';

export default {
  name: 'CharacterHealth',
  data() {
    return {
      bodyparts: [],
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
    health() {
      const physique = parseInt(this.selectedCharacter.stats.physique);
      const psyche = parseInt(this.selectedCharacter.stats.psyche);
      const size = parseInt(this.selectedCharacter.stats.size);
      const max = physique + psyche + size;

      return {
        max: max,
        half: Math.floor(max / 2),
        third: Math.floor(max / 3),
        fourth: Math.floor(max / 4),
      };
    },
  },
  created() {
    this.bodyparts.push({
      key: 'total',
      value: `${this.health.max} / ${this.health.half}`,
      fieldName: this.$t('total_hp'),
    });
    this.bodyparts.push({
      key: 'head',
      value: this.health.fourth,
      fieldName: this.$t('head'),
    });
    this.bodyparts.push({
      key: 'leftArm',
      value: this.health.fourth,
      fieldName: `${this.$t('left')} ${this.$t('arm')}`,
    });
    this.bodyparts.push({
      key: 'rightArm',
      value: this.health.fourth,
      fieldName: `${this.$t('right')} ${this.$t('arm')}`,
    });
    this.bodyparts.push({
      key: 'chest',
      value: this.health.half,
      fieldName: this.$t('chest'),
    });
    this.bodyparts.push({
      key: 'stomach',
      value: this.health.third,
      fieldName: this.$t('stomach'),
    });
    this.bodyparts.push({
      key: 'leftLeg',
      value: this.health.third,
      fieldName: `${this.$t('left')} ${this.$t('leg')}`,
    });
    this.bodyparts.push({
      key: 'rightLeg',
      value: this.health.third,
      fieldName: `${this.$t('right')} ${this.$t('leg')}`,
    });
  },
  methods: {
    getQuery() {
      const query = this.$route.query;
      return query ? {
        uid: query.uid || undefined,
        characterId: query.characterId || undefined,
      } : undefined;
    },
    getCollectionPath() {
      if (this.selectedCharacter.uid && this.selectedCharacter.id) {
        return `users/${this.selectedCharacter.uid}/characters/${this.selectedCharacter.id}/injuries`;
      }
      return undefined;
    },
    updateText(key, event) {
      const INJURIES_COLLECTION = this.getCollectionPath();

      if (INJURIES_COLLECTION) {
        const data = {
          uid: this.selectedCharacter.uid,
        };
        data[key] = event.target.value;

        writeObject({
          collectionPath: INJURIES_COLLECTION,
          document: key,
          data,
        });
      }
    },
    getInjuryValue(key) {
      const obj = this.selectedCharacter.injuries.find(bodypart => bodypart.id === key);
      return obj ? obj[key] : '0';
    },
  },
};
</script>

<style scoped>
.character-health {
  flex: 0 1 auto;
}

.character-health-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.character-health > .preamble {
  text-align: left;
}

.character-health-stat {
  margin: 0 0 5px 0;
}

.character-health-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.character-health__stats {
  flex: 1 0 auto;
  max-width: 460px;
}

.character-health__injuries {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
}

.character-health__image {
  flex: 0 0 auto;
  margin: 0 25px 0 0;
}

.character-health__image--human {
  height: 350px;
}

.character-health-heading-wrapper {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  max-width: 460px;
}

.character-health-heading {
  flex: 1 0 auto;
}

.character-health-stat-wrapper {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  max-width: 460px;
}

.character-health-stat-wrapper:hover {
  background-color: #ffeac4;
}

.hidden-textfield--injury {
  border-bottom: 1px dashed;
}

.character-health-stat-wrapper:hover > .hidden-textfield--injury {
  background-color: #ffeac4;
}
</style>
