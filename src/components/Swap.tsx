import React from 'react';
import SwapVertIcon from '@mui/icons-material/SwapVert';
interface SwapButtonProps {
  onClick: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => (
  <button
    className="border-2 font-medium  border-border rounded-full h-10 w-10 bg-white flex items-center justify-center z-10 hover:bg-gray-100"
    onClick={onClick}
  >
    <SwapVertIcon className="text-icon" />
  </button>
);

export default SwapButton;
