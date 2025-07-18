import React from 'react';
import { Select } from '@mantine/core';
import { useGetGeoQuery } from './geoSlice';

export const GeoSelector = ({ value, onChange }) => {
  const { data, isLoading } = useGetGeoQuery();

  if (isLoading) return <Select label="Loading countries..." disabled />;

  const options = data?.data?.list?.map((geo) => ({
    value: String(geo.id),
    label: geo.title,
  })) || [];

  return (
    <Select
      label="Select Country"
      placeholder="Choose a country"
      data={options}
      value={value}
      onChange={onChange}
    />
  );
}
