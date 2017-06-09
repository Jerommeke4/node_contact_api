const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// contact mongo db
mongoose.connect('mongodb://mongo/contacts');

// setup application
app.use(bodyParser.json());
app.use(function (req, res, next) {
    req.getRequestUrl = function () {
        return req.protocol + "://" + req.get('host') + req.path;
    };
    return next();
});

const contactTranslator = require('./service/ContactTranslator');
const contactModel = require('./schema/contactModel');

const cm = new contactModel();

app.get('/contact', function (req, res) {
    var contacts = [];
    var q = req.query.q ? req.query.q : null;
    var ref = req.query.ref ? req.query.ref : null;
    var dbContacts = cm.findByQuery(q, ref, function (dbContacts) {
        dbContacts.forEach(function (d) {
            contacts.push(new contactTranslator(d).translate(req));
        });
        res.jsonp(contacts);
    });
});

app.get('/contact/:contact_id', function (req, res) {
    var id = req.param('contact_id').toString();
    var dbContact = cm.findById(id, function (dbContact) {
        if (dbContact === null) {
            res.status(404).send();
        } else {
            res.jsonp(new contactTranslator(dbContact).translate(req));
        }
    });
});

app.post('/contact', function (req, res) {
    var body = req.body;
    cm.insert(body, function (dbContact) {
        res.status(201).jsonp(new contactTranslator(dbContact).translate(req));
    });

});

app.put('/contact/:contact_id', function (req, res) {
    var body = req.body;
    var id = req.param('contact_id').toString();
    var contact = cm.update(id, body, function (dbContact) {
        return res.jsonp(new contactTranslator(dbContact).translate(req));
    });
});

app.delete('/contact/:contact_id', function (req, res) {
    var id = req.param('contact_id').toString();
    cm.delete(id);
    res.jsonp();
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});