function initMap() {
    // Initial values used throughout the code
    let map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 55.7558, lng: 37.6173 },
        zoom: 8
    });
    let geocoder = new google.maps.Geocoder;
    let infowindow = new google.maps.InfoWindow;
    let markers = [];
    let latlng;
    let clusterClicked;
    let NewFeedback = function(Form, address) {
        this.username = Form.elements[0].value;
        this.place = Form.elements[1].value;
        this.message = Form.elements[2].value;
        this.address = address;
    }

    /* Main map listener. SetTimeout is set to overcome event catch (because of bubbling) when
     clicked on cluster of markers */
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

    // clusterization of markers every time map is zoomed

    map.addListener('zoom_changed', function () {
        clusterizeMarkers(map, markers);
    })

    /* Clusterization of markers. When cluster is clicked on the map all the markers are gathered in
    currentMarkers. Thereafter each marker is processed by Controller.eachSliderFeedback to give it
    a proper view and finally appear in infowindow
    */

    function clusterizeMarkers(map, markers) {
        let markerCluster = new MarkerClusterer(map, markers, {
            zoomOnClick: false,
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });

        markerCluster.addListener('clusterclick', function(clickedCluster) {
            let allMarkers = [];
            let currentMarkers = clickedCluster.getMarkers();

            clusterClicked = true;
            latlng = { lat: clickedCluster.center_.lat(), lng: clickedCluster.center_.lng() };
            /* далее очень важный элмент , иначе событие всплывает
            причем для Chorome достаточно только этой строки
            для FF надо использовать setTimeout (ниже в обработчике карты)
            потому что он не может обработать просто событие event
            http://shades-of-orange.com/post/2015/09/18/Stop-Propagation-of-Google-Maps-Marker-Click-Event-a-Solution!
            https://stackoverflow.com/questions/2881150/google-map-api-v3-event-click-raise-when-clickingmarkerclusterer
            event.stopPropagation(); */

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

    /* Update markers finds all markers on map and assigns each marker a listener..
     * may be not the best solution */

    function updateMarkers (markers) {
        markers.forEach((marker) => {
            marker.addListener('click', function () {
                latlng = marker.position;
                Controller.address(geocoder, map, latlng).then((contentString) => {
                    infowindow.setContent(contentString);
                    infowindow.setPosition(latlng);
                    infowindow.open(map);

                Controller.feedback(marker.feedback).then((generatedFeedback) => {
                    let feedbacks = document.querySelector('.feedbacks');
                    feedbacks.innerHTML = generatedFeedback;
                })
                })
            })
        })
    }

    // Event listner when button is clicked. Get all values from the form and appends new feedback

    document.addEventListener('click', function (e) {
        if (e.target.id == 'submitFeedback') {
            let form = document.forms['feedback'];
            let address = document.querySelector('.address').innerText;
            let whatToAdd = new NewFeedback(form, address);
            // console.log(whatToAdd)
            let marker = Model.addMarker(map, latlng, whatToAdd);

            markers.push(marker);
            Controller.feedback(whatToAdd).then((generatedFeedback) => {
                let feedbacks = document.querySelector('.feedbacks');
                let feedbackDiv = document.createElement('div');

                feedbackDiv.innerHTML = generatedFeedback;
                feedbacks.appendChild(feedbackDiv);
            })
            updateMarkers(markers);
            clusterizeMarkers(map, markers);
        }
    })

//    Slider of feedbacks Handler

    infowindow.addListener('domready', function (e) {
        if (document.querySelector('.eachSlide')) {
            let slides = document.getElementsByClassName('eachSlide');
            let nextArrow = document.querySelector('.next');
            let prevArrow = document.querySelector('.prev');
            let slideIndex = 1;

            slides[slideIndex-1].style.display = 'block';

            nextArrow.addEventListener('click', function () {
                slides[slideIndex-1].style.display = 'none';
                slideIndex++;
                if (slideIndex > slides.length) {slideIndex = 1};
                slides[slideIndex-1].style.display = 'block';
            });

            prevArrow.addEventListener('click', function () {
                slides[slideIndex-1].style.display = 'none';
                slideIndex--;
                if (slideIndex < 1) {slideIndex = slides.length;}
                slides[slideIndex-1].style.display = 'block';
            });

            for (let i=0; i<slides.length; i++) {
                let addressLink = slides[i].querySelector('.FeedbackAddress');
                addressLink.addEventListener('click', function () {
                    let referenceAddress = addressLink.innerText;
                    let newContent;
                    let collectedAddresses =[];
                    let generatedFeedbacks = [];
                    for (let j=0; j<slides.length; j++) {
                        let comparedAddress = slides[j].querySelector('.FeedbackAddress');
                        if (comparedAddress.innerText.replace(/\s/g, '') == referenceAddress.replace(/\s/g, '')) {
                            collectedAddresses.push(slides[j]);
                        }
                    }
                    infowindow.close();
                    collectedAddresses.forEach((item) => {
                        let feedback = {
                            username: item.querySelector('.FeedbackUserName').innerHTML,
                            place: item.querySelector('.FeedbackPlace').innerHTML,
                            message: item.querySelector('.FeedbackMessage').innerHTML
                        };
                        Controller.feedback(feedback).then((generatedFeedback) => {
                            let feedbacks = document.querySelector('.feedbacks');
                            let wrapper = document.createElement('div');
                            wrapper.innerHTML = generatedFeedback;
                            let feedbackDiv = wrapper.firstElementChild;
                            feedbacks.appendChild(feedbackDiv);
                        })
                    });
                    newContent = View.pastePlace('inputTemplate', referenceAddress, generatedFeedbacks);
                    infowindow.open(map);
                    infowindow.setContent(newContent);
                    infowindow.setPosition(latlng);
                })
            }
        }
    })
}