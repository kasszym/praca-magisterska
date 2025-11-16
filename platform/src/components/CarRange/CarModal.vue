<script setup>
import { ref, watch } from "vue";
import ButtonComponent from "../common/ButtonComponent.vue";
import SectionCard from "../common/SectionCard.vue";
import Modal from "../common/Modal.vue";
import CarCustomization from "./CarCustomization.vue";
import CarGallery from "./CarGallery.vue";
import CarFeatures from "./CarFeatures.vue";

const props = defineProps({
  car: {
    type: Object,
    required: true,
  },
  selectedImage: { type: String, default: "" },
});
const emit = defineEmits(["update:selectedImage"]);
const carCustomizationRef = ref();
const isDialogOpen = ref(false);

const open = () => (isDialogOpen.value = true);
const close = () => (isDialogOpen.value = false);
defineExpose({ open, close });
const savetoLocalStorage = () => {
  carCustomizationRef.value?.savetoLocalStorage();
};
</script>
<template>
  <Modal
    v-model:is-open="isDialogOpen"
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
                ref="carCustomizationRef"
                :car="car"
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
    <template #footer>
      <ButtonComponent
        title="Anuluj"
        width="100px"
        background-color="#fff"
        color="var(--navy)"
        @handle-click="close"
        :font-weight="400"
        border="1px solid var(--grey)"
        background-color-hover="#fff"
        color-hover="var(--navy)"
        border-hover="1px solid var(--dark-grey)"
      />
      <ButtonComponent
        title="Znajdź dealera"
        width="134px"
        @handle-click="savetoLocalStorage"
      />
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
