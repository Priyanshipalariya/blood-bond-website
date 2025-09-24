// Utility functions for Terms and Conditions management

export const getTCAcceptance = () => {
  try {
    const acceptance = localStorage.getItem('bloodBondTCAcceptance');
    return acceptance ? JSON.parse(acceptance) : null;
  } catch (error) {
    console.error('Error reading T&C acceptance:', error);
    return null;
  }
};

export const isTCAccepted = () => {
  const acceptance = getTCAcceptance();
  return acceptance && acceptance.accepted === true;
};

export const clearTCAcceptance = () => {
  localStorage.removeItem('bloodBondTCAcceptance');
};

export const getSignatureName = () => {
  const acceptance = getTCAcceptance();
  return acceptance ? "User" : null;
};

