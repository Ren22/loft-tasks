function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.7558, lng: 37.6173 },
        zoom: 8
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var markers = [];
    var latlng;
    var NewFeedback = function(Form) {
        this.username = Form.elements[0].value;
        this.place = Form.elements[1].value;
        this.message = Form.elements[2].value;
    }

    var clusterClicked;

    function clusterizeMarkers(map, markers) {
        let markerCluster = new MarkerClusterer(map, markers, {
            zoomOnClick: false,
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'

        });

        markerCluster.addListener('clusterclick', function(clickedCluster) {
            var allMarkers = [];
            clusterClicked = true;
            latlng = { lat: clickedCluster.center_.lat(), lng: clickedCluster.center_.lng() };
            // console.log('cluster is clicked')
            // console.log(clickedCluster)
            //далее очень важный элмент , иначе событие всплывает
            //причем для Chorome достаточно только этой строки
            //для FF надо использовать setTimeout (ниже в обработчике карты)
            //потому что он не может обработать просто событие event
            //http://shades-of-orange.com/post/2015/09/18/Stop-Propagation-of-Google-Maps-Marker-Click-Event-a-Solution!
            //https://stackoverflow.com/questions/2881150/google-map-api-v3-event-click-raise-when-clickingmarkerclusterer
            // event.stopPropagation();

            var currentMarkers = clickedCluster.getMarkers();
            // console.log(currentMarkers)

            currentMarkers.forEach((marker) => {
                Controller.feedback(marker.feedback).then((generatedFeedback) => {
                    allMarkers.push(generatedFeedback)
                    Controller.sliderFeedbacks(allMarkers).then((generatedCluster) => {
                        infowindow.setContent(generatedCluster);
                        infowindow.setPosition(latlng);
                        infowindow.open(map);
                        clusterSize = 0;

                        allMarkers.join();
                    })
                })
            })
            console.log(allMarkers)

            allMarkers = []
        })
    }

    function updateMarkers (markers) {
        markers.forEach((marker) => {
            marker.addListener('click', function () {
                latlng = marker.position;
                Controller.address(geocoder, map, latlng).then((contentString) => {
                    // var z = infowindow.getZIndex();
                    // console.log(z)
                    infowindow.setContent(contentString);
                    infowindow.setPosition(latlng);
                    infowindow.open(map);

                Controller.feedback(marker.feedback).then((generatedFeedback) => {
                    var feedbacks = document.querySelector('.feedbacks');

                    feedbacks.innerHTML = generatedFeedback;
                })
                })
            })
        })
    }

    map.addListener('click', function (e) {
        setTimeout(function () {
            if (!clusterClicked) {
                console.log('map is clicked')
                latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                Controller.address(geocoder, map, latlng).then((contentString) => {
                    infowindow.setContent(contentString);
                })

                infowindow.setPosition(latlng);
                infowindow.open(map);
            } else {
                clusterClicked = false;
            }
        }, 0)
    })

    document.addEventListener('click', function (e) {
        if (e.target.id == 'submitFeedback') {
            var form = document.forms['feedback'];
            var whatToAdd = new NewFeedback(form);
            let marker = Model.addMarker(map, latlng, whatToAdd);

            markers.push(marker);
            Controller.feedback(whatToAdd).then((generatedFeedback) => {
                var feedbacks = document.querySelector('.feedbacks');
                var feedbackDiv = document.createElement('div');

                feedbackDiv.innerHTML = generatedFeedback;
                feedbacks.appendChild(feedbackDiv);
            })
            // updateMarkers(markers);
            clusterizeMarkers(map, markers);
        }
    })
}