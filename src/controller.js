var Controller = {
    address: function (geocoder, map, latlng) {
        return new Promise((resolve, reject) => {
            Model.getPlace(geocoder, map, latlng).then((address) => {
                let output = View.pastePlace('inputTemplate', address);
                resolve(output);
            })
        })
    },
    feedback: function (input) {
        return new Promise((resolve, reject) => {
            let output = View.pasteFeedbackData('feedbackTemplate', input);
            resolve(output);
        })
    },
    eachSliderFeedback: function (input) {
        return new Promise((resolve, reject) => {
            let output = View.pasteFeedbackData('eachSlideTemplate', input);
            resolve(output);
        })
    },
    sliderFeedbacks: function (allClusterFeedbacks) {
        return new Promise((resolve, reject) => {
            let output = View.pasteClusterFeedacks('sliderTemplate', allClusterFeedbacks);
            resolve(output);
        })
    }
}