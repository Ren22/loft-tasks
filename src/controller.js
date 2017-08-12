var Controller = {
    addressAndFeeds: function (geocoder, map, latlng) {
        return new Promise((resolve, reject) => {
            Model.getPlace(geocoder, map, latlng).then((response) => {
                var output = View.pastePlace('inputTemplate', response);
                resolve(output);
                // console.log(output)
            })
        })
    }
}

//return View.pastePlace('inputTemplate', Model.getPlace(geocoder, map, e));
