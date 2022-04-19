import { locService } from "./loc.service.js";



export const mapService = {
    initMap,
    addMarker,
    panTo,
}


var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {

    return _connectGoogleApi()
        .then(() => {
            gMap = new google.maps.Map(document.getElementById("map"), {
                zoom: 4,
                center: { lat, lng }
            });

            let infoWindow = new google.maps.InfoWindow({

                content: "Click the map to get Lat/Lng!",
                position: { lat, lng }

            });

            infoWindow.open(gMap);

            gMap.addListener("click", (mapsMouseEvent) => {


                infoWindow.close();
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,

                });
                console.log('position', infoWindow)

                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)

                );

                infoWindow.open(gMap);
                const location = mapsMouseEvent.latLng.toJSON()
                console.log('location', location)
                const locationName = prompt('Location name')
                if (!locationName) return

                locService.addLoc(locationName, location.lat, location.lng)


            });

        })


}




function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}




function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyB38vdBK1JWjDal-nIi09xBBztMM-IVOrI'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}