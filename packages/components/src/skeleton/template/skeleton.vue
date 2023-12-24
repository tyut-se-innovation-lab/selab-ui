<template>
<<<<<<< HEAD
    <div class="se-skeleton">
        <div
            :class="['skeleton-container', active ? 'skeleton-animation' : '']"
        >
            <div
                class="skeleton-header"
                :style="{
                    marginBottom: skeletonProps.avatarShow ? '0px' : '10px'
                }"
            >
                <div
                    class="skeleton-avatar"
                    v-if="skeletonProps.avatarShow"
                ></div>
                <div
                    class="skeleton-title"
                    :style="{
                        '--skeleton-title-width': skeletonProps.titleWidth
                    }"
                ></div>
            </div>
            <div
                class="skeleton-content"
                :style="{
                    marginTop: skeletonProps.avatarShow ? '-10px' : '0px'
                }"
            >
                <div
                    class="skeleton-avatar"
                    v-if="skeletonProps.avatarShow"
                ></div>
                <div class="skeleton-paragraph">
                    <div
                        class="skeleton-paragraph-content"
                        v-for="item in skeletonProps.rows"
                        :key="item"
                    ></div>
                </div>
            </div>
        </div>
    </div>
=======
  <div class="se-skeleton">
    <div
        :class="['skeleton-container', active ? 'skeleton-animation' : '']"
    >
      <div
          class="skeleton-header"
          :style="{
                    marginBottom: skeletonProps.avatarShow ? '0px' : '10px'
                }"
      >
        <div
            class="skeleton-avatar"
            v-if="skeletonProps.avatarShow"
        ></div>
        <div
            class="skeleton-title"
            :style="{
                        '--skeleton-title-width': skeletonProps.titleWidth
                    }"
        ></div>
      </div>
      <div
          class="skeleton-content"
          :style="{
                    marginTop: skeletonProps.avatarShow ? '-10px' : '0px'
                }"
      >
        <div
            class="skeleton-avatar"
            v-if="skeletonProps.avatarShow"
        ></div>
        <div class="skeleton-paragraph">
          <div
              class="skeleton-paragraph-content"
              v-for="item in skeletonProps.rows"
              :key="item"
          ></div>
        </div>
      </div>
    </div>
  </div>
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
</template>

<script lang="ts" setup>
import '../../less/components/skeleton/index.less';
import { withDefaults } from 'vue';
defineOptions({ name: 'se-skeleton' });
type skeletonProps = {
<<<<<<< HEAD
    avatarShow?: boolean;
    rows?: number;
    active?: boolean;
    titleWidth?: string;
};
const skeletonProps = withDefaults(defineProps<skeletonProps>(), {
    rows: 3,
    avatarShow: true,
    titleWidth: '100%',
    active: false
=======
  avatarShow?: boolean;
  rows?: number;
  active?: boolean;
  titleWidth?: string;
};
const skeletonProps = withDefaults(defineProps<skeletonProps>(), {
  rows: 3,
  avatarShow: true,
  titleWidth: '100%',
  active: false
>>>>>>> d6f8f4d0c2c85942e72e837a804ce8f2ceb1935a
});
</script>
