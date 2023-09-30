const express = require("express");
const router = express.Router();

const contactsController = require("../../controllers");
const { validateData } = require("../../helpers");
const { getContactById, updateContact } = require("../../models");

router.get("/", contactsController.getContacts);

router.get("/:contactId", contactsController.getContact);

router.post("/", validateData, contactsController.addContact);

router.delete("/:contactId", contactsController.deleteContact);

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;

  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    res.status(400).json({ message: "Missing fields" });
  } else {
    const existingContact = await getContactById(contactId);
    if (existingContact.length === 0) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      const updatedContact = {
        ...existingContact[0],
        name: name || existingContact[0].name,
        email: email || existingContact[0].email,
        phone: phone || existingContact[0].phone,
      };

      await updateContact(contactId, updatedContact);

      res.json({
        message: "Contact updated successfully",
        contact: updatedContact,
      });
    }
  }
});

router.patch("/contacts/:contactId/favorite", ctrlContact.updateStatusContact);

module.exports = router;
