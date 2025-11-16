<script setup>
import { ref, computed } from "vue";
import ButtonComponent from "../common/ButtonComponent.vue";
import CarModal from "./CarModal.vue";

const props = defineProps({
  car: {
    type: Object,
    required: true,
  },
});
const formatPrice = (value) => value.toLocaleString("pl-PL");
const getCarImage = () =>
  new URL(`../../assets/${props.car.main_image}`, import.meta.url).href;

const carModalRef = ref();
const openDialog = () => carModalRef.value?.open();
const selectedVersion = ref(
  props.car.selectedVersion ?? props.car.versions?.[0]?.title ?? ""
);

const selectedPrice = computed(() => {
  const v = props.car.versions?.find((x) => x.title === selectedVersion.value);
  return v?.price ?? 0;
});
</script>

<template>
  <div
    class="card mx-auto w-100"
    style="
      max-width: 368px;
      border: 1px solid var(--grey);
      border-radius: var(--border-radius);
    "
  >
    <img
      :src="getCarImage()"
      :alt="car.name"
      style="height: 200px; object-fit: cover"
      class="card-img-top d-block img-fluid"
    />
    <div
      class="card-body p-3 d-flex flex-column"
      style="row-gap: 7px"
    >
      <div
        class="d-flex flex-column fw-bold"
        style="color: var(--navy); font-size: var(--fs-l); row-gap: 3px"
      >
        <span>{{ car.name }}</span>
        <span>od {{ formatPrice(selectedPrice) }} zł</span>
      </div>
      <div
        class="d-flex justify-content-between align-items-center"
        style="font-size: var(--fs-xs); color: var(--dark-grey)"
      >
        <span>{{ car.drivetrain }} • {{ car.range }}km range</span>
        <ButtonComponent
          title="Sprawdź"
          width="88px"
          height="22px"
          font-size="var(--fs-xxs)"
          @handle-click="openDialog"
        />
        <CarModal
          ref="carModalRef"
          :car="car"
          v-model:selectedVersion="selectedVersion"
        />
      </div>
    </div>
  </div>
</template>
