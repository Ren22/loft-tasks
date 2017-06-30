function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.714224, lng: -73.961452},
        zoom: 8
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    //Если вынести map.addListener то не сработает из-за scope?
    map.addListener('click', function (e) {
        // console.log(Controller.addressAndFeeds(geocoder, map, e))
        Controller.addressAndFeeds(geocoder, map, e)
        var contentString = Controller.addressAndFeeds(geocoder, map, e);
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

