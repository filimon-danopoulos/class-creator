
exports.parse = function(json) {
    var result = [];
    for (var propName in json) {
        if (json.hasOwnProperty(propName)) {
            var prop, member;
            prop = json[propName];
            member = {};

            member.accessor = exports.helpers.getAccessor(propName);
            //member.type = getType(prop);
            member.construct = exports.helpers.getConstruct(propName);
            member.name = exports.helpers.getName(propName); 
            result.push(member);
        }
    }
    return result;
};
};


