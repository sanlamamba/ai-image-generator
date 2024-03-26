import React, { useEffect, useRef } from 'react';

const OTPInput = ({ length, onComplete, otp, setOtp, error, setError }) => {
  const inputsRef = useRef(new Array(length));
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }

    if (newOtp.every(num => num !== '')) {
      if (newOtp.join('').length === length) { //TODO Fix auto submit
        onComplete(newOtp.join(''));
      }
    }

    if (element.previousSibling && element.value === '') {
      element.previousSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length).split('');
    if (pasteData.length === length && pasteData.every(num => !isNaN(num))) {
      setOtp(pasteData);
      onComplete(pasteData.join(''));
      // Focus the last input after pasting
      inputsRef.current[length - 1].focus();
    } else {
      setError('Invalid OTP');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
      {otp.map((data, index) => (
        <input
          className="m-2 border p-2 text-center w-12"
          type="text"
          name={`otp-${index}`}
          key={index}
          value={data}
          maxLength="1"
          onChange={e => handleChange(e.target, index)}
          onPaste={handlePaste}
          onFocus={e => e.target.select()}
          ref={ref => inputsRef.current[index] = ref}
        />
      ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2 block">{error}</p>}
    </div>
  );
};

export default OTPInput;
