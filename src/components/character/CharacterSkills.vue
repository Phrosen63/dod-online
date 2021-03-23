<template>
  <div class="character-skills">
    <h2>{{ $t('skills') }}</h2>
    <button
      class="button--add"
      @click="addSkill"
    >
      +{{ $t('add_skill') }}
    </button>
    <div class="grid">
      <transition-group
        name="transition-list"
        class="row"
        tag="ul"
      >
        <li
          v-for="skill in selectedCharacter.skills"
          :key="skill.id"
          class="character-skill col-6"
        >
          <span>{{ skill.key }}:</span>
          <span class="character-skill__value">
            {{ skill.value }}
          </span>
          <div class="skill-controls">
            <button
              class="skill-control skill-control__edit"
              :data-id="skill.id"
              @click="clickEdit(skill.id)"
            >
              {{ $t('edit') }}
            </button>
            <button
              class="skill-control skill-control__delete"
              :data-id="skill.id"
              @click="clickDelete(skill.id)"
            >
              {{ $t('delete') }}
            </button>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
// Components
import AddFieldsMultipleModal from '@/components/modals/AddFieldsMultipleModal';
import EditFieldModal from '@/components/modals/EditFieldModal';
import PromptBoolean from '@/components/modals/PromptBoolean';

export default {
  name: 'CharacterSkills',
  computed: {
    selectedCharacter() {
      const query = this.getQuery();

      if (query.uid && query.characterId) {
        if (this.getSelectedCharacterId() !== query.characterId) {
          this.getCharacterById(query.uid, query.characterId);
        }
      }

      return this.$store.state.selectedCharacter;
    },
  },
  methods: {
    getQuery() {
      const query = this.$route.query;
      return query ? {
        uid: query.uid || undefined,
        characterId: query.characterId || undefined,
      } : undefined;
    },
    getCollectionPath() {
      if (this.selectedCharacter.uid && this.selectedCharacter.id) {
        return `users/${this.selectedCharacter.uid}/characters/${this.selectedCharacter.id}/skills`;
      }
      return undefined;
    },
    getSkillObjectById(id) {
      return this.selectedCharacter.skills.find((skill) => skill.id === id);
    },
    addSkill() {
      const SKILLS_COLLECTION = this.getCollectionPath();

      if (SKILLS_COLLECTION) {
        const data = [
          {
            key: 'key',
            fieldName: this.$t('skill'),
          },
          {
            key: 'value',
            fieldName: this.$t('value'),
          },
        ];
  
        const componentProps = {
          data,
          title: this.$t('add_skill'),
          collectionPath: SKILLS_COLLECTION,
          mutation: 'addObject',
          stateTarget: this.$store.state.selectedCharacter.skills,
        };
        const modalProps = {
          height: 'auto',
          scrollable: true,
          focusTrap: true,
        };
  
        this.$modal.show(
          AddFieldsMultipleModal,
          componentProps,
          modalProps,
        );
      }
    },
    clickEdit(skillId) {
      const SKILLS_COLLECTION = this.getCollectionPath();

      if (SKILLS_COLLECTION) {
        const skill = this.getSkillObjectById(skillId);
        const data = [
          {
            id: skill.id,
            key: 'key',
            value: skill.key,
            fieldName: this.$t('skill'),
          },
          {
            id: skill.id,
            key: 'value',
            value: skill.value,
            fieldName: this.$t('value'),
          },
        ];
  
        const componentProps = {
          data,
          title: {
            key: this.$t('edit_field'),
            value: skill.key,
          },
          objectId: skillId,
          characterId: this.selectedCharacter.id,
          collectionPath: SKILLS_COLLECTION,
          mutation: 'updateObject',
          stateTarget: this.$store.state.selectedCharacter.skills,
        };
        const modalProps = {
          height: 'auto',
          scrollable: true,
          focusTrap: true,
        };
  
        this.$modal.show(
          EditFieldModal,
          componentProps,
          modalProps,
        );
      }
    },
    clickDelete(skillId) {
      const SKILLS_COLLECTION = this.getCollectionPath();

      if (SKILLS_COLLECTION) {
        const skill = this.getSkillObjectById(skillId);
  
        const componentProps = {
          data: {
            button: {
              yes: this.$t('yes'),
              no: this.$t('no'),
            },
          },
          heading: {
            title: `${this.$t('warning_message_title')} ${this.$t('skill').toLowerCase()}.`,
            preamble: `${this.$t('warning_message_preamble')} ${this.$t('skill').toLowerCase()}: ${skill.key}`,
            content: `${this.$t('warning_message_content')}`,
          },
          objectId: skillId,
          collectionPath: SKILLS_COLLECTION,
          mutation: 'deleteObject',
          stateTarget: this.$store.state.selectedCharacter.skills,
        };
        const modalProps = {
          height: 'auto',
          scrollable: true,
          focusTrap: true,
        };
  
        this.$modal.show(
          PromptBoolean,
          componentProps,
          modalProps,
        );
      }
    },
  },
};
</script>

<style scoped>
.character-skills {
  padding: 0 0 55px 0;
}

.character-skill {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  max-width: 50%;
  margin: 5px 0;
  padding: 30px 0 0 0;
}

.character-skill__value {
  flex: 1 0 auto;
  display: block;
  margin: 0 15px 0 0;
  text-align: right;
  padding: 0 10px 0 0;
  border-bottom: 1px dashed #a2a2a2;
}

.skill-controls {
  display: none;
  position: absolute;
  top: 5px;
  right: 5px;
}

.skill-control {
  cursor: pointer;
}

.skill-control__edit {
  margin: 0 5px 0 0;
}

.character-skill:hover {
  background-color: #e4e4e4;
}

.character-skill:hover > .skill-controls {
  display: block;
}
</style>
