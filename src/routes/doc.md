# Proposal for cosigning API

## register a keypair for Filecoin

Authorization for signing messages to the Filecoin network is given by a UCAN did:key, so the service must associate a did with each signing BLS key it holds.

We opt for not reusing private keys in the 2-of-2 BLS pairing across independent
users to reduce attack surface, and simplify verifying authorization:

    For each user with keys
      did:key:zRootUser
        |- did:key:zDeviceU
      blsKey:PK_A

    the service (did:key:zCosigning) has a BLS key
      blsKey:PK_B
    which requires
      - a valid UCAN from zRootUser issued for zCosigning for resource PK_A
      - a message M validly signed by PK_A
    to sign M with PK_B

As a KMS for the cosigner, the user can sign `did:key:zCosigning` with PK_A,
(results in 96 byte signature, so hash to 256 bits) as an AES encryption key for PK_B which the user must send to the cosigner service; and the cosigner service must not persist or cache.


```
POST /api/1.0/blskeypair/
HOST: runfission.com
Content-Type:application/json
Accept:application/json
authorization:"Bearer ${JWT UCAN}"

{
  "policy": {
    "type": "dnslink",
    "param": "alice.fission.name"
  }
}
```
where policy can be used by a service to decide how/to whom it would render service. As an example, for the Fission ecosystem, the service would accept requests from the user if the `rootDid` from the UCAN matches the DNS record of the username provided in the policy.
Other policies are possible, for example accepting payments in cryptotokens for services rendered.

The authorization must have an encoded bearer JWT token

```
{
  "alg": "RS256", // (or "EdDSA")
  "typ": "JWT",
  "ucv": "0.5.0", // webnative has 'uav: 1.0.0', raise issue?
}

{
  "aud": audience,
  "iss": issuer,

  "exp": exp,
  "nbf": nbf,

  prf: proof,
  ptc: potency,
  "rsc": {"bls": },
  fct: facts,
}
```

returns
```
{
  challenge: string,
  didCosigner:
}
```

## sign a message for Filecoin

in REST

```
POST /api/1.0/filecoin/message
HOST: runfission.com
Content-Type:application/json
Accept:application/json
authorization:"Bearer ${JWT UCAN}"

{
  message: {
    version: uint64
    to: string // address
    from: string // address
    callSequenceNumber: uint64
    value: BigInt
    gasPrice:
    gasLimit:
    method: // only support send
    params: bytestring
  },
  signature: string, // signature by SK1
}
```

the from address field, must be related to a known did which is at a root in the authorization. As a result, we need an api to register a did

returns messageHash if correctly submitted.

errors: TBD
