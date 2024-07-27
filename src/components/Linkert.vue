<template>
    <main>
        <div class="charts-container">

      <div v-for="(chart, index) in charts" :key="index">
        <Chart
          :type="'bar'"
          :data="chart.data"
          :options="chart.options"
        />
      </div>
    </div>
    </main>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import Chart from './Chart.vue';
  
  // Crea una referencia para los gráficos
  const charts = ref([]);
  
  const token = 'aDLqFCTWmxAECRQoN904dRDSK7yzGilkHCHYejWFe2d7c35a'; // Reemplaza con tu token de autenticación
  
  // Función para obtener datos de la API
  const fetchData = async () => {
    try {
      const response = await axios.get('/linkert', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Función para calcular la distribución de respuestas
  const calculateDistribution = (data, question) => {
    const distribution = [0, 0, 0, 0, 0]; // Para preguntas con hasta 5 opciones
    data.forEach(entry => {
      distribution[entry[question] - 1] += 1;
    });
    return distribution;
  };
  
  // Función para crear los gráficos
  const createCharts = (data) => {
    charts.value = [
      {
        data: {
          labels: ['Raramente', 'Ocasionalmente', 'Frecuentemente', 'Muy frecuentemente'],
          datasets: [{
            label: 'Question 1',
            data: calculateDistribution(data, 'question_1'),
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
      },
      {
        data: {
          labels: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutro', 'De acuerdo', 'Totalmente de acuerdo'],
          datasets: [{
            label: 'Question 2',
            data: calculateDistribution(data, 'question_2'),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
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
      },
      {
        data: {
          labels: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutro', 'De acuerdo', 'Totalmente de acuerdo'],
          datasets: [{
            label: 'Question 3',
            data: calculateDistribution(data, 'question_3'),
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
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
      },
      {
        data: {
          labels: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutro', 'De acuerdo', 'Totalmente de acuerdo'],
          datasets: [{
            label: 'Question 4',
            data: calculateDistribution(data, 'question_4'),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
      }
    ];
  };
  
  // Función para inicializar los gráficos al montar el componente
  const init = async () => {
    const data = await fetchData();
    createCharts(data);
  };
  
  onMounted(init);
  </script>
  
  <style scoped>
  header {
    line-height: 1.5;
  }
  
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
  
  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }
  
    .logo {
      margin: 0 2rem 0 0;
    }
  
    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }
  </style>
  