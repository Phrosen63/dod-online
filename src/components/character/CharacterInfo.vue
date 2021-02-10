<template>
  <div class="character-info">
    <h2>Info</h2>
    <div>
      <span>
        Name:
      </span>
      <input
        type="text"
        :value="info.name"
        class="hidden-textfield"
        title="Click to edit"
        @focus="$event.target.select()"
        @change="updateText('name', $event)"
      >
    </div>
    <div>
      <span>
        Class:
      </span>
      <input
        type="text"
        :value="info.class"
        class="hidden-textfield"
        title="Click to edit"
        @focus="$event.target.select()"
        @change="updateText('class', $event)"
      >
    </div>
    <div>
      <span>
        Race:
      </span>
      <input
        type="text"
        :value="info.race"
        class="hidden-textfield"
        title="Click to edit"
        @focus="$event.target.select()"
        @change="updateText('race', $event)"
      >
    </div>
  </div>
</template>

<script>
// Modules
import { db } from '@/api/db';
import { getFirebaseUser } from '@/api/getUserData';

export default {
  name: 'CharacterInfo',
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
  methods: {
    async updateText(field, event) {
      const currentUser = await getFirebaseUser();
      const { uid } = currentUser;
      const COLLECTION_NAME = `/users/${uid}/characters/${this.id}/info`;
      const snapshot = await db.collection(COLLECTION_NAME).get();
      // const chars = snapshot.docs.map((doc) => doc.data());
      const chars = snapshot.docs.map((doc) => {
        console.log(doc.data());
        console.log(doc.getString('info'));
      });

      console.log(chars);

      console.log(COLLECTION_NAME);
      console.log(field);
      console.log(this.id);
      console.log(event.target.value);
    }
  },
};
</script>

<style scoped>
.character-info span {
  font-size: 18px;
}
</style>
