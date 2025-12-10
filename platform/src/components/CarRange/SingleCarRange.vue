<script setup lang="ts">
import { ref, computed } from "vue";
import ButtonComponent from "../common/ButtonComponent.vue";
import CarModal from "./CarModal.vue";
import type { Car, CarImage, VersionData } from "../../types";

const props = defineProps<{ car: Car }>();
const formatPrice = (value: number | string | null | undefined) => {
  const n = Number(value ?? 0) || 0;
  return n.toLocaleString("pl-PL");
};
const extractImageString = (img: string | CarImage | null | undefined): string => {
  if (!img) return "";
  if (typeof img === "string") return img;
  return "";
};

import API from "../../config/api";

const getCarImage = (): string => {
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

const carModalRef = ref<{ open?: () => void } | null>(null);
const openDialog = () => carModalRef.value?.open?.();
const selectedVersion = computed(() => (props.car.versions?.[0] as VersionData | undefined)?.id ?? "");

const selectedPrice = computed(() => {
  const v = (props.car.versions || []).find((x: any) => x.id === selectedVersion.value) as VersionData | undefined;
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
      loading="lazy"
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
