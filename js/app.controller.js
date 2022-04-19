import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.app = {
    onInit,
    onAddMarker,
    onPanTo,
    onGetLocs,
    onGetUserPos,
    onDeleteLoc
}

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch((err) => console.log('Error: cannot init map', err));
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


function onGetUserPos() {
    getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo(ev) {
    ev.preventDefault()
    let inputEl = document.querySelector('.location-input').value
    mapService.getCordsByCity(inputEl)
        .then(res => {
            const { lat, lng } = res['results'][0]['geometry']['location']
            mapService.panTo(lat, lng);
        })
        // console.log('Panning the Map');
}

function onDeleteLoc(ev) {
    ev.preventDefault()
}