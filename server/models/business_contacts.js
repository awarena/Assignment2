let mongoose = require('mongoose');

// create a model class
let businessContactsModel = mongoose.Schema({
    "contact_name": String,
    "contact_number": String,
    "contact_email": String,
},
    {
        collection: "business_contacts"
    });

module.exports = mongoose.model('Business Contacts', businessContactsModel);