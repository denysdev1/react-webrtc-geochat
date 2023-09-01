const DUMMY_LOCATIONS = [
  {
    coords: {
      latitude: -19.59254,
      longitude: 113.97431,
    },
  },
  {
    coords: {
      latitude: -19.74233,
      longitude: 38.87687,
    },
  },
  {
    coords: {
      latitude: -2.28525,
      longitude: 99.177,
    },
  },
  {
    coords: {
      latitude: -24.59489,
      longitude: 131.95294,
    },
  },
  {
    coords: {
      latitude: 18.24842,
      longitude: -114.93844,
    },
  },
];

export const getDummyLocation = () => {
  return DUMMY_LOCATIONS[Math.floor(Math.random() * DUMMY_LOCATIONS.length)];
};
