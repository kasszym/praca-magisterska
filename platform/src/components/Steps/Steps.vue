<script setup lang="ts">
import { Check } from '@element-plus/icons-vue';
import steps from "./steps";

const props = defineProps({
  active: {
    type: Number,
    required: true,
    default: 1,
  },
});
</script>

<template>
  <div class="TheSteps">
    <div class="TheSteps__container">
      <div class="TheSteps__step-counter">Krok {{ props.active }}/4</div>

      <div class="TheSteps__steps">
        <div
          v-for="(step, i) in steps"
          :key="step.id"
          :data-testid="`the-steps-${step.id}`"
          :class="
            props.active > step.id
              ? ' TheSteps__step--checked TheSteps__step'
              : props.active == step.id
              ? 'TheSteps__step--active TheSteps__step'
              : 'TheSteps__step'
          "
        >
          <svg
            v-if="i !== 0"
            width="62"
            height="14"
            viewBox="0 0 62 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="6.5"
              width="59"
              height="1"
              rx="0.5"
              :fill="props.active >= step.id ? '#00AA00' : '#B6B6B6'"
              stroke="#B6B6B6"
            />
            <path
              d="M56.7071 1.29289L56 0.585786L54.5858 2L55.2929 2.70711L56.7071 1.29289ZM61 7L61.7071 7.70711C62.0976 7.31658 62.0976 6.68342 61.7071 6.29289L61 7ZM55.2929 11.2929L54.5858 12L56 13.4142L56.7071 12.7071L55.2929 11.2929ZM55.2929 2.70711L60.2929 7.70711L61.7071 6.29289L56.7071 1.29289L55.2929 2.70711ZM60.2929 6.29289L55.2929 11.2929L56.7071 12.7071L61.7071 7.70711L60.2929 6.29289Z"
              fill="#B6B6B6"
            />
          </svg>

          <div class="TheSteps__box-wrapper">
            <div class="TheSteps__box" @click="$emit('update', step.id)">
              <span unselectable="on">
                <el-icon v-if="props.active > step.id" :size="16">
                  <Check />
                </el-icon>
                <div v-else>{{ step.id }}</div>
              </span>
              <div class="TheSteps__title">
                {{ step.title }}
              </div>
            </div>
          </div>

          <div class="TheSteps__mobile">
            <div
              :class="
                props.active >= step.id
                  ? 'TheSteps__mobile-container TheSteps__mobile-container-pink'
                  : 'TheSteps__mobile-container TheSteps__mobile-container-grey'
              "
              @click="$emit('update', step.id)"
            />
          </div>
        </div>
      </div>
      <div class="TheSteps__content">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.TheSteps {
  min-height: 4.38rem;
  max-width: 74rem;
  margin: 0 auto;
  position: relative;
}

.TheSteps__title {
  position: absolute;
  text-align: center;
  width: 10rem;
  bottom: -1.5rem;
}

.TheSteps__step-counter {
  display: none;
}

.TheSteps__mobile {
  display: none;
}

.TheSteps__steps {
  display: flex;
  justify-content: center;
  max-width: 100%;
  position: relative;
  gap: 2rem
}

.TheSteps__step {
  color: var(--grey);
  display: flex;
  font-size: 0.88rem;
  font-weight: 600;
  position: relative;
  align-items: center;
  gap: 2rem;
}

.TheSteps__box {
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  width: 2.5rem;
  height: 2.5rem;
  user-select: none;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;
  border: 0.1rem solid var(--grey);
  cursor: pointer;
}

.TheSteps__step--checked .TheSteps__box {
  color: white;
  border: 0.1rem solid var(--dark-pink);
  background-color: var(--dark-pink);
}

.TheSteps__step--checked .TheSteps__title {
  color: var(--dark-pink);
}

.TheSteps__step--active .TheSteps__box {
  color: var(--main-color);
  border: 0.1rem solid var(--main-color);
}

.TheSteps__step--active .TheSteps__title {
  color: var(--main-color);
}
.TheSteps__content {
  margin-top: 3rem;
  min-height: 90vh;
  width: 100%;
}
</style>
