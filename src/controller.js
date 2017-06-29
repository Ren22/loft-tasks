var Controller = {
    addressAndFeeds: function (geocoder, map, e) {
        var out;
        function check() {
            Model.getPlace(geocoder, map, e).then((result) => console.log(result))
        }

        check()

        Model.getPlace(geocoder, map, e).then((response) => {
            // console.log(View.pastePlace('inputTemplate', response))
            // var out = View.pastePlace('inputTemplate', response);
            return 2;
            console.log("out=", out)
        })
        console.log("out=", out)
    }
}

//return View.pastePlace('inputTemplate', Model.getPlace(geocoder, map, e));
