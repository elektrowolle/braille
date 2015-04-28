
var endOfLine = '\r\n';
Braile = {};
Braile.alphabet = {};
Braile.alphabet.en = require('./alphabet/en.json');

Braile.convertToBraile = function(str, lng){
    var line   = [];
    line[0]    = "";
    line[1]    = "";
    line[2]    = "";

    var braile = Braile.alphabet[lng ? lng : "en"];
    for (var i = str.length - 1; i >= 0; i--) {
        var character = str[i];
        if(character){
            var characterParts = braile[character].split(' ');
            line[0] = line[0].concat(characterParts[0]);
            line[1] = line[1].concat(characterParts[1]);
            line[2] = line[2].concat(characterParts[2]);
        }
    };
    var returnStr =
        (line[0] + endOfLine +
        line[1] + endOfLine +
        line[2]);

    return returnStr;
}

Braile.convertFromBraile = function(str, lng){
    var returnStr = '';
    var newstr = str.split(str, endOfLine);
    var braile = Braile.alphabet[lng ? lng : "en"];
    for (var i = 1; i < newstr[0].length; i += 2) {
        for (var _iBraile in braile) {
            if( (newstr[0][i] + ' '  + newstr[1][i] + ' ' + newstr[2][i])
                == braile[_iBraile]){

                returnStr = returnStr.concat(braile);
            }

        };

    };
    return returnStr;
}

if(module)
    module.export = Braile;