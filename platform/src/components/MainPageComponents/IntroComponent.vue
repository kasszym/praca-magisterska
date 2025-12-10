<script setup>
import SectionCard from "../common/SectionCard.vue";
import ButtonComponent from "../common/ButtonComponent.vue";
</script>
<template>
  <SectionCard>
    <template #content>
      <div class="row g-2 align-items-stretch">
        <div
          class="col-12 col-lg-auto d-flex content-col"
          style="max-width: 526px"
        >
          <div class="d-flex flex-column gap-2-5 flex-grow-1 h-100">
            <span class="headline">Moc spotyka efektywność</span>
            <span class="subhead">
              Odkryj nową linię Aureon e-Line – zaprojektowaną z myślą o
              mieście i długich trasach
            </span>
            <span class="bodycopy">
              Aureon e-Line to zupełnie nowa generacja samochodów
              elektrycznych, łączących dynamiczne osiągi z wyjątkową
              energooszczędnością. <br />
              Zaprojektowana w oparciu o najnowsze technologie, oferuje nie
              tylko imponujący zasięg, ale też komfort jazdy na najwyższym
              poziomie. Nowoczesne systemy wspomagania kierowcy sprawiają, że
              każda podróż staje się bezpieczniejsza i bardziej intuicyjna.
              <br />
              Elegancka sylwetka i dopracowane detale nadwozia podkreślają
              charakter premium marki Aureon.
            </span>

            <div class="mt-auto">
              <ButtonComponent
                title="Sprawdź szczegóły"
                width="195px"
              />
            </div>
          </div>
        </div>

        <div class="col-12 col-lg d-flex">
          <div class="image-wrap ms-lg-auto">
            <img
              src="../../assets/car.png"
              alt="car"
              class="img-fluid d-block w-100"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </template>
  </SectionCard>
</template>

<style scoped>
.headline {
  color: var(--navy);
  font-size: 44px;
  font-weight: 700;
  font-family: var(--font-roboto), sans-serif;
}
.subhead {
  font-size: var(--fs-base);
  color: var(--black);
}
.bodycopy {
  font-size: var(--fs-base);
  color: var(--dark-grey);
}
.image-wrap {
  width: 100%;
  max-width: 582px;
  overflow: hidden;
}
.image-wrap img {
  border-radius: var(--border-radius);
}
@media (max-width: 1000px) {
  .content-col {
    max-width: 100% !important;
  }
  .image-wrap {
    margin: auto;
  }
}
</style>
