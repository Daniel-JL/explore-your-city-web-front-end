const convertAddrToUrlForm = (address) => {
  const newAddr = address.replace(/\s+/g, '+');
  return newAddr.replace(/\,/g, '');
};

export default convertAddrToUrlForm;
