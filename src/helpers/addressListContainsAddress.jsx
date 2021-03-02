const addressListContainsAddress = (addressList, address) => {
  for (let i = 0; i < addressList.length; i++) {
    if (addressList[i].address === address) {
      return true;
    }
  }
  return false;
};

export default addressListContainsAddress;
