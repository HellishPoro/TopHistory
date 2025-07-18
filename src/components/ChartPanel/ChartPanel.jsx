import { Paper, Loader, Flex } from "@mantine/core";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ChartPanel = ({ loading, chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        reverse: true,
        min: 1,
        max: 200,
        ticks: {
          stepSize: 20
        }
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
  };

  return (
    <Paper p="md" style={{ flex: 1, display: 'flex', minHeight: 365, maxHeight: 800, maxWidth: 1920 }}>
      {loading ? (
        <Flex justify="center" align="center" style={{ flex: 1 }}>
          <Loader />
        </Flex>
      ) : chartData ? (
        <div style={{ position: 'relative', height: '100%', width: '100%', minHeight: 365, justifyContent: 'center' }}>
          <Line 
            options={options} 
            data={chartData} 
            style={{ width: '100%', height: '100%' }} 
          />
        </div>
      ) : (
        <Flex justify="center" align="center" style={{ flex: 1 }}>
          <div>No data to display</div>
        </Flex>
      )}
    </Paper>
  );
};