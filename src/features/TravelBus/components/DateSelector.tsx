import { getDefaultDate } from '../../../utils/utils';
import React, { useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
interface DateSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ value, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDateChange = (dateValue: string) => {
    onChange(dateValue);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const isTodaySelected = value === new Date().toISOString().split('T')[0];

  return (
    <div className="relative flex flex-col gap-2 bg-white my-2">
      <div className="relative">
        <label className="block text-sm p-2 text-header font-semibold mb-1">
          Tarih
        </label>
        <div className="flex items-center gap-2 bg-white rounded-md p-2 cursor-pointer relative">
          {/* Calendar icon on the left */}
          <CalendarTodayIcon className="text-gray-500" />

          <input
            type="date"
            value={value}
            onChange={(e) => handleDateChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full focus:outline-none pr-10 appearance-none" // Hide the default date icon
            onFocus={() => setIsDropdownOpen(true)}
          />
        </div>
      </div>
      {/* Quick select buttons */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2 ">
        <div className="grid gap-2 p-2">
          <button
            className={`p-1 rounded text-sm font-medium border ${
              isTodaySelected
                ? 'bg-gray-500 text-white'
                : 'bg-white text-gray-500 border-gray-300'
            } hover:bg-gray-300`}
            onClick={() => handleDateChange(new Date().toISOString().split('T')[0])}
          >
            Bugün
          </button>
          <button
            className={`p-1 rounded text-sm border font-medium ${
              value === getDefaultDate()
                ? 'bg-gray-500 text-white'
                : 'bg-white text-gray-500 border-gray-300'
            } hover:bg-gray-300`}
            onClick={() => handleDateChange(getDefaultDate())}
          >
            Yarın
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
