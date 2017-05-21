
function calculator(number = 0) {

    if (typeof number !== 'number') {
        throw new Error("number is not a number");
    }

    var b = {

        sum: function () {
            for (var i = 0; i < arguments.length; i++) {
                number = number + arguments[i];
            }

            return number;
        },

        dif: function () {
            for (var i = 0; i < arguments.length; i++) {
                this.number = this.number - arguments[i];
            }
        }
    }

    return b;
}

calculator(2);