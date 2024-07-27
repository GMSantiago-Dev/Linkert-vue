<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <!-- <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div> -->
  </header>

  <main>
    <!-- <TheWelcome /> -->
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';

// Registra los componentes necesarios de Chart.js
Chart.register(...registerables);

const chart = ref(null);
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

// Función para crear el gráfico
const createChart = (data) => {
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar', // Puedes cambiar el tipo de gráfico según tus necesidades
    data: {
      labels: ['Question 1', 'Question 2', 'Question 3', 'Question 4'],
      datasets: [{
        label: 'Ratings',
        data: [
          data.question_1,
          data.question_2,
          data.question_3,
          data.question_4
        ],
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
};

// Función para inicializar el gráfico al montar el componente
const init = async () => {
  const data = await fetchData();
  createChart(data);
};

init();
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

canvas {
  max-width: 600px;
  margin: auto;
}
</style>
