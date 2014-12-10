var exports = {};

exports.parse = function(json) {
    var result = [];
    for (var propName in json) {
        if (json.hasOwnProperty(propName)) {
            var prop, member;
            prop = json[propName];
            member = {};

            member.accessor = exports.helpers.getAccessor(propName);
            //member.type = getType(prop);
            member.construct = getConstruct(propName);
            member.name = getName(propName); 
            result.push(member);
        }
    }
    return result;
};

exports.helpers = {};

exports.helpers.getAccessor = function (propName) {
    return propName[0] === '_' ? "private" : "public";
};

function getType(prop) {
    throw "Not implemented";    
}

function getConstruct(propName) {
    if (propName[0] === '_') {
        propName = propName.slice(1);    
    }

    if (propName.toUpperCase() === propName) {
        return "constant";    
    } else if (propName[0].toUpperCase() !== propName[0]) {
        return "field";
    } else {
        return "property";
    }
}

function getName(propName) {
   if (propName[0] === '_') {
       propName = propName.slice(1);
   }
   return propName;
}


module.exports = exports;
