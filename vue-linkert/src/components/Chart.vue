<!-- Chart.vue -->
<template>
    <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Chart, registerables } from 'chart.js';
  
  // Registra los componentes necesarios de Chart.js
  Chart.register(...registerables);
  
  const props = defineProps({
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  });
  
  const chartCanvas = ref(null);
  
  onMounted(() => {
    const ctx = chartCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: props.type,
      data: props.data,
      options: props.options
    });
  });
  </script>
  
  <style scoped>
  canvas {
    max-width: 600px;
    margin: auto;
    margin-bottom: 2rem;
  }
  
  </style>
  