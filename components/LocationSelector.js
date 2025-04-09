import { useState } from 'react';
import Select from 'react-select'; 
import locations from '../data/locations.json'; // Import locations data


const LocationSelector = ({ onSelectLocation }) => {
  const [selected, setSelected] = useState(null);
   // Group by state
  const groupMap = locations.reduce((groups, location) => {
      const state = location.state || 'Other';
      if (!groups[state]) {
        groups[state] = { label: state, options: [] };
      }

      groups[state].options.push({
        value: location.id,
        label: location.name,
      });
      return groups;
    }, {}
  ); // Sort by state name

  const groupedOptions = Object.values(groupMap).sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    onSelectLocation(selectedOption.value);
  };

  return (
    <div className="mb-6">
      <label htmlFor="location" className="block text-lg font-semibold mb-2">
        Search or Select a Location:
      </label>
      <Select
        placeholder="Type or choose a location..."
        id="location"
        options={groupedOptions}
        value={selected}
        onChange={handleChange}
        className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        isSearchable
        styles={{
          control: (base) => ({
            ...base,
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#3b82f6',
          },
          }),
        }}
      />
      
    </div>
  );
};

export default LocationSelector;
