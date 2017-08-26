var View = {
    pastePlace: function(templateName, address) {
        if (!address) {
            alert('No address found for View!')
        }

        let templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);
        let addressToPass = {
            address: address,
            feedbacks: arguments[2]
        }

        return renderFn(addressToPass);
    },
    pasteFeedbackData: function(templateName, feedbackData) {
        if (!feedbackData) {
            alert('No feedback provided!')
        }

        let templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);
        let dataToPass = {
            username: feedbackData.username,
            place: feedbackData.place,
            message: feedbackData.message,
            address: feedbackData.address
        }

        return renderFn(dataToPass);
    },
    pasteClusterFeedacks: function (templateName, allClusterFeedbacks) {
        if (!allClusterFeedbacks) {
            alert('No feedbacks founds!')
        }

        let templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);
        let dataToPass = {
            sliderFeedbacks: allClusterFeedbacks
        }

        return renderFn(dataToPass);
    }
}