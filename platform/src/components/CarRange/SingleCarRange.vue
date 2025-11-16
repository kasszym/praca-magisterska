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
const formatPrice = (value) => {
  const n = Number(value ?? 0) || 0;
  return n.toLocaleString("pl-PL");
};
const extractImageString = (img) => {
  if (!img) return "";
  if (typeof img === "string") return img;
};

import API from "../../config/api";

const getCarImage = () => {
  const img = extractImageString(props.car?.main_image || "");
  if (!img) return "";
  if (/^(https?:)?\/\//.test(img)) return img;
  if (img.includes("/storage/")) {
    try {
      const origin = String(API.defaults.baseURL).replace(/\/api\/?$/, "");
      return img.startsWith("/") ? origin + img : origin + "/" + img;
    } catch (e) {
      return img;
    }
  }
  try {
    return new URL(`../../assets/${img}`, import.meta.url).href;
  } catch (e) {
    return img;
  }
};

const carModalRef = ref();
const openDialog = () => carModalRef.value?.open();
const selectedVersion = computed(() => props.car.versions?.[0]?.id ?? "");

const selectedPrice = computed(() => {
  const v = props.car.versions?.find((x) => x.id === selectedVersion.value);
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
        />
      </div>
    </div>
  </div>
</template>
