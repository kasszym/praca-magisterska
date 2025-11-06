<script setup>
import Header from "./components/Header.vue";
import IntroComponent from "./components/MainPageComponents/IntroComponent.vue";
import CarRanges from "./components/CarRange.vue/CarRanges.vue";
import PromoBanner from "./components/PromoBanner.vue";
import InfoComponent from "./components/InfoComponent/InfoComponent.vue";
import OutroComponent from "./components/OutroComponent.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div>
    <Header />
    <main
      class="container-fluid px-3"
      style="margin: 32px auto 18px auto"
    >
      <div class="app-container mx-auto d-flex flex-column gap-4 gap-md-5">
        <IntroComponent />
        <CarRanges />
        <PromoBanner />
        <InfoComponent />
        <OutroComponent />
      </div>
    </main>
    <Footer />
  </div>
</template>
<style scoped>
.app-container {
  max-width: var(--app-width) !important;
  width: 100%;
}
</style>
