<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  data() {
    return {
      chart: null,
      token: 'aDLqFCTWmxAECRQoN904dRDSK7yzGilkHCHYejWFe2d7c35a'  // Reemplaza con tu token de autenticación
    };
  },
  async mounted() {
    await this.fetchData();
    this.createChart();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('/reviews', {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json',
          }
        });
        this.data = response.data;
        this.updateChart();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    createChart() {
      const ctx = document.getElementById('myChart').getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar', // Puedes cambiar el tipo de gráfico según tus necesidades
        data: {
          labels: ['Question 1', 'Question 2', 'Question 3', 'Question 4'],
          datasets: [{
            label: 'Ratings',
            data: [], // Los datos se actualizarán después de obtenerlos de la API
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
    updateChart() {
      if (this.chart) {
        this.chart.data.datasets[0].data = [
          this.data.question_1,
          this.data.question_2,
          this.data.question_3,
          this.data.question_4
        ];
        this.chart.update();
      }
    }
  }
};
</script>

<style scoped>
canvas {
  max-width: 600px;
  margin: auto;
}
</style>
