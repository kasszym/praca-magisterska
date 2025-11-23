<script setup>
import { ref, computed, watchEffect, onMounted, watch } from "vue";
import { useValidator } from "../../composables/validator";
import { useSummary } from "../../composables/useSummary";

const ruleFormRef = ref(null);
const { peselValidator, postCodeValidator } = useValidator();
const { setPersonalData } = useSummary();

const form = ref({
  firstName: "",
  lastName: "",
  pesel: "",
  street: "",
  houseNumber: "",
  apartmentNumber: "",
  postCode: "",
  city: "",
  email: "",
  phone: "",
  invoiceEmailOption: "same",
  invoiceEmail: "",
  correspondenceAddressOption: "same",
  correspondenceStreet: "",
  correspondenceHouseNumber: "",
  correspondenceApartmentNumber: "",
  correspondencePostCode: "",
  correspondenceCity: "",
});

const rules = ref({});

watchEffect(() => {
  const baseRules = {
    firstName: [
      { required: true, message: "Imię jest wymagane", trigger: "blur" },
    ],
    lastName: [
      { required: true, message: "Nazwisko jest wymagane", trigger: "blur" },
    ],
    pesel: [
      { required: true, message: "PESEL jest wymagany", trigger: "blur" },
      { validator: peselValidator, trigger: "blur" },
    ],
    street: [
      { required: true, message: "Ulica jest wymagana", trigger: "blur" },
    ],
    houseNumber: [
      { required: true, message: "Numer domu jest wymagany", trigger: "blur" },
    ],
    apartmentNumber: [],
    postCode: [
      {
        required: true,
        message: "Kod pocztowy jest wymagany",
        trigger: "blur",
      },
      { validator: postCodeValidator, trigger: "blur" },
    ],
    city: [
      { required: true, message: "Miejscowość jest wymagana", trigger: "blur" },
    ],
    email: [
      { required: true, message: "E-mail jest wymagany", trigger: "blur" },
      {
        type: "email",
        message: "Nieprawidłowy format e-mail",
        trigger: "blur",
      },
    ],
    phone: [
      {
        required: true,
        message: "Telefon komórkowy jest wymagany",
        trigger: "blur",
      },
    ],
    invoiceEmailOption: [
      { required: true, message: "Wybierz opcję", trigger: "change" },
    ],
    invoiceEmail: [],
    correspondenceAddressOption: [
      { required: true, message: "Wybierz opcję", trigger: "change" },
    ],
    correspondenceStreet: [],
    correspondenceHouseNumber: [],
    correspondenceApartmentNumber: [],
    correspondencePostCode: [],
    correspondenceCity: [],
  };

  if (form.value.invoiceEmailOption === "different") {
    baseRules.invoiceEmail = [
      {
        required: true,
        message: "E-mail do faktury jest wymagany",
        trigger: "blur",
      },
      {
        type: "email",
        message: "Nieprawidłowy format e-mail",
        trigger: "blur",
      },
    ];
  }

  if (form.value.correspondenceAddressOption === "different") {
    baseRules.correspondenceStreet = [
      { required: true, message: "Ulica jest wymagana", trigger: "blur" },
    ];
    baseRules.correspondenceHouseNumber = [
      { required: true, message: "Numer domu jest wymagany", trigger: "blur" },
    ];
    baseRules.correspondencePostCode = [
      {
        required: true,
        message: "Kod pocztowy jest wymagany",
        trigger: "blur",
      },
      { validator: postCodeValidator, trigger: "blur" },
    ];
    baseRules.correspondenceCity = [
      { required: true, message: "Miejscowość jest wymagana", trigger: "blur" },
    ];
  }

  rules.value = baseRules;
});

const showInvoiceEmailInput = computed(
  () => form.value.invoiceEmailOption === "different"
);
const showCorrespondenceAddress = computed(
  () => form.value.correspondenceAddressOption === "different"
);

// Watch form changes and save to summary
watch(
  form,
  (newForm) => {
    setPersonalData({ ...newForm });
  },
  { deep: true }
);

// Expose validation method for parent component
const validateForm = async () => {
  if (!ruleFormRef.value) return false;
  try {
    await ruleFormRef.value.validate();
    return true;
  } catch (error) {
    return false;
  }
};

defineExpose({ validateForm });

function markHasValue(e) {
  const target = e && e.target ? e.target : e;
  const content = target.closest && target.closest('.el-form-item__content') ? target.closest('.el-form-item__content') : target.parentElement && target.parentElement.closest('.el-form-item__content');
  if (!content) return;
  if (e && e.type === 'focus') {
    content.classList.add('focused');
  } else if (e && e.type === 'blur') {
    content.classList.remove('focused');
  }

  if (target.value && String(target.value).length > 0) content.classList.add('has-value');
  else content.classList.remove('has-value');
}

onMounted(() => {
  const inputs = document.querySelectorAll('.step-two-content .el-input__inner');
  inputs.forEach((inp) => {
    try {
      const content = inp.closest('.el-form-item__content');
      if (content && inp.value && inp.value.length > 0) content.classList.add('has-value');
    } catch (e) {}
  });
});
</script>

