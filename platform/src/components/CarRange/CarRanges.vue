<script setup>
import { ref, computed, onMounted, watch } from "vue";
import SingleCarRange from "./SingleCarRange.vue";
import CarSearchEngine from "./CarSearchEngine.vue";
import { useCar } from "../../composables/car";
const { getAll, carsList, isLoadingCars } = useCar();

const filters = ref({
  type: "",
  drive: "",
  priceMin: null,
  priceMax: null,
});

const isLoading = ref(false);

watch(
  carsList,
  (val) => {
    if (val == null) {
      console.warn("carsList is null or undefined after fetch");
    }
  },
  { immediate: true }
);

function applyFilter(payload) {
  filters.value = payload;
}

const getCarPrice = (car) => {
  const chosen = car.versions?.[0]?.title;
  const v = car.versions?.find((x) => x.title === chosen);
  return v?.price ?? 0;
};

const filteredCars = computed(() => {
  const { type, drive, priceMin, priceMax } = filters.value;

  const list = Array.isArray(carsList.value) ? carsList.value : [];

  return list.filter((car) => {
    if (type && String(car.fk_type) !== String(type)) return false;
    if (drive && String(car.fk_drive) !== String(drive)) return false;

    const price = getCarPrice(car);

    if (priceMin != null && priceMin !== "" && price < Number(priceMin))
      return false;
    if (priceMax != null && priceMax !== "" && price > Number(priceMax))
      return false;

    return true;
  });
});

onMounted(async () => {
  isLoading.value = true;
  try {
    await getAll();
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div v-loading="isLoadingCars">
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
