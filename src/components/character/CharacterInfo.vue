<template>
  <div class="character-info">
    <h2>Info</h2>
    <div>
      <span>
        Name:
      </span>
      <WritableField
        :data="{
          id,
          field: 'info',
          value: info.name,
          nestedField: 'name',
          document: 'characters',
        }"
      />
    </div>
    <div>
      <span>
        Class:
      </span>
      <WritableField
        :data="{
          id,
          field: 'info',
          value: info.class,
          nestedField: 'class',
          document: 'characters',
        }"
      />
    </div>
    <div>
      <span>
        Race:
      </span>
      <WritableField
        :data="{
          id,
          field: 'info',
          value: info.race,
          nestedField: 'race',
          document: 'characters',
        }"
      />
    </div>
  </div>
</template>

<script>
// Components
import WritableField from '@/components/character/WritableField';

export default {
  name: 'CharacterInfo',
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
