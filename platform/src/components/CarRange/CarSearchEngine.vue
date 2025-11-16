<script setup>
import { ref, onMounted } from "vue";
import SectionCard from "../common/SectionCard.vue";
import ButtonComponent from "../common/ButtonComponent.vue";
import { useCar } from "../../composables/car";

const { typesList, drivesList, isLoadingTypes, isLoadingDrives } =
  useCar();

const chosenType = ref(null);
const chosenDrive = ref(null);
const priceMin = ref(null);
const priceMax = ref(null);

const emit = defineEmits(["filter"]);

function onSubmit(e) {
  e?.preventDefault?.();
  emit("filter", {
    type: chosenType.value,
    drive: chosenDrive.value,
    priceMin: priceMin.value,
    priceMax: priceMax.value,
  });
}

</script>

<template>
  <SectionCard>
    <template #content>
      <form
        @submit="onSubmit"
        class="filters-form d-flex justify-content-between align-items-center w-100"
        style="gap: 16px"
      >
        <div class="filters row g-3 align-items-center flex-nowrap">
          <div
            class="field col-auto d-flex align-items-center gap-2-5"
            v-loading="isLoadingTypes"
          >
            <label class="label m-0">Typ</label>

            <el-select
              v-model="chosenType"
              clearable
              placeholder="Wybierz"
              style="width: 160px; height: 36px"
              popper-class="select-popper"
            >
              <el-option
                v-for="t in typesList || []"
                :key="t.id"
                :label="t.name"
                :value="t.id"
              />
            </el-select>
          </div>

          <div
            class="field col-auto d-flex align-items-center gap-2-5"
            v-loading="isLoadingDrives"
          >
            <label class="label m-0">Napęd</label>

            <el-select
              v-model="chosenDrive"
              placeholder="Wybierz"
              style="width: 160px; height: 36px"
              popper-class="select-popper"
              clearable
            >
              <el-option
                v-for="d in drivesList || []"
                :key="d.id"
                :label="d.name"
                :value="d.id"
              />
            </el-select>
          </div>

          <div class="field price col-auto d-flex align-items-center gap-2">
            <label class="label m-0">Cena</label>
            <div class="range-group d-inline-flex align-items-center gap-2">
              <input
                type="number"
                class="input"
                placeholder="min"
                clearable
                v-model.number="priceMin"
                @input="
                  $event.target.value = $event.target.value.replace(/\D+/g, '')
                "
              />
              <span class="dash">-</span>
              <input
                type="number"
                class="input"
                placeholder="max"
                clearable
                v-model.number="priceMax"
                @input="
                  $event.target.value = $event.target.value.replace(/\D+/g, '')
                "
              />
            </div>
          </div>
        </div>

        <div class="btn-wrap">
          <ButtonComponent
            @handle-click="onSubmit"
            title="Filtruj"
            class="me-3"
            width="135px"
            background-color="var(--pink)"
            background-color-hover="var(--dark-pink)"
          />
        </div>
      </form>
    </template>
  </SectionCard>
</template>

<style>
.SectionCard {
  height: 72px;
  display: flex;
  justify-content: center;
}
.filters.row {
  --bs-gutter-x: 20px !important;
}
.label {
  font-size: var(--fs-s);
  color: var(--dark-grey);
  white-space: nowrap;
}
.el-select {
  width: 160px;
  font-size: var(--fs-s);
  color: var(--navy);
}
.el-select__wrapper {
  border-radius: 8px !important;
  box-shadow: none;
  border: 1px solid var(--grey);
  color: var(--navy) !important;
  height: 36px;
  padding: 0 12px;
}
.el-select__wrapper.is-focused {
  box-shadow: none;
}
.el-select__wrapper.is-hovering:not(.is-focused) {
  box-shadow: none;
}
.el-select__placeholder {
  color: var(--navy) !important;
}
.el-select__placeholder.is-transparent {
  color: var(--navy) !important;
}
.range-group {
  border-radius: 8px;
}
.input {
  height: 36px;
  width: 81px;
  padding: 0 10px;
  border: 1px solid var(--grey);
  border-radius: 8px;
  background-clip: padding-box;
  font-size: var(--fs-s);
  color: var(--navy);
  transition: border-color 120ms ease;
}
.input:focus {
  outline: none;
  box-shadow: none;
}
input::placeholder {
  color: var(--navy);
}
.dash {
  color: var(--dark-grey);
  padding: 0 2px;
  font-size: var(--fs-s);
}

.input[type="number"]::-webkit-outer-spin-button,
.input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
@media (max-width: 1000px) {
  .SectionCard {
    height: 100%;
  }
  .filters-form {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  .filters {
    flex-wrap: wrap !important;
  }
  .field {
    width: 100%;
  }
  .el-select {
    width: 100% !important;
  }
  .range-group {
    width: 100%;
  }
  .input {
    width: 100%;
  }
  .btn-wrap {
    width: 100%;
  }
  .btn-wrap > * {
    width: 100% !important;
  }
  .label {
    width: 60px;
  }
}
</style>
