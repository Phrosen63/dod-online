<template>
  <div class="console">
    <div
      id="consoleWindow"
      ref="consoleWindow"
      class="console-window"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
      >
        <span>
          {{ item.user }} rolled: {{ item.value }}, with a: {{ item.dice }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// Modules
import { db } from '@/api/db';

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
    .onSnapshot((doc) => {
      this.items.push({
        user: doc.data().user,
        value: doc.data().value,
        dice: doc.data().dice,
      });
    });
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
  background-color: black;
  background-image:
    radial-gradient(
      rgba(0, 150, 0, 0.75),
      black 120%
    );
  color: white;
  font: 1.3rem Inconsolata, monospace;
  text-shadow: 0 0 5px #c8c8c8;
}

.console-window::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    repeating-linear-gradient(
      0deg,
      rgba(black, 0.15),
      rgba(black, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
}

.console-window::selection {
  background: #0080ff;
  text-shadow: none;
}
</style>
