import React from 'react';
import PropTypes from 'prop-types';
export default function League({ text = '', MMR = '' }) {
  let textColor = '#000';
  if (typeof text !== 'string') {
    console.warn('Expected "text" to be a string');
    text = String(text);
  }
  if (text.includes("F")) {
    textColor = '#626C7D';
  } else if (text.includes("E")) {
    textColor = '#0D9488';
  } else if (text.includes("D")) {
    textColor = '#06B6D4';
  } else if (text.includes("C")) {
    textColor = '#1E40AF';
  } else if (text.includes("B")) {
    textColor = '#A855F7';
  } else if (text.includes("A")) {
    textColor = '#EB4550';
  } else if (text.includes("S")) {
    textColor = '#DAA520';
  }
  return (
    <div className='league-container'>
    <p className="rating" style={{ backgroundColor: textColor }}>  
      {text}     
    </p>
    <p className="mmr" style={{ color: textColor }}>
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