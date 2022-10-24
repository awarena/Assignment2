let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


// create a reference to the model
let BusinessContacts = require('../models/business_contacts');

module.exports.displayBusinessContactsList = (req, res, next) => {
    BusinessContacts.find((err, businessContactsList) => {
        if (err) {
            return console.error(err);
        }
        else {


            res.render('business_contacts/list',
                {
                    title: 'Business Contacts',
                    BusinessContactsList: businessContactsList,
                    displayName: req.user ? req.user.displayName : ''
                });
        }
    }).sort({ 'contact_name': 1 });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('business_contacts/add', {
        title: 'Add Business Contact',
        displayName: req.user ? req.user.displayName : ''
    })
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = BusinessContacts({
        "contact_name": req.body.contact_name,
        "contact_number": req.body.contact_number,
        "contact_email": req.body.contact_email,
    });

    BusinessContacts.create(newContact, (err, Contact) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/business-contacts-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    BusinessContacts.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('business_contacts/edit', {
                title: 'Edit Contact', contact: contactToEdit,
                displayName: req.user ? req.user.displayName : ''
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = BusinessContacts({
        "_id": id,
        "contact_name": req.body.contact_name,
        "contact_number": req.body.contact_number,
        "contact_email": req.body.contact_email,
    });

    BusinessContacts.updateOne({ _id: id }, updatedContact, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the book list
            res.redirect('/business-contacts-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    BusinessContacts.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the book list
            res.redirect('/business-contacts-list');
        }
    });
}