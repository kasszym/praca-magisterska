<script setup>
import { ref, computed } from "vue";
import ButtonComponent from "../common/ButtonComponent.vue";
import { useSummary } from "../../composables/useSummary";

const props = defineProps({
  car: {
    type: Object,
    required: true,
  },
});

const { setSelectedCar } = useSummary();

const version = ref(props.car.versions?.[0]?.id ?? null);
const basePrice = computed(() => {
  const versions = props.car.versions || [];
  let v = versions.find((x) => x.id === version.value);
  return Number(v?.price) || 0;
});
const selectedAddonIds = ref([]);
const selectedAddons = computed(() => {
  const ids = selectedAddonIds.value.map(id => Number(id));
  return (props.car.additionals || []).filter((a) => ids.includes(Number(a.id)));
});
const addonsTotal = computed(() =>
  selectedAddons.value.reduce((sum, a) => sum + (Number(a.price) || 0), 0)
);
const totalPrice = computed(() => basePrice.value + addonsTotal.value);
const color = ref(props.car.colors?.[0]?.id ?? null);

const formatPrice = (value) => {
  const n = Number(value ?? 0) || 0;
  return n.toLocaleString("pl-PL");
};

const saveToSummary = () => {
  if (version.value != null && color.value != null) {
    const versionLabel = props.car.versions?.find((x) => x.id === version.value)?.title || props.car.versions?.find((x) => x.id === version.value)?.titile || "";
    const colorLabel = props.car.colors?.find((c) => c.id === color.value)?.name || "";
    const payload = {
      car_id: props.car.id,
      version_id: version.value,
      color_id: color.value,
      addon_ids: selectedAddonIds.value.map((id) => Number(id)),
      name: props.car.name,
      version: versionLabel,
      color: colorLabel,
      addons: selectedAddons.value.map((a) => ({
        id: a.id,
        title: a.title,
        price: a.price ?? 0,
      })),
      price: totalPrice.value,
    };
    setSelectedCar(payload);
  }
};

defineExpose({ open, close });
</script>

<template>
  <div class="d-flex flex-column gap-2">
    <div class="d-flex flex-column gap-2">
      <span class="car-customization-label">Wersja</span>
      <el-radio-group v-model="version" class="version-group">
        <el-radio-button
          v-for="v in props.car.versions"
          :key="v.id"
          :value="v.id"
        >
          {{ v.title || v.titile || v.name }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="d-flex flex-column gap-2">
      <span class="car-customization-label">Kolor</span>
      <el-radio-group v-model="color" class="color-swatches">
        <el-radio
          v-for="(c, index) in props.car.colors"
          :key="index"
          :label="c.name"
          :value="c.id"
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
      <el-checkbox-group v-model="selectedAddonIds" class="addon-group">
        <el-checkbox-button
          v-for="a in props.car.additionals"
          :key="a.id"
          :label="a.title"
          :value="a.id"
        >
          {{ a.title }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="d-flex flex-column gap-2">
      <div class="d-flex flex-column">
        <span class="car-customization-label">Cena</span>
        <span class="fw-bold fs-4" style="color: var(--navy)">
          {{ formatPrice(totalPrice) }} zł
        </span>
      </div>

      <ButtonComponent
        title="Znajdź punkt sprzedaży"
        class="w-100 mt-2"
        background-color="var(--pink)"
        background-color-hover="var(--dark-pink)"
        height="40px"
        @handle-click="saveToSummary"
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
