var View = {
    pastePlace: function(templateName, address) {
        if(!address) {
            alert('No address found for View!')
        }
        // templateName = templateName + 'Template';

        var templateElement = document.getElementById(templateName),
            templateSource = templateElement.innerHTML,
            renderFn = Handlebars.compile(templateSource);
        var addressToPass = {
            address: address
        }

        // console.log(addressToPass)
        // console.log(renderFn(addressToPass))

        return renderFn(addressToPass);
    }
}