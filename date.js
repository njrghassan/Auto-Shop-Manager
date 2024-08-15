exports.getDate = function (){
    const today = new Date();
    const options = {
        year: "numeric",
        day: "numeric",
        month: "numeric"
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


