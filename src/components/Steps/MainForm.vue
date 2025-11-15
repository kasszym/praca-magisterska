<script setup>
import { ref, computed, watchEffect } from "vue";
import { useValidator } from "../../composables/validator";

const ruleFormRef = ref(null);
const { peselValidator, postCodeValidator } = useValidator();

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
</script>

<template>
  <div class="step-two-content">
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="180px"
      class="step-two-form"
    >
      <div class="form-section">
        <h3 class="section-title">Dane osobowe</h3>
        <el-form-item
          label="Imię"
          prop="firstName"
        >
          <el-input
            v-model="form.firstName"
            placeholder="Imię"
          />
        </el-form-item>

        <el-form-item
          label="Nazwisko"
          prop="lastName"
        >
          <el-input
            v-model="form.lastName"
            placeholder="Nazwisko"
          />
        </el-form-item>

        <el-form-item
          label="PESEL"
          prop="pesel"
        >
          <el-input
            v-model="form.pesel"
            placeholder="PESEL"
            maxlength="11"
            @input="form.pesel = form.pesel.replace(/\D/g, '')"
          />
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">Adres zamieszkania</h3>
        <el-form-item
          label="Ulica"
          prop="street"
        >
          <el-input
            v-model="form.street"
            placeholder="Ulica"
          />
        </el-form-item>

        <el-form-item
          label="Numer domu"
          prop="houseNumber"
        >
          <el-input
            v-model="form.houseNumber"
            placeholder="Numer domu"
          />
        </el-form-item>

        <el-form-item
          label="Numer mieszkania"
          prop="apartmentNumber"
        >
          <el-input
            v-model="form.apartmentNumber"
            placeholder="Numer mieszkania"
          />
        </el-form-item>

        <el-form-item
          label="Kod pocztowy"
          prop="postCode"
        >
          <el-input
            v-model="form.postCode"
            placeholder="00-000"
            maxlength="6"
          />
        </el-form-item>

        <el-form-item
          label="Miejscowość"
          prop="city"
        >
          <el-input
            v-model="form.city"
            placeholder="Miejscowość"
          />
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">Kontakt</h3>
        <el-form-item
          label="E-mail"
          prop="email"
        >
          <el-input
            v-model="form.email"
            type="email"
            placeholder="E-mail"
          />
        </el-form-item>

        <el-form-item
          label="Telefon komórkowy"
          prop="phone"
        >
          <el-input
            v-model="form.phone"
            placeholder="Telefon komórkowy"
            @input="form.phone = form.phone.replace(/\D/g, '')"
          />
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">E-mail do faktury</h3>
        <el-form-item
          label="E-mail do faktury"
          prop="invoiceEmailOption"
        >
          <el-radio-group v-model="form.invoiceEmailOption">
            <el-radio label="same">Taki sam jak adres e-mail</el-radio>
            <el-radio label="different">Inny</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="showInvoiceEmailInput"
          label="E-mail do faktury"
          prop="invoiceEmail"
        >
          <el-input
            v-model="form.invoiceEmail"
            type="email"
            placeholder="E-mail do faktury"
          />
        </el-form-item>
      </div>

      <div class="form-section">
        <h3 class="section-title">Adres korespondencyjny</h3>
        <el-form-item
          label="Adres korespondencyjny"
          prop="correspondenceAddressOption"
        >
          <el-radio-group v-model="form.correspondenceAddressOption">
            <el-radio label="same">Taki sam jak zamieszkania</el-radio>
            <el-radio label="different">Inny</el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="showCorrespondenceAddress">
          <el-form-item
            label="Ulica"
            prop="correspondenceStreet"
          >
            <el-input
              v-model="form.correspondenceStreet"
              placeholder="Ulica"
            />
          </el-form-item>

          <el-form-item
            label="Numer domu"
            prop="correspondenceHouseNumber"
          >
            <el-input
              v-model="form.correspondenceHouseNumber"
              placeholder="Numer domu"
            />
          </el-form-item>

          <el-form-item
            label="Numer mieszkania"
            prop="correspondenceApartmentNumber"
          >
            <el-input
              v-model="form.correspondenceApartmentNumber"
              placeholder="Numer mieszkania"
            />
          </el-form-item>

          <el-form-item
            label="Kod pocztowy"
            prop="correspondencePostCode"
          >
            <el-input
              v-model="form.correspondencePostCode"
              placeholder="00-000"
              maxlength="6"
            />
          </el-form-item>

          <el-form-item
            label="Miejscowość"
            prop="correspondenceCity"
          >
            <el-input
              v-model="form.correspondenceCity"
              placeholder="Miejscowość"
            />
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
  font-size: var(--fs-l);
  color: var(--navy);
  margin-bottom: 20px;
  font-weight: 600;
}

:deep(.el-form-item__label) {
  color: var(--dark-grey);
  font-size: var(--fs-s);
  font-weight: 500;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  border: 1px solid var(--grey);
  box-shadow: none;
}

:deep(.el-input__wrapper:hover) {
  border-color: var(--navy);
}

:deep(.el-input__wrapper.is-focus) {
  border-color: var(--navy);
  box-shadow: none;
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
