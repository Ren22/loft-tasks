var Model = {
    placeMarker: function (latLng, map) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        })
    },
    getPlace: function (geocoder, map, latlng) {
        return new Promise((resolve, reject) => {
            // var latlng = { lat: coords.latLng.lat(), lng: coords.latLng.lng() };

            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === 'OK') {
                    if (results[1]) {
                        // console.log(results[1].formatted_address);
                        resolve(results[1].formatted_address);
                    } else {
                        reject(new Error('No results found!'));
                    }
                } else {
                    reject(new Error('No results found!'));
                }
            });
        })
    }

}

