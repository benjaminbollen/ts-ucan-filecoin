# Proposal for cosigning API

## register a keypair for Filecoin

opt for interactive verification of key ownership by issueing a challenge

```
POST /api/1.0/blskeypair/requestChallenge
HOST: runfission.com
Content-Type:application/json
Accept:application/json
authorization:"Bearer ${JWT UCAN}"

{
  keypair: {
    rootDid:
    blsPublicKey
  },
}
```

returns
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
