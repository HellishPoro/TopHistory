import { Paper, Flex, Group, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import 'dayjs/locale/en';
import dayjs from 'dayjs';

export const FiltersPanel = ({
  countries,
  selectedCountry,
  dateRange,
  setSelectedCountry,
  setDateRange,
  loading,
}) => {
  return (
    <Paper shadow="sm" p="md" mb="md">
      <Flex direction="column" gap="md">
        <Group grow wrap="nowrap" style={{ flexWrap: 'wrap' }}>
          <Select
            label="Country"
            data={countries}
            value={selectedCountry}
            onChange={setSelectedCountry}
            searchable
            nothingFoundMessage="No countries found"
            style={{ minWidth: 200, flex: 1 }}
            disabled={loading}
          />
          <DatePickerInput
            type="range"
            label="Period"
            value={dateRange}
            onChange={setDateRange}
            minDate={dayjs().subtract(30, 'days').toDate()}
            maxDate={new Date()}
            locale="en"
            clearable={false}
            valueFormat="YYYY-MM-DD"
            allowSingleDateInRange
            style={{ minWidth: 250, flex: 1 }}
            disabled={loading}
          />
        </Group>
      </Flex>
    </Paper>
  );
};