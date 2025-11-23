<script setup>
import { ref, computed, watch } from "vue";
import API from "../../config/api";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const i = ref(0)
const current = computed(() => {
  if (!Array.isArray(props.images) || props.images.length === 0) return null;
  const idx = Math.max(0, Math.min(i.value, props.images.length - 1));
  return props.images[idx] || null;
});

watch(
  () => props.images,
  (val) => {
    if (!Array.isArray(val) || val.length === 0) {
      i.value = 0;
    } else if (i.value >= val.length) {
      i.value = 0;
    }
  },
  { immediate: true }
);

const select = (idx) => (i.value = idx);
const next = () => {
  i.value = (i.value + 1) % props.images.length;
}
const prev = () => {
  i.value = (i.value - 1 + props.images.length) % props.images.length;
};

const extractImageString = (img) => {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object") {
    return (
      img.path || img.url || img.filename || img.name || img.src || img.file || img.main_image || img.title || ""
    );
  }
  return "";
};

const getCarImage = (img) => {
  const resolved = extractImageString(img);
  if (!resolved) return "";
  if (/^(https?:)?\/\//.test(resolved)) return resolved;
  if (resolved.includes("/storage/")) {
    try {
      const origin = String(API.defaults.baseURL).replace(/\/api\/?$/, "");
      return resolved.startsWith("/") ? origin + resolved : origin + "/" + resolved;
    } catch (e) {
      return resolved;
    }
  }
  try {
    return new URL(`../../assets/${resolved}`, import.meta.url).href;
  } catch (e) {
    return resolved;
  }
};

const filteredImages = computed(() =>
  (Array.isArray(props.images) ? props.images : [])
    .map((img, idx) => ({ img, idx }))
    .filter((t) => t.idx !== i.value)
);

const placeholder = (() => {
  try {
    return new URL(`../../assets/mainCarImage.png`, import.meta.url).href;
  } catch (e) {
    return "";
  }
})();
</script>

<template>
  <div class="d-flex flex-column gap-3">
    <div
      class="position-relative overflow-hidden main-image"
      style="border-radius: 8px"
      tabindex="0"
      @keydown.left.prevent="prev"
      @keydown.right.prevent="next"
    >
      <img
        style="object-fit: cover; border-radius: 8px"
        v-if="current"
        :src="getCarImage(current)"
        @error="(e) => { e.target.src = placeholder }"
        alt="Zdjęcie samochodu"
        class="w-100 d-block"
        loading="eager"
      />
    </div>
    <div class="d-flex flex-wrap images-wrap">
      <button
        v-for="t in filteredImages"
        :key="t.img"
        type="button"
        class="p-0 border-0 bg-transparent overflow-hidden thumb-btn"
        style="border-radius: 8px"
        @click="select(t.idx)"
      >
        <img
          :src="getCarImage(t.img)"
          @error="(e) => { e.target.src = placeholder }"
          alt="Miniatura"
          class="d-block thumb-image"
          loading="lazy"
        />
      </button>
    </div>
  </div>
</template>
<style scoped>
.main-image {
  height: 372px;
}
.thumb-image {
  width: 200px;
  height: 120px;
  object-fit: cover;
}
.images-wrap {
  gap: 30px;
}
@media (max-width: 1120px) {
  .main-image {
    height: auto;
  }
  .images-wrap {
    justify-content: space-between;
  }
}
</style>
