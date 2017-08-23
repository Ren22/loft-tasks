function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.7558, lng: 37.6173 },
        zoom: 8
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var markers = [];
    var latlng;
    var clusterClicked;
    var NewFeedback = function(Form, address) {
        this.username = Form.elements[0].value;
        this.place = Form.elements[1].value;
        this.message = Form.elements[2].value;
        this.address = address;
    }

    function clusterizeMarkers(map, markers) {
        var markerCluster = new MarkerClusterer(map, markers, {
            zoomOnClick: false,
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });

        markerCluster.addListener('clusterclick', function(clickedCluster) {
            var allMarkers = [];
            var currentMarkers = clickedCluster.getMarkers();

            clusterClicked = true;
            latlng = { lat: clickedCluster.center_.lat(), lng: clickedCluster.center_.lng() };
            //далее очень важный элмент , иначе событие всплывает
            //причем для Chorome достаточно только этой строки
            //для FF надо использовать setTimeout (ниже в обработчике карты)
            //потому что он не может обработать просто событие event
            //http://shades-of-orange.com/post/2015/09/18/Stop-Propagation-of-Google-Maps-Marker-Click-Event-a-Solution!
            //https://stackoverflow.com/questions/2881150/google-map-api-v3-event-click-raise-when-clickingmarkerclusterer
            // event.stopPropagation();
            // console.log(currentMarkers)

            currentMarkers.forEach((marker) => {
                Controller.eachSliderFeedback(marker.feedback).then((generatedFeedback) => {
                    allMarkers.push(generatedFeedback);
                    Controller.sliderFeedbacks(allMarkers.join('')).then((generatedCluster) => {
                        infowindow.setContent(generatedCluster);
                        infowindow.setPosition(latlng);
                        infowindow.open(map);
                    })
                })
            })
        })
    }

    function updateMarkers (markers) {
        markers.forEach((marker) => {
            marker.addListener('click', function () {
                latlng = marker.position;
                Controller.address(geocoder, map, latlng).then((contentString) => {
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
                // console.log('map is clicked')
                latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                Controller.address(geocoder, map, latlng).then((contentString) => {
                    infowindow.setContent(contentString);
                    infowindow.setPosition(latlng);
                    infowindow.open(map);
                })
            } else {
                clusterClicked = false;
            }
        }, 0)
    })

    map.addListener('zoom_changed', function (e) {
        clusterizeMarkers(map, markers);
    })

    document.addEventListener('click', function (e) {
        if (e.target.id == 'submitFeedback') {
            let form = document.forms['feedback'];
            let address = document.querySelector('.address').innerText;
            var whatToAdd = new NewFeedback(form, address);
            // console.log(whatToAdd)
            let marker = Model.addMarker(map, latlng, whatToAdd);

            markers.push(marker);
            Controller.feedback(whatToAdd).then((generatedFeedback) => {
                var feedbacks = document.querySelector('.feedbacks');
                var feedbackDiv = document.createElement('div');

                feedbackDiv.innerHTML = generatedFeedback;
                feedbacks.appendChild(feedbackDiv);
            })
            updateMarkers(markers);
            clusterizeMarkers(map, markers);
        }
    })

//    Slider Handler

    infowindow.addListener('domready', function (e) {
        if (document.querySelector('.eachSlide')) {
            var slides = document.getElementsByClassName('eachSlide');
            var nextArrow = document.querySelector('.next');
            var prevArrow = document.querySelector('.prev');
            var addressLink = document.querySelector('.FeedbackAddress');
            var slideIndex = 1;

            slides[slideIndex-1].style.display = 'block';
            // console.log(addressLink.innerText)

            nextArrow.addEventListener('click', function () {
                slides[slideIndex-1].style.display = 'none';
                slideIndex++;
                if (slideIndex > slides.length) {slideIndex = 1};
                slides[slideIndex-1].style.display = 'block';
            })

            prevArrow.addEventListener('click', function () {
                slides[slideIndex-1].style.display = 'none';
                slideIndex--;
                if (slideIndex < 1) {slideIndex = slides.length};
                slides[slideIndex-1].style.display = 'block';
            })

            for (var i=0; i<slides.length; i++) {
                let addressLink = slides[i].querySelector('.FeedbackAddress');
                addressLink.addEventListener('click', function () {
                    let referenceAddress = addressLink.innerText;
                    console.log(referenceAddress)
                    let collectedAddresses =[];
                    for (var j=0; j<slides.length; j++) {
                        let comparedAddress = slides[j].querySelector('.FeedbackAddress');
                        if (comparedAddress.innerText.replace(/\s/g, '') == referenceAddress.replace(/\s/g, '')) {
                            collectedAddresses.push(slides[j]);
                            console.log(collectedAddresses.length)
                        }
                    }
                })
            }
        }
    })
}