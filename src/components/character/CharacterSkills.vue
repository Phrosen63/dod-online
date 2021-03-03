<template>
  <div class="character-skills">
    <h2>Skills</h2>
    <button
      class="button--add"
      @click="addSkill"
    >
      +Add skill
    </button>

    <transition-group
      name="transition-list"
      class="character-skills-list"
      tag="ul"
    >
      <li
        v-for="skill in selectedCharacter.skills"
        :key="skill.id"
        class="character-skill"
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
            Edit
          </button>
          <button
            class="skill-control skill-control__delete"
            :data-id="skill.id"
            @click="clickDelete(skill.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </transition-group>
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
      return this.$store.state.selectedCharacter;
    },
  },
  methods: {
    getSkillObjectById(id) {
      return this.selectedCharacter.skills.find((skill) => skill.id === id);
    },
    addSkill() {
      const SKILLS_COLLECTION = `characters/${this.selectedCharacter.id}/skills`;
      const data = [
        {
          key: 'key',
        },
        {
          key: 'value',
        },
      ];

      const componentProps = {
        data,
        title: 'Add note',
        collectionPath: SKILLS_COLLECTION,
        mutation: 'addCharacterSkill',
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
    },
    clickEdit(skillId) {
      const SKILLS_COLLECTION = `characters/${this.selectedCharacter.id}/skills`;
      const skill = this.getSkillObjectById(skillId);
      const data = [
        {
          id: skill.id,
          key: 'key',
          value: skill.key,
          fieldName: 'Title',
        },
        {
          id: skill.id,
          key: 'value',
          value: skill.value,
          fieldName: 'Text',
        },
      ];

      const componentProps = {
        data,
        title: {
          key: 'Edit field',
          value: skill.key,
        },
        objectId: skillId,
        characterId: this.selectedCharacter.id,
        collectionPath: SKILLS_COLLECTION,
        mutation: 'updateCharacterSkill',
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
    },
    clickDelete(skillId) {
      const SKILLS_COLLECTION = `characters/${this.selectedCharacter.id}/skills`;
      const skill = this.getSkillObjectById(skillId);

      const componentProps = {
        data: {
          button: {
            yes: 'Yes',
            no: 'No',
          },
        },
        heading: {
          title: `Warning! Delete skill.`,
          preamble: `Delete skill: ${skill.key}`,
          content: `This cannot be undone. Delete anyway?`,
        },
        objectId: skillId,
        collectionPath: SKILLS_COLLECTION,
        mutation: 'deleteCharacterSkill',
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
    },
  },
};
</script>

<style scoped>
.character-skills {
  flex: 1 0 100%;
  border-bottom: 1px solid #a2a2a2;
  padding: 0 0 55px 0;
}

.character-skills-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.character-skill {
  flex: 1 0 50%;
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
