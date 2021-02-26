<template>
  <div class="character-skills">
    <h2>Skills</h2>
    <ul class="character-skills-list">
      <li
        v-for="(skill, key) in skills"
        :key="key"
        class="character-skill"
      >
        <WritableField
          class="character-skill__value"
          :data="{
            characterId,
            field: 'skills',
            title: key,
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
    characterId: {
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
  max-width: 50%;
}

.character-skill__value {
  display: flex;
  flex-direction: row;
  margin: 0 15px 0 0;
  border-bottom: 1px solid #a2a2a2;
}

.character-skill__value >>> label {
  flex: 0 0 auto;
}

.character-skill__value >>> input {
  flex: 1 0 auto;
  text-align: right;
  padding: 0 10px 0 0;
}

</style>
