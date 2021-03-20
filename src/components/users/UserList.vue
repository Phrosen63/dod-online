<template>
  <ul class="user-list">
    <li
      v-for="user in list"
      :key="user.uid"
      class="user-list-item"
      :class="isSelected(user.uid)"
      @click="$emit('userSelected', user.uid)"
    >
      {{ user.displayName }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    list: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  methods: {
    isSelected(uid) {
      return this.selectedUser && this.selectedUser.uid === uid ? 'user-list-item--selected' : '';
    },
  },
};
</script>

<style scoped>
.user-list-item {
  cursor: pointer;
  margin: 10px 0;
}

.user-list-item--selected {
  font-weight: bold;
  background-color: #ffeac4;
}

.user-list-item:hover {
  background-color: #ffeac4;
}
</style>
