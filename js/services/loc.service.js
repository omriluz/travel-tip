import { storageService } from './storage.service.js'
import { appController } from '../app.controller.js'


export const locService = {
    getLocs,
    addLoc,
    removeLocation
}

//{id, name, lat, lng, weather, createdAt, updatedAt}
const STORAGE_KEY = 'locsDB';
let gLocs
_createLocs()

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}



function addLoc(locName, lat, lng) {
    console.log('locName', locName)
    const loc = createLoc(locName, lat, lng)
    gLocs.unshift(loc)

    storageService.save(STORAGE_KEY, gLocs)
    // appController.renderLocations()

}


function removeLocation(locationId) {
    console.log('locationId', locationId)
    const IdxLocation = gLocs.findIndex(
        (location) => locationId === location.id
    )
    gLocs.splice(IdxLocation, 1)

    storageService.save(STORAGE_KEY, gLocs)

}



function _createLocs() {
    var locs = storageService.load(STORAGE_KEY)
    if (!locs || !locs.length) {
        locs = []
        locs.push(createLoc('Greatplace', 32.047104, 34.832384))
        locs.push(createLoc('Neveragain', 32.047104, 34.832384))

    }

    gLocs = locs

    storageService.save(STORAGE_KEY, gLocs)
}


function createLoc(name, lat, lng) {
    return {
        id: makeId(),
        name,
        lat,
        lng,

    }
}




function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}