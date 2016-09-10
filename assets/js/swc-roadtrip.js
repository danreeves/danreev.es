/* global document, window, fetch */
/* eslint-disable no-new */
import 'whatwg-fetch';
import gmaps from 'google-maps';
import haversine from 'haversine';
import chunk from 'lodash.chunk';
import Counter from './util/counter';

function getTotalDistance (result) {
    let total = 0;
    const myroute = result.routes[0];
    for (let i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total /= 1000;
    return total;
}

function toMiles (km) {
    return km * 0.62137;
}

const scilly = {
    lat: 49.9361,
    lng: -6.3228,
    latitude: 49.9361,
    longitude: -6.3228,
};
const counter = new Counter({
    start: 0,
    end: 100,
    duration: 1000,
    selector: document.querySelector('.miles'),
    done: () => {},
});

gmaps.KEY = 'AIzaSyCxOAAdN7byIfuOUv2X6Ww5CBNab0y3EDs';
gmaps.load(google => {
    const mapEl = document.querySelector('.map');
    const map = new google.maps.Map(mapEl, {
        zoom: 16,
        center: {
            lat: 50.2660,
            lng: -5.0527,
        },
        scrollwheel: false,
        disableDefaultUI: true,
        styles: [
            {
                stylers: [{ color: '#000000' }],
            },
            {
                featureType: 'water',
                stylers: [{ color: '#ffffff' }],
            },
            {
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
            },
        ],
    });

    fetch('/kernow.json')
        .then(res => res.json())
        .then(json => json.map(loc => {
            const { lat, lon: lng } = loc;
            return {
                ...loc,
                lat,
                lng,
                latitude: lat,
                longitude: lng,
            };
        }))
        .then(json => json.sort((a, b) => {
            const aDist = haversine(a, scilly);
            const bDist = haversine(b, scilly);
            if (aDist > bDist) return 1;
            if (aDist < bDist) return -1;
            return 0;
        }))
        .then(json => {

            const bounds = new google.maps.LatLngBounds();
            json.forEach(loc => {
                bounds.extend({ lat: loc.lat, lng: loc.lng });
            });
            map.fitBounds(bounds);
            google.maps.event.addDomListener(window, 'resize', () => {
                google.maps.event.trigger(map, 'resize');
                map.fitBounds(bounds);
            });

            const journeys = chunk(json.reverse(), 9)
                .map((journey, i, arr) => {
                    if (i < arr.length - 1) {
                        return [...journey, arr[i + 1][0]];
                    }
                    return journey;
                });
            let distance = 0;

            journeys.forEach((journey, i) => {
                const origin = journey[0];
                const destination = journey[journey.length - 1];
                const waypoints = journey
                    .slice(1, journey.length - 2)
                    .map(location => ({ location }));
                const directionsService = new google.maps.DirectionsService();
                const directionsDisplay = new google.maps.DirectionsRenderer({
                    preserveViewport: true,
                    suppressMarkers: true,
                    polylineOptions: {
                        strokeColor: 'gold',
                    },
                });
                directionsDisplay.setMap(map);

                setTimeout(() => {
                    directionsService.route({
                        origin,
                        destination,
                        waypoints,
                        optimizeWaypoints: true,
                        travelMode: 'DRIVING',
                    }, (response, status) => {
                        if (status === 'OK') {
                            directionsDisplay.setDirections(response);
                            distance += getTotalDistance(response);
                            counter.timeStart = undefined;
                            counter.timeElapsed = undefined;
                            counter.start = counter.end;
                            counter.end = toMiles(distance);
                            counter.run();
                        } else {
                            console.log(`Directions request failed due to ${status}`);
                        }
                    });
                }, (i === 0) ? 0 : i * 1000);

            });

        });

});
