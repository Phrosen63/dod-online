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
        v-for="skill in skills"
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

// Modules
import { writeNewObjToCurrentUser } from '@/api/database/write';
import { deleteDocumentFromCurrentUser } from '@/api/database/delete';

export default {
  name: 'CharacterSkills',
  props: {
    characterId: {
      type: String,
      required: true,
      default() {
        return '';
      },
    },
    skills: {
      type: Array,
      required: true,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      SKILLS_COLLECTION: undefined,
    };
  },
  computed: {
    characterSkillAddedListener() {
      return this.$store.state.characterSkillAdded;
    },
    characterSkillSavedListener() {
      return this.$store.state.characterSkillSaved;
    },
    characterSkillDeletedListener() {
      return this.$store.state.characterSkillDeleted;
    },
  },
  watch: {
    characterSkillAddedListener(data) {
      if (data && typeof data === 'object') {
        const skill = {
          key: data.key,
          value: data.value,
        }
        writeNewObjToCurrentUser(this.SKILLS_COLLECTION, skill).then((id) => {
          skill.id = id;
          this.skills.push(skill);
        });
      }
    },
    characterSkillSavedListener(arr) {
      arr.forEach(obj => {
        const target = this.skills.find((skill) => skill.id === obj.id);
        if (target) {
          // Update existing object
          target[obj.key] = obj.value;
        }
      });
    },
    characterSkillDeletedListener(data) {
      if (data.value) {
        const index = this.skills.findIndex(skill => skill.id === data.id);
        if (index > -1) {
          const skill = this.skills[index];
          this.skills.splice(index, 1);
          deleteDocumentFromCurrentUser(this.SKILLS_COLLECTION, skill.id);
        }
      }
    },
  },
  created() {
    this.SKILLS_COLLECTION = `characters/${this.characterId}/skills`;
  },
  methods: {
    getSkillObjectById(id) {
      return this.skills.find((skill) => skill.id === id);
    },

    addSkill() {
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
        mutation: 'setCharacterSkillAdded',
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
        characterId: this.characterId,
        path: this.SKILLS_COLLECTION,
        mutation: 'setCharacterSkillSaved',
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
        mutation: 'setCharacterSkillDeleted',
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
  border-bottom: 1px solid #a2a2a2;
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
