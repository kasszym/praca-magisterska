<script setup>
import { ref } from "vue";
import ButtonComponent from "../common/ButtonComponent.vue";

const props = defineProps({
  car: {
    type: Object,
    required: true,
  },
});
const version = ref(props.car.versions?.[0] ?? "");
const color = ref(props.car.colors?.[0] ?? "");
const addon = ref(null);
const formatPrice = (value) => value.toLocaleString("pl-PL");
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
          :key="v"
          :label="v"
        >
          {{ v }}
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
          v-for="c in props.car.colors"
          :key="c"
          :label="c"
          class="color-swatch"
        >
          <span
            class="color-dot"
            :style="{
              backgroundColor: c,
              border: `1px solid ${c}`,
            }"
          />
        </el-radio>
      </el-radio-group>
    </div>
    <div class="d-flex flex-column gap-2">
      <span class="car-customization-label">Dodatki</span>
      <el-radio-group
        v-model="addon"
        class="addon-group"
      >
        <el-radio-button
          v-for="a in props.car.additional"
          :key="a"
          :label="a"
        >
          {{ a }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="d-flex flex-column gap-2">
      <div class="d-flex flex-column">
        <span class="car-customization-label">Cena</span>
        <span
          class="fw-bold fs-4"
          style="color: var(--navy)"
        >
          {{ formatPrice(car.price) }} zł
        </span>
      </div>

      <ButtonComponent
        title="Znajdź punkt sprzedaży"
        class="w-100 mt-2"
        background-color="var(--dark-green)"
        height="40px"
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
}
.el-radio-button.is-active
  .el-radio-button__original-radio:not(:disabled)
  + .el-radio-button__inner {
  background-color: var(--main-color);
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
.version-group .el-radio-button {
  flex: 0 0 109px;
  width: 109px;
}
.el-radio-button__inner {
  width: 100%;
  text-align: center;
  padding: 8px 0;
}
.addon-group .el-radio-button {
  flex: 0 0 164px;
  width: 164px;
}
</style>
