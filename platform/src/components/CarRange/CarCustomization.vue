<script setup>
import { ref, computed, watch, onMounted } from "vue";
import ButtonComponent from "../common/ButtonComponent.vue";
import { ElMessage } from "element-plus";
import { useSummary } from "../../composables/useSummary";

const props = defineProps({
  car: {
    type: Object,
    required: true,
  },
});

const { setSelectedCar } = useSummary();

const version = ref(
  props.car.selectedVersion ?? props.car.versions?.[0]?.title ?? ""
);
const basePrice = computed(() => {
  const v = props.car.versions?.find((x) => x.title === version.value);
  return v?.price ?? 0;
});
const selectedAddonTitles = ref([]);
const selectedAddons = computed(
  () =>
    props.car.additional?.filter((a) =>
      selectedAddonTitles.value.includes(a.title)
    ) ?? []
);
const addonsTotal = computed(() =>
  selectedAddons.value.reduce((sum, a) => sum + (a.price ?? 0), 0)
);
const totalPrice = computed(() => basePrice.value + addonsTotal.value);
const color = ref(props.car.colors?.[0].name ?? "");

const formatPrice = (value) => value.toLocaleString("pl-PL");

const saveToSummary = () => {
  if (version.value && color.value) {
    const payload = {
      name: props.car.name,
      version: version.value,
      color: color.value,
      addons: selectedAddons.value,
      price: totalPrice.value,
    };
    setSelectedCar(payload);
  }
};

// Save on mount if there are default values
onMounted(() => {
  saveToSummary();
});

// Auto-save to summary when values change
watch([version, color, selectedAddonTitles, totalPrice], () => {
  saveToSummary();
});

const savetoLocalStorage = () => {
  const payload = {
    name: props.car.name,
    version: version.value,
    color: color.value,
    addons: selectedAddons.value,
    price: totalPrice.value,
  };
  setSelectedCar(payload);
  ElMessage({
    message: "Zapisano zmiany.",
    type: "success",
  });
};
defineExpose({ open, close, savetoLocalStorage });
</script>

<template>
  <div class="d-flex flex-column gap-2">
    <div class="d-flex flex-column gap-2">
      <span class="car-customization-label">Wersja</span>
      <el-radio-group
        v-model="version"
        class="version-group"
      >
        <el-radio-button
          v-for="v in props.car.versions"
          :key="v.title"
          :label="v.title"
        >
          {{ v.title }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="d-flex flex-column gap-2">
      <span class="car-customization-label">Kolor</span>
      <el-radio-group
        v-model="color"
        class="color-swatches"
      >
        <el-radio
          v-for="(c, index) in props.car.colors"
          :key="index"
          :label="c.name"
          :value="c.name"
          class="color-swatch"
        >
          <span
            class="color-dot"
            :style="{
              backgroundColor: c.value,
              border: `1px solid ${c.value}`,
            }"
          />
        </el-radio>
      </el-radio-group>
    </div>
    <div class="d-flex flex-column gap-2">
      <span class="car-customization-label">Dodatki</span>
      <el-checkbox-group
        v-model="selectedAddonTitles"
        class="addon-group"
      >
        <el-checkbox-button
          v-for="a in props.car.additional"
          :key="a.title"
          :label="a.title"
        >
          {{ a.title }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="d-flex flex-column gap-2">
      <div class="d-flex flex-column">
        <span class="car-customization-label">Cena</span>
        <span
          class="fw-bold fs-4"
          style="color: var(--navy)"
        >
          {{ formatPrice(totalPrice) }} zł
        </span>
      </div>

      <ButtonComponent
        title="Znajdź punkt sprzedaży"
        class="w-100 mt-2"
        background-color="var(--pink)"
        background-color-hover="var(--dark-pink)"
        height="40px"
        @handle-click="savetoLocalStorage"
      />
    </div>
  </div>
</template>
<style>
.el-radio-group {
  display: flex;
  gap: 8px;
}
.car-customization-label {
  color: var(--dark-grey);
  font-size: var(--fs-s);
}
.el-radio-group .el-radio-button__inner {
  height: 32px;
  font-size: var(--fs-xs);
  color: var(--navy);
  background: #fff;
  border: 1px solid var(--grey) !important;
  border-radius: 8px !important;
  font-weight: 400;
}
.el-radio-button.is-active
  .el-radio-button__original-radio:not(:disabled)
  + .el-radio-button__inner {
  background-color: var(--main-color);
  border: 1px solid var(--main-color) !important;
  font-weight: 700;
}
.el-checkbox-button .el-checkbox-button__inner {
  height: 32px;
  font-size: var(--fs-xs);
  color: var(--navy);
  background: #fff;
  border: 1px solid var(--grey) !important;
  border-radius: 8px !important;
  width: 100%;
}
.el-checkbox-button.is-checked .el-checkbox-button__inner {
  background: var(--main-color);
  border: 1px solid var(--main-color) !important;
  font-weight: 700;
}
.color-dot {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 8px;
}
.color-swatches .el-radio {
  margin: 0;
}
.color-swatches .el-radio__inner {
  display: none;
}
.color-swatches .el-radio__input {
  margin-right: 0 !important;
}
.color-swatches .el-radio__label {
  padding-left: 0 !important;
}
.color-swatch:focus-within .color-dot,
.color-swatch.is-checked .color-dot {
  box-shadow: 3px 3px 3px var(--dark-grey);
  outline-offset: 2px;
  border-radius: 8px;
}
.version-group,
.addon-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
  width: 100%;
}

.version-group .el-radio-button,
.addon-group .el-radio-button {
  width: 100%;
}

.version-group .el-radio-button__inner,
.addon-group .el-radio-button__inner {
  width: 100%;
}
.version-group {
  grid-template-columns: repeat(3, 1fr);
}
</style>
