<template>
  <a-input-number
    v-if="type === 'number'"
    :style="{ width: '80px' }"
    size="small"
    :default-value="defaultValue"
    @change="handleChange"
  />
  <a-switch
    v-else
    :default-checked="defaultCheck"
    size="small"
    @change="handleChange"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: Number as PropType<any>,
      default: 0,
    },
    defaultCheck: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['inputChange'],
  setup(props, { emit }) {
    const handleChange = (value: unknown) => {
      emit('inputChange', {
        value,
        key: props.name,
      });
    };
    return {
      handleChange,
    };
  },
});
</script>
