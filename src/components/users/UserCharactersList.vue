<template>
  <ul class="character-list">
    <li
      v-for="character in characters"
      :key="getCharacterKey(character.info.name)"
      class="character-list-item"
    >
      <div class="grid">
        <div class="row">
          <div class="col-4">
            <p>
              {{ $t('name') }}: {{ character.info.name }}
            </p>
            <p>
              {{ $t('race') }}: {{ character.info.race }}
            </p>
            <p>
              {{ $t('class') }}: {{ character.info.class }}
            </p>
            <router-link
              :to="{
                path: '/characters',
                query: {
                  uid,
                  characterId: character.id,
                },
              }"
            >
              {{ $t('view_character_details') }}
            </router-link>
          </div>
          <div class="col-8">
            <UserCharacterStatsList :stats="character.stats" />
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
// Components
import UserCharacterStatsList from '@/components/users/UserCharacterStatsList';

export default {
  name: 'UserCharactersList',
  components: {
    UserCharacterStatsList,
  },
  props: {
    characters: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    uid: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
  },
  methods: {
    getCharacterKey(characterName) {
      return `${this.uid}_${characterName}`;
    },
  },
};
</script>

<style scoped>
.character-list-item {
  background-color: #b5cdef;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
}

.character-list-item:first-of-type {
  margin: 0 0 10px 0;
}
</style>
