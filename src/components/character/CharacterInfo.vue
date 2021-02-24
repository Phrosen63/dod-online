<template>
  <div class="character-info">
    <h2>Info</h2>
    <WritableField
      :data="{
        characterId,
        field: 'info',
        title: 'Name',
        value: info.name,
        nestedField: 'name',
        document: 'characters',
      }"
    />
    <WritableField
      :data="{
        characterId,
        field: 'info',
        title: 'Class',
        value: info.class,
        nestedField: 'class',
        document: 'characters',
      }"
    />
    <WritableField
      :data="{
        characterId,
        field: 'info',
        title: 'Race',
        value: info.race,
        nestedField: 'race',
        document: 'characters',
      }"
    />
  </div>
</template>

<script>
// Components
import WritableField from '@/components/WritableField';

export default {
  name: 'CharacterInfo',
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
    info: {
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
.character-info span {
  font-size: 18px;
}
</style>
