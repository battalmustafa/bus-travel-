import React, { useState, useEffect, useRef } from 'react';
import { useGetBusLocations } from '../../../hooks/useGetBusLocations';
import useDebounce from '../../../hooks/useDebounce';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface LocationSelectorProps {
  label: string;
  value: string;
  onChange: (id: string, name: string) => void;
  className: string;
  locationId: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  label,
  value,
  onChange,
  className,
  locationId,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [displayValue, setDisplayValue] = useState<string>('');
  const { locations, loading, refetch } = useGetBusLocations(searchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isSearching = searchTerm !== displayValue;

  // Trigger refetch based on debounced search term
  useEffect(() => {
    if (debouncedSearchTerm !== null) {
      refetch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, refetch]);
useEffect(() => {
  
}, [locationId]);
  // Handle default value on initial load
  useEffect(() => {
    if (value && !displayValue) {
      const location = locations.find(loc => loc.id.toString() === value);
      if (location) {
        setDisplayValue(location.name);
        setSearchTerm(location.name);
      }
    }
  }, [value, locations]);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenPopover(false);
        if (isSearching) {
          setSearchTerm(displayValue);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, displayValue, isSearching]);

  // Select location and close popover
  const handleSelect = (id: string, locationName: string) => {
    onChange(id, locationName);  // Pass both the id and name
    setDisplayValue(locationName);
    setSearchTerm(locationName);
    setOpenPopover(false);
  };
  

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setOpenPopover(true);
    if (newValue === '') {
      onChange('','');
      setDisplayValue('');
    }
  };

  // Fetch all locations when input is focused
  const handleInputFocus = () => {
    setOpenPopover(true);
    setSearchTerm(''); 
    refetch(' ');
    if (inputRef.current) {
      inputRef.current.select(); 
    }
  };

  return (
    <div className={`${className} flex flex-col my-2 bg-white gap-2`}>
      <div className="relative" ref={wrapperRef}>
        <label className="block text-sm p-2 text-header font-semibold mb-1">
          {label}
        </label>
        <div className="flex items-center gap-2 rounded-md p-2">
          <LocationOnIcon className="text-icon" />
          <input
            ref={inputRef}
            type="text"
            value={value? value :searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus} // Trigger fetch on focus
            placeholder={label}
            className="w-full focus:outline-none cursor-pointer"
          />
        </div>
        {loading && (
          <div className="flex justify-center mt-2">
            <div className="animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
        {!loading && openPopover && (
          <ul className="absolute left-0 right-0 mt-1 z-50 bg-white rounded-md shadow-lg max-h-48 overflow-y-auto">
            {locations.map((location) => (
              <li
                key={location.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(location.id.toString(), location.name)}
              >
                {location.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
