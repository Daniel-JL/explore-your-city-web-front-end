const convertToGeoJSON = (id, coords) => {
  const longitude = coords[0];
  const latitude = coords[1];

  return ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [longitude, latitude],
    },
    properties: {
      id,
      name: `Point${id}`,
      description: 'test',
    },
  });
};

export default convertToGeoJSON;
