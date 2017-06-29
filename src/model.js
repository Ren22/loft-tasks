var Model = {
    placeMarker: function (latLng, map) {
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        })
    },
    getPlace: function (geocoder, map, coords) {
        return new Promise((resolve, reject) => {
            var latlng = { lat: coords.latLng.lat(), lng: coords.latLng.lng() };

            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === 'OK') {
                    if (results[1]) {
                        // console.log(results[1].formatted_address);
                        resolve(results[1].formatted_address);
                    } else {
                        reject(window.alert('No results founds!'));
                    }
                } else {
                    reject(window.alert('Geocoder failed due to: ' + status));
                }
            });
        })
    }
    // getPlace: function (geocoder, map, coords) {
    //     var latlng = { lat: coords.latLng.lat(), lng: coords.latLng.lng() };
    //
    //     geocoder.geocode({'location': latlng}, function (results, status) {
    //         if (status === 'OK') {
    //             if (results[1]) {
    //                 console.log(results[1].formatted_address);
    //             } else {
    //                 window.alert('No results founds!');
    //             }
    //         } else {
    //             window.alert('Geocoder failed due to: ' + status);
    //         }
    //     });
    //
    // }
}

