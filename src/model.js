var Model = {
    addMarker: function (map, latLng, feedback) {
        return new google.maps.Marker({
            map: map,
            position: latLng,
            feedback: feedback
        })
    },
    getPlace: function (geocoder, map, latlng) {
        return new Promise((resolve, reject) => {
            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === 'OK') {
                    if (results[1]) {
                        // console.log(results[1].formatted_address);
                        resolve(results[1].formatted_address);
                    } else {
                        reject(new Error('No address found!'));
                    }
                } else {
                    reject(new Error('No address found!'));
                }
            })
        })
    }
}