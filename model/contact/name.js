var name = function(firstName, middleName, lastName) {
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.presentationName = firstName + ' ' + middleName +  ' ' + lastName;
};

module.exports = name;