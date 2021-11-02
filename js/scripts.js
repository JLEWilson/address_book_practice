// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.addresses = {};
  this.addressId = 0;
}

Contact.prototype.addAddress = function(address) {
  address.addressId = this.assignId()
  this.addresses[address.addressId] = address;
};

Contact.prototype.assignId = function() {
  this.addressId += 1;
  return this.addressId;
};
Contact.prototype.findAddress = function(id) {
  if (this.addresses[id] != undefined) {
    return this.addresses[id];
  }
  return false;
};
Contact.prototype.deleteAddress = function(id) {
  if (this.addresses[id] === undefined) {
    return false;
  }
  delete this.addresses[id];
  return true;
};
//Business logic for Address
function Address(addressType,address){
  this.addressType = addressType;
  this.address = address;
}

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function displayAddressDetails(contact){
  let addressList = $("ol#addresses");
  let htmlForAddressInfo = "";
  Object.keys(contact.addresses).forEach(function(key){
    const address = contact.findAddress(key);
    htmlForAddressInfo += "<li id=" + address.addressId + ">" + address.addressType + ": " + address.address + "</li>";
  });
  addressList.html(htmlForAddressInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  displayAddressDetails(contact);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}
//
function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    let inputtedFirstName = $("input#new-first-name").val();
    let inputtedLastName = $("input#new-last-name").val();
    let inputtedPhoneNumber = $("input#new-phone-number").val();
    let inputtedEmailAddress = $("input#new-email-address").val();
    let inputtedAddress = $("input#new-address").val();
    let inputtedAddressType = $("select#address-type option:selected").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-address").val("");
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedAddress);
    let newAddress = new Address(inputtedAddressType, inputtedAddress);
    newContact.addAddress(newAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
  
});