<template>
  <div class="step-two-content">
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="0"
      class="step-two-form"
    >
      <div class="form-section">
        <h3 class="section-title">Dane osobowe</h3>
        <el-form-item
          prop="firstName"
        >
            <label class="form-label">Imię</label>
            <el-input
              v-model="form.firstName"
              @input="markHasValue"
              @focus="markHasValue"
              @blur="markHasValue"
            />
        </el-form-item>

        <el-form-item
          prop="lastName"
        >
            <label class="form-label">Nazwisko</label>
            <el-input
              v-model="form.lastName"
              @input="markHasValue"
              @focus="markHasValue"
              @blur="markHasValue"
            />
        </el-form-item>

        <el-form-item
          prop="pesel"
        >
            <label class="form-label">PESEL</label>
            <el-input
              v-model="form.pesel"
              maxlength="11"
              @input="(e)=>{ form.pesel = e.target.value.replace(/\D/g, ''); markHasValue(e) }"
              @focus="markHasValue"
              @blur="markHasValue"
            />
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">Adres zamieszkania</h3>
        <el-form-item
          prop="street"
        >
            <label class="form-label">Ulica</label>
            <el-input v-model="form.street" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
        </el-form-item>

        <el-form-item
          prop="houseNumber"
        >
            <label class="form-label">Numer domu</label>
            <el-input v-model="form.houseNumber" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
        </el-form-item>

        <el-form-item
          prop="apartmentNumber"
        >
            <label class="form-label">Numer mieszkania</label>
            <el-input v-model="form.apartmentNumber" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
        </el-form-item>

        <el-form-item
          prop="postCode"
        >
            <label class="form-label">00-000</label>
            <el-input v-model="form.postCode" maxlength="6" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
        </el-form-item>

        <el-form-item
          prop="city"
        >
            <label class="form-label">Miejscowość</label>
            <el-input v-model="form.city" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">Kontakt</h3>
        <el-form-item
          prop="email"
        >
            <label class="form-label">E-mail</label>
            <el-input v-model="form.email" type="email" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
        </el-form-item>

        <el-form-item
          prop="phone"
        >
            <label class="form-label">Telefon komórkowy</label>
            <el-input v-model="form.phone" @input="(e)=>{ form.phone = e.target.value.replace(/\D/g, ''); markHasValue(e) }" @focus="markHasValue" @blur="markHasValue" />
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">E-mail do faktury</h3>
        <el-form-item
          prop="invoiceEmailOption"
        >
          <el-radio-group v-model="form.invoiceEmailOption" class="version-group">
            <el-radio-button label="same">Taki sam jak adres e-mail</el-radio-button>
            <el-radio-button label="different">Inny</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="showInvoiceEmailInput"
          prop="invoiceEmail"
        >
            <label class="form-label">E-mail do faktury</label>
            <el-input v-model="form.invoiceEmail" type="email" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">Adres korespondencyjny</h3>
        <el-form-item
          prop="correspondenceAddressOption"
        >
          <el-radio-group v-model="form.correspondenceAddressOption" class="version-group">
            <el-radio-button label="same">Taki sam jak zamieszkania</el-radio-button>
            <el-radio-button label="different">Inny</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <template v-if="showCorrespondenceAddress">
          <el-form-item
            prop="correspondenceStreet"
          >
            <label class="form-label">Ulica</label>
            <el-input v-model="form.correspondenceStreet" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
          </el-form-item>

          <el-form-item
            prop="correspondenceHouseNumber"
          >
            <label class="form-label">Numer domu</label>
            <el-input v-model="form.correspondenceHouseNumber" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
          </el-form-item>

          <el-form-item
            prop="correspondenceApartmentNumber"
          >
            <label class="form-label">Numer mieszkania</label>
            <el-input v-model="form.correspondenceApartmentNumber" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
          </el-form-item>

          <el-form-item
            prop="correspondencePostCode"
          >
            <label class="form-label">Kod pocztowy</label>
            <el-input v-model="form.correspondencePostCode" maxlength="6" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
          </el-form-item>

          <el-form-item
            prop="correspondenceCity"
          >
            <label class="form-label">Miejscowość</label>
            <el-input v-model="form.correspondenceCity" @input="markHasValue" @focus="markHasValue" @blur="markHasValue" />
          </el-form-item>
        </template>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.step-two-content {
  min-width: 0;
}

.form-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: var(--fs-base);
  color: var(--black);
  margin-bottom: 20px;
  font-weight: 600;
}

.StepTwo {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.StepTwo__form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.StepTwo__form-title {
  text-align: left;
  margin-bottom: .625rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--black);
}

.form-label {
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 1.25rem;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  font-size: var(--fs-s);
  color: var(--dark-grey);
}

:deep(.el-radio) {
  margin-right: 24px;
  margin-bottom: 12px;
}

:deep(.el-radio__label) {
  color: var(--navy);
  font-size: var(--fs-s);
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
  background-color: var(--main-color);
  border-color: var(--main-color);
}

@media (max-width: 768px) {
  .step-two-form {
    padding: 16px;
  }

  :deep(.el-form-item) {
    margin-bottom: 20px;
  }
}
</style>
