import { Container, Title } from "@mantine/core";
import { TopHistoryContainer } from "./components/TopHistoryContainer/TopHistoryContainer";

export const App = () => (
  <Container 
      size="100%" 
      p="md" 
      style={{ 
        minWidth: 375,
        height: '100%',
        width: 1920,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Title order={1} mb="xl" ta="center">App Store Top History</Title>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopHistoryContainer />
      </div>
    </Container>
);
