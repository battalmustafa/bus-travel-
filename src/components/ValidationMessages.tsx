import React from 'react';

interface ValidationMessagesProps {
  error: string;
}

const ValidationMessages: React.FC<ValidationMessagesProps> = ({ error }) => (
  <div className="text-red-500">
    <p>{error}</p>
  </div>
);

export default ValidationMessages;
