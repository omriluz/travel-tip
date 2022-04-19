export const mapService = {
    initMap,
    addMarker,
    panTo,
    getCordsByCity
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {

    return _connectGoogleApi()
        .then(() => {
            gMap = new google.maps.Map(document.getElementById("map"), {
                zoom: 4,
                center: { lat, lng }
            });
            // Create the initial InfoWindow.
            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: { lat, lng }
            });

            infoWindow.open(gMap);
            // Configure the click listener.
            gMap.addListener("click", (mapsMouseEvent) => {
                // Close the current InfoWindow.
                infoWindow.close();
                // Create a new InfoWindow.
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                );
                infoWindow.open(gMap);
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
    const API_KEY = 'AIzaSyB38vdBK1JWjDal-nIi09xBBztMM-IVOrI';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}




function googleGeoCodeApi() {

    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAp4yFt30cOlZh5tnSUXjKE_MgIZvxSw5I';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/geocode/json?place_id=ChIJeRpOeF67j4AR9ydy_PIzPuM&key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getCordsByCity(cityName) {
    console.log('this is the cityName', cityName);
    const API_KEY = 'AIzaSyAp4yFt30cOlZh5tnSUXjKE_MgIZvxSw5I'
    const geoCodeEndPoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${API_KEY}`
    return axios.get(geoCodeEndPoint)
        .then(res => res.data)
}