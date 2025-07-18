import { Alert, Text } from "@mantine/core";

export const ErrorAlert = ({ error }) => {
  if (!error) return null;

  return (
    <Alert color="red" mb="md">
      <Text size="sm">{error}</Text>
    </Alert>
  );
};