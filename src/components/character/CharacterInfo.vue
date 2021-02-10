<template>
  <div class="character-info">
    <h2>Info</h2>
    <div>
      <span>
        Name:
      </span>
      <span>
        {{ info.name }}
      </span>
    </div>
    <div>
      <span>
        Class:
      </span>
      <span>
        {{ info.class }}
      </span>
    </div>
    <div>
      <span>
        Race:
      </span>
      <span>
        {{ info.race }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterInfo',
  props: {
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
