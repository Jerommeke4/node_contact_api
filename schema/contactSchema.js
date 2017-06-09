const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function createSchema() {
    return new Schema({
        ref: String,
        label: String,
        name: {firstName: String, middleName: String, lastName: String},
        emails: [{address: String, role: String}],
        phoneNumbers: [{number: String, role: String}]
    });
}

module.exports = createSchema;