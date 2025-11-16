<script setup>
import { ref, computed } from "vue";
import SingleCarRange from "./SingleCarRange.vue";
import CarSearchEngine from "./CarSearchEngine.vue";
import carsData from "./cars.json";

const filters = ref({
  type: "",
  drive: "",
  priceMin: null,
  priceMax: null,
});

function applyFilter(payload) {
  filters.value = payload;
}

const getCarPrice = (car) => {
  const chosen = car.selectedVersion ?? car.versions?.[0]?.title;
  const v = car.versions?.find((x) => x.title === chosen);
  return v?.price ?? 0;
};

const filteredCars = computed(() => {
  const { type, drive, priceMin, priceMax } = filters.value;

  return carsData.filter((car) => {
    if (type && car.type !== type) return false;
    if (drive && car.drive !== drive) return false;

    const price = getCarPrice(car);

    if (priceMin != null && priceMin !== "" && price < Number(priceMin))
      return false;
    if (priceMax != null && priceMax !== "" && price > Number(priceMax))
      return false;

    return true;
  });
});
</script>
<template>
  <div>
    <h2 class="fs-3 fw-bold text-navy mb-3">Gama naszych samochodów</h2>

    <div class="d-flex flex-column gap-3">
      <CarSearchEngine @filter="applyFilter" />

      <div
        v-if="filteredCars.length"
        class="row gx-5 gy-4 justify-content-center"
      >
        <div
          v-for="(car, index) in filteredCars"
          :key="index"
          class="col-12 col-sm-6 col-lg-4 d-flex"
        >
          <SingleCarRange :car="car" />
        </div>
      </div>

      <span
        v-else
        class="text-muted small"
        >Brak wyników</span
      >
    </div>
  </div>
</template>

<style scoped>
.text-navy {
  color: var(--navy);
}
</style>
