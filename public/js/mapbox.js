export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYXRoYXJ2YTI1MDIiLCJhIjoiY2t2dXQ2aGNiMDN6aTJvcGhzZjZ6ZW1rNCJ9.UrkkIA5kNqBY46-fOpkPVw';

  var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/atharva2502/ckvuthioc3be914ujf5xbn4m1', // style URL
    scrollZoom: false,
    doubleClickZoom: false,
    //   center: [-118.113491, 34.111745],
    //   zoom: 5,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    const marker = new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map)
      .setPopup(
        new mapboxgl.Popup({
          offset: 30,
          closeOnClick: false,
          closeButton: false,
        })
          .setLngLat(loc.coordinates)
          .setHTML(`<p>Day: ${loc.day}: ${loc.description}</p>`)
      )
      .addTo(map);

    marker.togglePopup();

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
