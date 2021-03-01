<template>
  <div class="console">
    <div class="console-settings">
      <button
        class="console-settings__controls button--clear"
        @click="clearConsole"
      >
        Clear
      </button>
      <label
        class="console-settings__controls"
        for="autoscroll"
      >
        Autoscroll:
      </label>
      <input
        id="autoscroll"
        class="console-settings__controls"
        type="checkbox"
        checked
        @change="toggleAutoscroll($event)"
      >
    </div>
    <div
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
    <form
      class="console-message-bar"
      @submit.prevent
    >
      <input
        ref="messageBar"
        class="console-message-bar__input-field"
        type="text"
      >
      <input
        type="submit"
        class="console-message-bar__send-button"
        value="Send"
        @click="sendMessage"
      >
    </form>
  </div>
</template>

<script>
// Modules
import { db } from '@/api/database/db';
import { writeObject } from '@/api/database/write';
import { getUserDisplayName } from '@/api/database/user';

export default {
  name: 'Console',
  data() {
    return {
      items: [],
      autoScroll: true,
      userDisplayName: undefined,
      showMessages: false,
    };
  },
  computed: {
    customDiceRollListener() {
      return this.$store.state.customDiceRoll;
    },
  },
  watch: {
    customDiceRollListener(obj) {
      this.items.push({ message: obj.message });
    }
  },
  created() {
    this.userDisplayName = this.setUserDisplayName();
  },
  async mounted() {
    db.collection('console').doc('shared').onSnapshot((doc) => {
      if (this.showMessages) {
        this.items.push({ message: doc.data().message });
      }
      if (this.autoScroll && this.$refs.consoleWindow) {
        this.$nextTick(() => this.$refs.consoleWindow.scrollTop = this.$refs.consoleWindow.scrollHeight);
      }
      this.showMessages = true;
    });
  },
  methods: {
    async setUserDisplayName() {
      this.userDisplayName = await getUserDisplayName();
    },
    toggleAutoscroll(evt) {
      this.autoScroll = evt.target.checked;
    },
    sendMessage() {
      const value = this.$refs.messageBar.value;
      this.$refs.messageBar.value = '';
      if (value && value !== '') {
        writeObject('console', 'shared', {
          message: `${this.userDisplayName}: ${value}`,
        });        
      }
    },
    clearConsole() {
      this.$refs.consoleWindow.innerHTML = '';
    },
  },
};
</script>

<style scoped>
.console {
  flex: 1 0 80%;
}

.console-settings {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 0;
}

.console-settings__controls {
  cursor: pointer;
  font-size: 18px;
}

.button--clear {
  margin: 0 15px 0 0;
}

.console-window {
  border-radius: 5px;
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

.console-message-bar {
  display: flex;
  flex-direction: row;
  padding: 10px 0;
}

.console-message-bar__input-field {
  flex: 1 0 auto;
  height: 40px;
  padding: 0 5px;
  font-size: 22px;
  margin: 0 5px 0 0;
}

.console-message-bar__send-button {
  flex: 0 0 auto;
  padding: 0 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>
