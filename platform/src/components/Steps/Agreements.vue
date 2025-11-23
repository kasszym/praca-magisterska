<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useAgreements } from "../../composables/agreements";

const { isLoadingAgreementsList, getAgreementsList, agreementsList } =
  useAgreements();

const emits = defineEmits([
  "getFormValues",
  "validateResult",
  "endValidation",
  "handleClick",
]);

const showAnnouncements = ref(true);
const agreementsForm = reactive({
  checked_values: [],
});

const requiredCheckbox = (rule, value, callback) => {
  const requiredCheckboxesArray = agreementsList.value.filter(
    (item) => item.is_required
  );
  const check = requiredCheckboxesArray.every((item) =>
    agreementsForm.checked_values.includes(item.label)
  );
  if (!check) {
    callback("Zaznacz wymagane pola");
    return;
  }
  showAnnouncements.value = true;
  callback();
};

const unrequiredCheckboxesArray = computed(() =>
  agreementsList.value.filter((item) => !item.is_required)
);

const isExpanded = ref(true);
const checkAll = ref(true);
const ruleFormRef = ref(null);
const rules = reactive({
  checked_values: [
    { validator: requiredCheckbox, trigger: ["blur", "change"] },
  ],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  requiredCheckbox(null, agreementsForm.checked_values, (err) => {
    const valid = !err;
    if (valid) {
      const filteredAgreementsList = agreementsList.value.filter((item) =>
        agreementsForm.checked_values.includes(item.label)
      );
      emits("getFormValues", filteredAgreementsList);
      emits("validateResult", true);
    } else {
      emits("validateResult", false);
    }
    emits("endValidation");
  });
};

const handleCheckAllChange = (checked) => {
  agreementsForm.checked_values = checked
    ? agreementsList.value.map((item) => item.label)
    : [];
  if (!checked) showAnnouncements.value = false;
};

const handleCheckedValuesChange = (checked_values) => {
  setInvoiceEmail();
  const checkedCount = checked_values.length;
  checkAll.value = checkedCount === agreementsList.value.length;
  return checked_values.length;
};

const lastClickedElement = ref(null);
const expandedMap = reactive({});
const toggleExpand = (id) => {
  expandedMap[id] = !expandedMap[id];
};

const beforeEnter = (el) => {
  el.style.height = "0";
  el.style.opacity = "0";
};
const enter = (el) => {
  el.style.transition = "all 200ms ease";
  el.style.height = el.scrollHeight + "px";
  el.style.opacity = "1";
};
const afterEnter = (el) => {
  el.style.height = "auto";
};
const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
};
const leave = (el) => {
  void el.offsetHeight;
  el.style.transition = "all 200ms ease";
  el.style.height = "0";
  el.style.opacity = "0";
};
const afterLeave = (el) => {
  el.style.height = "0";
};

const setLastClickedElement = (element) => {
  lastClickedElement.value = element;
};

onMounted(async () => {
  await getAgreementsList();
  handleCheckAllChange(true);
});
</script>

<template>
  <div class="Agreements">
    <span
      v-if="title"
      class="Agreements__title"
      >Zgody</span
    >

    <div v-if="showAnnouncements">
      <div
        v-for="(item, index) in noDiscountAdded"
        :key="index"
      >
        <div
          v-if="item"
          class="additional-info"
          :style="{ fontWeight: 600 }"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="Agreements__actions">
      <input
        type="checkbox"
        :checked="checkAll"
        @change="
          (e) => {
            checkAll = e.target.checked;
            handleCheckAllChange(e.target.checked);
          }
        "
      />
      <span class="Agreements__actions-title"
        >Akceptuję i zaznaczam wszystkie zgody</span
      >
    </div>
    <div class="TheSeparator" />
    <transition name="fade">
      <div v-if="isExpanded">
        <div class="Agreements__details">
          <div
            v-for="item in agreementsList"
            :key="item.id"
            class="agreement-block"
          >
            <div class="agreement-row">
              <label class="agreement-item">
                <input
                  type="checkbox"
                  :value="item.label"
                  v-model="agreementsForm.checked_values"
                  @change="
                    () => {
                      handleCheckedValuesChange(agreementsForm.checked_values);
                      setLastClickedElement(item);
                    }
                  "
                />
                <span class="agreement-label"
                  >{{ item.title }}
                  <span
                    v-if="item.is_required"
                    class="required-star"
                    >*</span
                  ></span
                >
              </label>
              <button
                class="expand-toggle"
                @click="toggleExpand(item.id)"
                :aria-expanded="!!expandedMap[item.id]"
                :aria-controls="`desc-${item.id}`"
              >
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :style="{
                    transition: 'transform 200ms ease',
                    transform: expandedMap[item.id]
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                    transformOrigin: 'center',
                  }"
                >
                  <path
                    d="M1 1L6 6L11 1"
                    stroke="var(--black100)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <transition
              name="fade"
              @before-enter="beforeEnter"
              @enter="enter"
              @after-enter="afterEnter"
              @before-leave="beforeLeave"
              @leave="leave"
              @after-leave="afterLeave"
            >
              <div
                v-show="expandedMap[item.id]"
                class="agreement-description"
                :id="`desc-${item.id}`"
              >
                {{ item.content }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.Agreements {
  display: block;
}
.Agreements__title {
  font-weight: 600;
  text-align: left;
  margin-bottom: 0.625rem;
  color: var(--black);
}

.Agreements__actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 1rem 0;
}
.Agreements__actions-title {
  font-size: var(--fs-s);
  font-weight: 600;
}

