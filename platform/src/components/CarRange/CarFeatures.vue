<script setup>
import TheSeparator from "../common/TheSeparator.vue";
import { ref } from "vue";
const props = defineProps({
  acceleration: {
    type: Number,
    required: true,
  },
  max_speed: {
    type: Number,
    required: true,
  },
  charging: {
    type: Number,
    required: true,
  },
  trunk_capacity: {
    type: Number,
    required: true,
  },
  guarantee: {
    type: Number,
    required: true,
  },
});
const featurs = [
  {
    label: "0–100 km/h",
    value: `${props.acceleration}s`,
  },
  {
    label: "Maksymalna prędkość",
    value: `${props.max_speed} km/h`,
  },
  {
    label: "Ładowanie",
    value: `${props.charging} kW DC`,
  },
  {
    label: "Pojemność bagażnika",
    value: `${props.trunk_capacity} L`,
  },
  {
    label: "Gwarancja",
    value: `${props.guarantee} lat`,
  },
];
</script>
<template>
  <div class="d-flex flex-column gap-2">
    <span
      style="color: var(--navy); font-size: var(--fs-base); font-weight: 700"
      >Kluczowe cechy</span
    >
    <TheSeparator />

    <div
      class="d-flex flex-column gap-2 mt-1"
      style="margin-bottom: 55px"
    >
      <div
        class="d-flex justify-content-between"
        style="font-size: var(--fs-s)"
        v-for="(feature, index) in featurs"
        :key="index"
      >
        <span style="color: var(--dark-grey)">{{ feature.label }}</span
        ><span style="color: var(--navy)">{{ feature.value }}</span>
      </div>
    </div>
  </div>
</template>
