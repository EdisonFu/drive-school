import React from 'react';

const PlaceholderImage = ({ width = '100%', height = '100%', text = '金寨驾校', className = '' }) => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
    backgroundColor: '#cccccc',
    color: '#333333',
    fontSize: '2rem',
    fontWeight: 'bold',
  };

  return (
    <div style={style} className={className}>
      {text}
    </div>
  );
};

export default PlaceholderImage;
