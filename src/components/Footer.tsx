import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p>&copy; {new Date().getFullYear()} Enterprise hubs. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
