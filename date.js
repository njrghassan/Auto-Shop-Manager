exports.getDate = function (){
    const today = new Date();
    const options = {
        year: "numeric",
        day: "numeric",
        month: "long"
    };
    return today.toLocaleDateString("en-CA", options);
};

exports.getYear = function(){
    const today = new Date();
    const options = {
        year: "numeric",
    };
    return today.toLocaleDateString("en-CA", options);
};


