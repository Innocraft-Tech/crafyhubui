import React from 'react';

const HelpSection: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">🤝</span>
        <div>
          <p className="font-semibold">Check out our profile for guides & how-to’s:</p>
          <p className="text-blue-600">Contra</p>
          <p>We’re here to help</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">➡️</span>
        <p>Read our client resources to learn more about Contra</p>
      </div>
      <div className="flex items-center space-x-2">
        <p>Still need help? Contact our support team:</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Contact Us</button>
      </div>
    </div>
  );
};

export default HelpSection;
