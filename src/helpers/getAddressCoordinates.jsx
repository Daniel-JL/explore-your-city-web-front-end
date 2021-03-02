const getAddressCoordinates = async (addressString) => {
  let data;

  try {
    data = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressString}.json?bbox=13.0883590415111,52.3382670008426,13.761131997363,52.6755029827484&access_token=pk.eyJ1IjoiZGFuamwiLCJhIjoiY2toMzkxZXBwMDhpdDJzb2V4Mnh6ZXhzdiJ9.YNxQn_XBag2z8ZZUXTKAmQ`)
      .then(
        (response) => response.json(),
      );
  } catch (error) {
    console.log(error);
    return 'error';
    // throw (error);
  }
  
  return data.features[0].geometry.coordinates;
};

export default getAddressCoordinates;
