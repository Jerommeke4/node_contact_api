const Contact = require('../model/contact');
const Email = require('../model/contact/email');
const PhoneNumber = require('../model/contact/phoneNumber');

contactTranslator = function(mongoContact) {

    this.mongoContact = mongoContact;

    /**
     *
     * @returns {contact}
     */
    this.translate = function(req) {
        var contact = new Contact(this.mongoContact.label);
        contact.setId(this.mongoContact.id);
        contact.ref = this.mongoContact.ref;
        contact.addName(this.mongoContact.name.firstName, this.mongoContact.name.middleName, this.mongoContact.name.lastName);
        this.mongoContact.emails.forEach(function (data) {
            var email = new Email(data.address, data.role);
            contact.addEmail(email);
        });
        this.mongoContact.phoneNumbers.forEach(function (data) {
            contact.addPhoneNumber(new PhoneNumber(data.number, data.role));
        });

        contact.addLink('self', req.getRequestUrl() + '/' + contact.id);
        return contact;
    };
};

module.exports = contactTranslator;