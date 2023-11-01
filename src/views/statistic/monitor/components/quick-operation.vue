<template>
  <a-card class="general-card" title="快捷操作">
    <a-space direction="vertical" fill :size="10">
      <a-button long>
        切换清晰度
        <template #icon>
          <IconTags />
        </template>
      </a-button>
      <a-button long>
        主备流切换
        <template #icon>
          <IconSwap />
        </template>
      </a-button>
      <a-button long>
        摄像头左移
        <template #icon>
          <icon-arrow-left />
        </template>
      </a-button>
      <a-button long>
        摄像头右移
        <template #icon>
          <IconArrowRight />
        </template>
      </a-button>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
