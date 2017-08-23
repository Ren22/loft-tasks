var Controller = {
    address: function (geocoder, map, latlng) {
        return new Promise((resolve, reject) => {
            Model.getPlace(geocoder, map, latlng).then((response) => {
                var output = View.pastePlace('inputTemplate', response);
                resolve(output);
                // console.log(output)
            })
        })
    },
    feedback: function (input) {
        return new Promise((resolve, reject) => {
            var output = View.pasteFeedbackData('feedbackTemplate', input);
            resolve(output);
        })
    },
    eachSliderFeedback: function (input) {
        return new Promise((resolve, reject) => {
            var output = View.pasteFeedbackData('eachSlideTemplate', input);
            resolve(output);
        })
    },
    sliderFeedbacks: function (allClusterFeedbacks) {
        return new Promise((resolve, reject) => {
            var output = View.pasteClusterFeedacks('sliderTemplate', allClusterFeedbacks);
            resolve(output);
        })
    }
}

//return View.pastePlace('inputTemplate', Model.getPlace(geocoder, map, e));
