<script setup lang="ts">
import { ref, watch } from "vue";

import ButtonComponent from "../common/ButtonComponent.vue";

import SectionCard from "../common/SectionCard.vue";

import Modal from "../common/Modal.vue";

import CarCustomization from "./CarCustomization.vue";

import CarGallery from "./CarGallery.vue";

import CarFeatures from "./CarFeatures.vue";
import type { Car } from "../../types";

const props = defineProps<{ car: Car; selectedImage?: string }>();
const emit = defineEmits(["update:selectedImage"]);
const isDialogOpen = ref(false);

const open = () => (isDialogOpen.value = true);
const close = () => (isDialogOpen.value = false);
const onUpdateIsOpen = (val: boolean) => {
  isDialogOpen.value = val;
};
defineExpose({ open, close });

</script>
<template>
    <Modal
      :is-open="isDialogOpen"
  @update:is-open="onUpdateIsOpen"
      :header="car.name"
    >
    <template #content>
      <div class="car-modal">
        <div class="car-gallery">
          <CarGallery :images="car.images" />
        </div>
        <div class="d-flex flex-column gap-3">
          <SectionCard padding="16px 14px">
            <template #content>
              <CarCustomization
                :car="car"
                @close="close"
              />
            </template>
          </SectionCard>
          <SectionCard padding="16px 14px">
            <template #content>
              <CarFeatures
                :acceleration="car.acceleration_0_100_s"
                :max_speed="car.max_speed_kmh"
                :charging="car.charging"
                :trunk_capacity="car.trunk_capacity"
                :guarantee="car.guarantee"
              />
            </template>
          </SectionCard>
        </div>
      </div>
    </template>
  </Modal>
</template>
<style scoped>
.car-modal {
  display: flex;
  gap: 36px;
}
.car-gallery {
  width: 660px;
  flex: 0 0 660px;
}
@media (max-width: 1120px) {
  .car-modal {
    flex-direction: column;
  }
  .car-gallery {
    width: 100%;
  }
}
</style>
