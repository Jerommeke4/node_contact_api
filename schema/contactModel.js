const mongoose = require('mongoose');
const cs = require('./contactSchema');


var model = function () {

    this.model = mongoose.model('Contact', cs());

    this.instance = function (obj) {

    };

    this.findByQuery = function (q, ref, callback) {

        var query = {};
        if (q !== null) {
            if (!query.$and) query.$and = [];
            query.$and.push({
                $or: [
                    {label: {$regex: '.*' + q + '.*', $options: 'i'}},
                    {'phoneNumbers.number': {$regex: '.*' + q + '.*', $options: 'i'}},
                    {'emails.address': {$regex: '.*' + q + '.*', $options: 'i'}}
                ]
            });
        }

        if (ref !== null) {
            if (!query.$and) query.$and = [];
            query.$and.push({
                $or: [
                    {ref: ref},
                    {ref: null}
                ]
            });
        }

        console.log(query);
        var result = [];
        var cursor = this.model.find(query).cursor();

        cursor.on('data', function (doc) {
            result.push(doc);
        });

        cursor.on('close', function () {
            callback(result);
        });

    };

    this.findById = function (id, callback) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            this.model.findById(id, function (err, doc) {
                if (err) {
                    throw err;
                } else {
                    callback(doc);
                }
            });
        }
        else {
            callback(null);
        }

    };

    this.findAll = function (callback) {
        var result = [];
        var cursor = this.model.find({}).cursor();

        cursor.on('data', function (doc) {
            result.push(doc);
        });

        cursor.on('close', function () {
            callback(result);
        });
    };

    this.insert = function (obj, callback) {
        var o = new this.model(obj);
        o.save(function (err) {
            if (err) {
                throw err;
            } else {
                callback(obj);
            }
        });
    };

    this.update = function (id, obj, callback) {
        this.model.findByIdAndUpdate(id, {$set: obj}, {new: true}, function (err, contact) {
            if (err) {
                throw err;
            } else {
                return callback(contact);
            }

        });
    };

    this.delete = function (id) {
        this.model.findByIdAndRemove(id, function (error) {
            if (error) {
                throw error;
            }
        });
    };

};

// expose
module.exports = model;