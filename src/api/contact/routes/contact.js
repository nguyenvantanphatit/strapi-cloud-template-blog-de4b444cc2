"use strict";

module.exports = {
  "routes": [
    {
      "method": "GET",
      "path": "/contacts",
      "handler": "contact.find"
    },
    {
      "method": "GET",
      "path": "/contacts/:slug",
      "handler": "contact.findOne"
    },
    {
      method: "POST",
      path: "/contacts",
      handler: "contact.create"
    }
  ]
};