"use strict";

module.exports = {
  "routes": [
    {
      "method": "GET",
      "path": "/upload-contact",
      "handler": "upload-contact.find"
    },
    {
      "method": "GET",
      "path": "/upload-contact/:slug",
      "handler": "upload-contact.findOne"
    },
    {
      method: "POST",
      path: "/upload-contact",
      handler: "upload-contact.create"
    }
  ]
};