import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

export const appController = {
    renderLocations
}
window.app = {
    onInit,
    onAddMarker,
    onPanTo,
    onGetLocs,
    onGetUserPos,
    onRemoveLocation
}


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');

        })
        .catch((err) => console.log('Error: cannot init map', err));

    locService.getLocs()
        .then(renderLocations)
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function renderLocations(locations) {

    console.log('locations', locations)

    const elLoc = document.querySelector('.location-table')
    const strHTML = locations.map(
        (location) => `
      <h2 class="saved-list" onclick='onCurrLocation('${location.id}')'>
      ${location.name} <button onclick="app.onRemoveLocation('${location.id}')">X</button>
      </h2>
      `
    )
    elLoc.innerHTML = strHTML.join('')
}

function onRemoveLocation(locationId) {
    locService.removeLocation(locationId)
    locService.getLocs()
        .then(renderLocations)
}



function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}