import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function App() {
  const [clusters, setClusters] = useState([]);
  const [numClusters, setNumClusters] = useState(3);
  const [data, setData] = useState({});

  // Función para obtener los datos del backend
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cluster?k=${numClusters}`);
      setClusters(response.data.clusters);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [numClusters]);

  // Configurar los datos para el gráfico
  const chartData = {
    datasets: clusters.map((cluster, index) => ({
      label: `Cluster ${cluster}`,
      data: data.bill_length_mm
        .filter((_, i) => clusters[i] === cluster)
        .map((bill_length, i) => ({
          x: bill_length,
          y: data.flipper_length_mm[i],
        })),
      backgroundColor: `hsl(${(cluster * 120) % 360}, 70%, 50%)`,
    })),
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Agrupamiento de Pingüinos</h1>
      <div>
        <label>
          Número de Clusters (K):
          <input
            type="number"
            value={numClusters}
            onChange={(e) => setNumClusters(parseInt(e.target.value))}
            min="2"
            max="6"
          />
        </label>
      </div>
      <div style={{ width: '1000px', height: '600px', margin: '0 auto' }}>
        <Scatter
          data={chartData}
          options={{
            scales: {
              x: { title: { display: true, text: 'Longitud del Pico (mm)' } },
              y: { title: { display: true, text: 'Longitud de la Aleta (mm)' } },
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;