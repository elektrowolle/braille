var rawgit = 'https://cdn.rawgit.com/elektrowolle/braile/master/';
var endOfLine = '\n';
var Braile = {};
Braile.alphabet = {};
require([typeof local != 'undefined' ? 'alphabet/en.js' : rawgit + 'alphabet/en.js']);

Braile.convertToBraile = function(str, lng){
    var line   = [];
    line[0]    = "";
    line[1]    = "";
    line[2]    = "";

    var braile = Braile.alphabet[lng ? lng : "en"];
    for (var i = 0;  i < str.length; i++) {
        var character = str[i].toLowerCase();
        if(character && typeof braile[character] != 'undefined'){
            var characterParts = braile[character].split(' ');
            line[0] = line[0].concat(characterParts[0]);
            line[1] = line[1].concat(characterParts[1]);
            line[2] = line[2].concat(characterParts[2]);
        }
        else{
            console.log("skipped " + character);
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
    str = str.replace(/\./g , '-');
    str = str.replace(/ /g , '');
    str = str.toLowerCase();
    var newstr = str.split(endOfLine);

    if(newstr.length < 3)
        return;

    var braile = Braile.alphabet[lng ? lng : "en"];
    for (var i = 1; i < newstr[0].length; i += 2) {
        for (var _iBraile in braile) {
            if((
                newstr[0][i - 1] + newstr[0][i] + ' ' +
                newstr[1][i - 1] + newstr[1][i] + ' ' +
                newstr[2][i - 1] + newstr[2][i]
                ) == braile[_iBraile]){

                returnStr = returnStr.concat(_iBraile);
                break;
            }

        }
        console.log('skipped \n' +
            newstr[0][i - 1] + newstr[0][i] + '\n' +
            newstr[1][i - 1] + newstr[1][i] + '\n' +
            newstr[2][i - 1] + newstr[2][i] );
    };
    return returnStr;
}

if(typeof module != "undefined")
    module.export = Braile;