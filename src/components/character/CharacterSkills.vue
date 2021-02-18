<template>
  <div class="character-skills">
    <h2>Skills</h2>
    <ul class="character-skills-list">
      <li
        v-for="(skill, key) in skills"
        :key="key"
        class="character-skill"
      >
        <span class="character-skill__name">
          {{ key }}:
        </span>
        <WritableField
          class="character-skill__value"
          :data="{
            id,
            field: 'skills',
            value: skill,
            nestedField: key,
            document: 'characters',
          }"
        />
      </li>
    </ul>
  </div>
</template>

<script>
// Components
import WritableField from '@/components/WritableField';

export default {
  name: 'CharacterSkills',
  components: {
    WritableField,
  },
  props: {
    id: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    skills: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.character-skills {
  flex: 1 0 100%;
}

.character-skills-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.character-skill {
  flex: 1 0 50%;
  display: flex;
  flex-direction: row;
  max-width: 48%;
  margin: 5px 15px 5px 0;
  border-bottom: 1px solid #a2a2a2;
}

.character-skill__name {
  flex: 0 0 auto;
  text-transform: capitalize;
}

.character-skill__value {
  flex: 1 0 auto;
  text-align: right;
  padding: 0 10px 0 0;
}
</style>
