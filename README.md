# UCAN Filecoin

UCAN Filecoin is an experimental repository to interact with Filecoin using UCANs.

UCAN (or User Controlled Access Network) is a cryptographic web token to delegate and attentuate permissions originating from the user.

---

🐲 Thread carefully, this is an experimental repository

---

`ts-ucan-filecoin` is an http middleware which offers two services:
- UCAN cosign messages
- UCAN manage hot and cold storage on Filecoin, using Powergate

Web applications can register to the service with a did, and authorize subsequent actions with an appropriate, valid UCAN according to the action policy of the service. Optionally the service can have a price policy, requiring the user to (continuously) pay for services rendered.

In this model, users chose which endpoints to request services from, and authorize them accordingly, or revoke and move to another provider. Or for users who so chose, they can run these services themselves.
