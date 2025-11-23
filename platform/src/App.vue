<script setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const headerRef = ref(null);

const handleShowLoginModal = () => {
  if (headerRef.value) {
    headerRef.value.openLoginModal();
  }
};
</script>

<template>
  <div>
    <Header ref="headerRef" />
    <router-view @showLoginModal="handleShowLoginModal" />
    <Footer />
  </div>
</template>

<style scoped>
.app-container {
  max-width: var(--app-width) !important;
  width: 100%;
}
</style>
