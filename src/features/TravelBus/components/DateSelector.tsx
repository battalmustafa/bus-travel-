import React, { useState } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Datepicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import styles

interface DateSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(value));

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onChange(date.toISOString().split('T')[0]);
      setSelectedDate(date);
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    handleDateChange(today);
  };

  const handleTomorrowClick = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    handleDateChange(tomorrow);
  };

  return (
    <div className="relative flex flex-col gap-2 bg-white my-2">
      <div className="relative">
        <label className="block text-sm p-2 text-header font-semibold mb-1">
          Tarih
        </label>
        <div className="flex items-center gap-2 bg-white rounded-md p-2 cursor-pointer relative">
          <CalendarTodayIcon className="text-gray-500" />
          <Datepicker
            selected={selectedDate}
            dateFormat="dd-MM-yyyy"
            onChange={handleDateChange}
            className="w-full focus:outline-none"
          />
        </div>
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2 ">
        <div className="grid gap-2 p-2">
          <button
            className={`p-1 rounded text-sm font-medium border ${
              selectedDate.toDateString() === new Date().toDateString()
                ? 'bg-gray-500 text-white'
                : 'bg-white text-gray-500 border-gray-300'
            } hover:bg-gray-300`}
            onClick={handleTodayClick}
          >
            Bugün
          </button>
          <button
            className={`p-1 rounded text-sm border font-medium ${
              selectedDate.toDateString() === new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString()
                ? 'bg-gray-500 text-white'
                : 'bg-white text-gray-500 border-gray-300'
            } hover:bg-gray-300`}
            onClick={handleTomorrowClick}
          >
            Yarın
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;