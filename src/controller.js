var Controller = {
    addressAndFeeds: function (geocoder, map, e) {
        Model.getPlace(geocoder, map, e).then((response) => {
            console.log(View.pastePlace('inputTemplate', response))
            View.pastePlace('inputTemplate', response);
        })
    }
}

//return View.pastePlace('inputTemplate', Model.getPlace(geocoder, map, e));
