<template>
  <div class="grid">
    <div class="row">
      <div class="col-12">
        <div class="console-settings">
          <button
            class="console-settings__controls button--clear"
            @click="clearConsole"
          >
            {{ $t('clear') }}
          </button>
          <label
            class="console-settings__controls"
            for="autoscroll"
          >
            {{ $t('autoscroll') }}:
          </label>
          <input
            id="autoscroll"
            class="console-settings__controls"
            type="checkbox"
            checked
            @change="toggleAutoscroll($event)"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div
          ref="consoleWindow"
          class="console-window"
        >
          <p
            v-for="(item, index) in items"
            :key="index"
            class="console-message"
            v-html="item.message"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
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
            :value="$t('send')"
            @click="sendMessage"
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// Modules
import { db } from '@/api/database/db';
import { writeObject } from '@/api/database/write';
import { getUserDisplayName } from '@/api/database/user';
import sanitizeHtml from 'sanitize-html';

export default {
  name: 'Console',
  data() {
    return {
      items: [],
      autoScroll: true,
      userDisplayName: undefined,
      showMessages: false,
      messageColor: {
        customMessage: '#c8e89e',
      },
    };
  },
  created() {
    this.userDisplayName = this.setUserDisplayName();
  },
  async mounted() {
    db.collection('console').doc('shared').onSnapshot((doc) => {
      const data = doc.data().data;

      const message = sanitizeHtml(data.message, {
        allowedTags: ['span'],
        allowedAttributes: {
          'span': [ 'style' ],
        },
      });

      if (this.showMessages && message) {
        this.items.push({
          message,
        });
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
        const data = {
          message: `<span style="color: ${this.messageColor.customMessage}">${this.userDisplayName}: ${value}</span>`,
          date: Date.now(),
        };

        writeObject({
          collectionPath: 'console',
          document: 'shared',
          data: {
            data,
          },
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
}

.console-message-bar__input-field {
  flex: 1 0 auto;
  width: 60px;
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
