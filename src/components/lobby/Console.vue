<template>
  <div class="console">
    <div
      id="consoleWindow"
      ref="consoleWindow"
      class="console-window"
    >
      <p
        v-for="(item, index) in items"
        :key="index"
        class="console-message"
      >
        {{ item.message }}
      </p>
    </div>
  </div>
</template>

<script>
// Modules
import { db } from '@/api/database/db';

export default {
  name: 'Console',
  data() {
    return {
      items: [],
    };
  },
  async created() {
    // TODO: Create API for this particular listener
    db.collection("console").doc("shared")
    .onSnapshot((doc) => this.items.push({ message: doc.data().message }));
  },
};
</script>

<style scoped>
.console {
  flex: 1 0 auto;
}

.console-window {
  border-radius: 5px;
  position: relative;
  min-height: 400px;
  max-height: 400px;
  overflow-y: auto;
  background-color: #292826;
  padding: 10px;
  color: white;
  font-size: 20px;
  font-family: Inconsolata, monospace;
}

.console-window::selection {
  background: #0080ff;
  text-shadow: none;
}

.console-message {
  margin: 0 0 5px 0;
}
</style>
