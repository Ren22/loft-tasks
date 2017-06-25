function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.714224, lng: -73.961452},
        zoom: 8
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    map.addListener('click', (e) => {
        // console.log(e.latLng.lng())

        placeMarker(e.latLng, map);
        getPlace(geocoder, infowindow, map, e);
    })
}

function getPlace(geocoder, infowindow, map, coords) {
    var latlng = { lat: coords.latLng.lat(), lng: coords.latLng.lng() };

    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
            if (results[1]) {
                infowindow.setContent(results[1].formatted_address);
                console.log(infowindow.content)
            } else {
                window.alert('No results founds!');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}
