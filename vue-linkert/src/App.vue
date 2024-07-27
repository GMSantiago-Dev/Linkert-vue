<template>
 <!--  <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.png" width="600" height="800" />
    </header> -->
  <main>
    <!-- Gráficos de la encuesta Linkert -->
    <div class="charts-container">
      <div v-for="(chart, index) in charts" :key="'linkert' + index" class="chart-item">
        <Chart
          :type="'bar'"
          :data="chart.data"
          :options="chart.options"
        />
      </div>
    </div>

    <!-- Gráficos de las medias de calificaciones -->
    <div class="charts-container">
      <div v-for="(chart, index) in averageCharts" :key="'average' + index" class="chart-item">
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
import Chart from './components/Chart.vue';
import linkert from './components/Linkert.vue'; // Asegúrate de que este componente esté bien configurado
const charts = ref([]);
const averageCharts = ref([]);

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

// Función para calcular las medias de las calificaciones para cada pregunta
const calculateAverages = (data) => {
  const totals = {
    question_1: 0,
    question_2: 0,
    question_3: 0,
    question_4: 0,
  };
  const counts = {
    question_1: 0,
    question_2: 0,
    question_3: 0,
    question_4: 0,
  };

  data.forEach(entry => {
    for (let i = 1; i <= 4; i++) {
      totals[`question_${i}`] += entry[`question_${i}`];
      counts[`question_${i}`]++;
    }
  });

  return {
    question_1: totals.question_1 / counts.question_1,
    question_2: totals.question_2 / counts.question_2,
    question_3: totals.question_3 / counts.question_3,
    question_4: totals.question_4 / counts.question_4,
  };
};

// Función para calcular la distribución de respuestas para cada pregunta
const calculateDistribution = (data, question) => {
  const distribution = [0, 0, 0, 0, 0]; // Para preguntas con hasta 5 opciones
  data.forEach(entry => {
    distribution[entry[question] - 1] += 1;
  });
  return distribution;
};

// Función para crear los gráficos
const createCharts = (data) => {
  // Gráficos Linkert
  charts.value = [
    {
      data: {
        labels: ['Raramente', 'Ocasionalmente', 'Frecuentemente', 'Muy frecuentemente'],
        datasets: [{
          label: 'Linkert 1',
          data: calculateDistribution(data, 'question_1'),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true, // Hacer que el gráfico sea responsive
        scales: {
          y: {
            beginAtZero: true,
            
          }
        }
      }
    },
    {
      data: {
        labels: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutro', 'De acuerdo', 'Totalmente de acuerdo'],
        datasets: [{
          label: 'Linkert 2',
          data: calculateDistribution(data, 'question_2'),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true, // Hacer que el gráfico sea responsive
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
          label: 'Linkert 3',
          data: calculateDistribution(data, 'question_3'),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true, // Hacer que el gráfico sea responsive
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
          label: 'Linkert 4',
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

  // Gráficos de medias
  averageCharts.value = ['question_1', 'question_2', 'question_3', 'question_4'].map((question, index) => ({
    data: {
      labels: ['Average Rating'],
      datasets: [{
        label: `Rango de Linkert ${index + 1}`,
        data: [calculateAverages(data)[question]],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true, // Hacer que el gráfico sea responsive
      scales: {
        y: {
          beginAtZero: true,
          max: 5 // Assuming rating is out of 5
        }
      }
    }
  }));
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


/* Estilo para cada contenedor de gráfico */
.chart-wrapper {
  flex: 1 1 300px; /* Los gráficos crecerán y se ajustarán en un tamaño mínimo de 300px */
  max-width: 600px; /* Tamaño máximo del gráfico */
  margin: 1rem; /* Espacio alrededor de cada gráfico */
}

/* Estilo para el canvas */
canvas {
  width: 100% !important; /* Asegúrate de que el canvas ocupe el ancho del contenedor */
  height: auto !important; /* Mantiene la relación de aspecto */
}
.charts-container {
  display: flex;
  flex-direction: row; /* Alinea los elementos en fila */
  gap: 40px; /* Espacio entre los gráficos */
  justify-content: flex-start; /* Alinea los gráficos al inicio del contenedor */
  flex-wrap: wrap; /* Permite que los gráficos se envuelvan si no hay suficiente espacio */
}

.chart-item {
  flex: 1;
  min-width: 200px; /* Ajusta este valor según el ancho mínimo deseado para cada gráfico */
  max-width: 100%; /* Evita que los gráficos se desborden del contenedor */
  /* box-sizing: border-box; Asegura que el padding y el border se incluyan en el tamaño total */
}
</style>


