function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.7558, lng: 37.6173 },
        zoom: 8
    });
    var geocoder = new google.maps.Geocoder;

    //Если вынести map.addListener то не сработает из-за scope?
    map.addListener('click', function (e) {
        var latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        console.log(e);
        // console.log(Controller.addressAndFeeds(geocoder, map, e))
        Controller.addressAndFeeds(geocoder, map, latlng).then((contentString) => {

            var infowindow = new google.maps.InfoWindow;

            infowindow.setContent(contentString);
            infowindow.setPosition(latlng);
            infowindow.open(map);

            addEventListener()
        })
    })
}


// Нерабочий вариант
// map.addListener('click', function () {
//     return new Promise(function (resolve, reject) {
//         var contentString = Controller.addressAndFeeds(geocoder, map, e);
//         resolve(1);
//     })
//         .then(() => Model.placeMarker(e.latLng, map));
// })

