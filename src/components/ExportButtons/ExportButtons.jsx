import { Button, Group } from "@mantine/core";

export const ExportButtons = ({ chartData }) => {
  const exportCSV = () => {
    if (!chartData) return;
    
    const headers = ['Date', ...chartData.datasets.map(ds => ds.label)];
    const rows = chartData.labels.map((date, i) => {
      const row = [date];
      chartData.datasets.forEach(ds => row.push(ds.data[i]));
      return row.join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'top_history.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPNG = () => {
    const chart = document.querySelector("canvas");
    if (!chart) return;
    const link = document.createElement("a");
    link.href = chart.toDataURL("image/png");
    link.download = "top_history.png";
    link.click();
  };

  return (
    <Group mb="md" wrap="wrap">
      <Button onClick={exportCSV}>Export CSV</Button>
      <Button onClick={exportPNG}>Export PNG</Button>
    </Group>
  );
};