.Agreements__actions input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid var(--black);
  border-radius: 3px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background: transparent;
  transition: none;
}
.Agreements__actions input[type="checkbox"]::after {
  content: "";
  position: absolute;
  top: 0.15rem;
  left: 0.5rem;
  border-right: 3px solid #fff;
  border-bottom: 3px solid #fff;
  background: none;
  width: 0.4rem;
  height: 0.8rem;
  transform: rotate(45deg) scale(0);
  transition: transform 0.15s ease-in;
}
.Agreements__actions input[type="checkbox"]:checked {
  background-color: var(--black);
  border: 1px solid var(--black);
}
.Agreements__actions input[type="checkbox"]:checked::after {
  transform: rotate(45deg) scale(1);
}
.Agreements__actions
  input[type="checkbox"]:checked
  + .Agreements__actions-title {
  color: var(--black);
}

.Agreements__details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 2rem;
}
.agreement-item {
  display: flex;
  gap: 12px;
  align-items: center;
}

.agreement-item input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid var(--black);
  border-radius: 3px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background: transparent;
  transition: none;
}
.agreement-item input[type="checkbox"]::after {
  content: "";
  position: absolute;
  top: 0.15rem;
  left: 0.5rem;
  border-right: 3px solid #fff;
  border-bottom: 3px solid #fff;
  background: none;
  width: 0.4rem;
  height: 0.8rem;
  transform: rotate(45deg) scale(0);
  transition: transform 0.15s ease-in;
}

.agreement-item input[type="checkbox"]:checked {
  background-color: var(--black);
  border: 1px solid var(--black);
}
.agreement-item input[type="checkbox"]:checked::after {
  transform: rotate(45deg) scale(1);
}

.agreement-item input[type="checkbox"]:checked + .agreement-label {
  color: var(--black);
}

.agreement-label {
  font-size: var(--fs-s);
  color: var(--black);
  margin-left: 0.5rem;
  white-space: pre-line;
  text-align: left;
}

.default-font .agreement-label {
  font-size: var(--fs-base);
}

.required-star {
  color: var(--dark-red);
  font-weight: 600;
  margin-left: 6px;
}

.additional-info {
  color: var(--navy);
}

.TheButton {
  margin-top: 12px;
}

.agreement-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.agreement-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.agreement-item {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
}
.expand-toggle {
  background: transparent;
  border: none;
  color: var(--navy);
  font-size: var(--fs-s);
  padding: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.agreement-description {
  padding: 8px 0 12px 0;
  color: var(--dark-grey);
  font-size: var(--fs-s);
  line-height: 1.4;
  width: 100%;
  margin-top: 8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: max-height 0.5s ease;
  overflow: hidden;
}
.fade-enter-from,
.fade-leave-to {
  max-height: 0;
}
.fade-enter-to,
.fade-leave-from {
  max-height: 500px;
}

@media (max-width: 768px) {
  .agreement-item input[type="checkbox"] {
    width: 1.25rem;
    height: 1.25rem;
  }
  .agreement-item input[type="checkbox"]::after {
    top: 0.15rem;
    left: 0.38rem;
    width: 0.26rem;
    height: 0.52rem;
  }
  .agreement-block {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
