import { Alert, Text } from "@mantine/core";

export const EmptyState = ({ loading }) => {
  if (loading) return null;

  return (
    <Alert color="yellow" mb="md" style={{ flex: 'none' }}>
      <Text size="sm">Для выбранной страны данные диаграммы недоступны.</Text>
    </Alert>
  );
};