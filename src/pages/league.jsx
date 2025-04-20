import React from 'react';
import PropTypes from 'prop-types';

export default function League({ text = '', MMR = '' }) {
  let textColor = '#000';

  if (typeof text !== 'string') {
    console.warn('Expected "text" to be a string');
    text = String(text);
  }

  if (text.includes("F")) {
    textColor = '#9E9E9E';
  } else if (text.includes("E")) {
    textColor = '#10FE40';
  } else if (text.includes("D")) {
    textColor = '#0BFEE6';
  } else if (text.includes("C")) {
    textColor = '#0B1BFE';
  } else if (text.includes("B")) {
    textColor = '#EE0BFE';
  } else if (text.includes("A")) {
    textColor = '#FE0606';
  } else if (text.includes("S")) {
    textColor = '#DAA520';
  }

  return (
    <div className='league-container'>
    <p className="rating" style={{ backgroundColor: textColor }}>  
      {text}
      
    </p>
    <p className="mmr" style={{ color: textColor}}>
    {MMR}
  </p>
    </div>
    
  );
}

League.propTypes = {
  text: PropTypes.string,
  MMR: PropTypes.string,
};

League.defaultProps = {
  text: '',
  MMR: '',
};