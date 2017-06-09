const Name =  require('./contact/name');

const contact = function(ref, label) {
    this.id = null;
    this.ref = null;
    this.label = label;
    this.name = null;
    this.emails = [];
    this.phoneNumbers = [];
    this.links = [];

    this.addName = function(firstName, middleName, lastName) {
        this.name = new Name(firstName, middleName, lastName);
    };

    /**
     * Add an emails to the contact
     * @param email
     */
    this.addEmail = function(email) {
      this.emails.push(email);
    };

    /**
     * Add a phone number to the contact
     * @param phoneNumber
     */
    this.addPhoneNumber = function(phoneNumber) {
        this.phoneNumbers.push(phoneNumber);
    };

    this.setId = function(val) {
      this.id = val;
    };

    this.addLink = function(rel, href) {
        this.links.push({rel: rel, href: href});
    };

};

module.exports = contact;