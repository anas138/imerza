import { createHash } from "crypto";

// const code_challenge = "m1wpu0NoAXVM8xM11WW7a7Lm6ChklNDi-driMXdwGHY";
// const code_verifier = "DkLhw-01VgPbProzP1XLLKGjksXG_YuWyv_ZeLe3fQ0";
//
// const base64Decode = (str) => {
//   return Buffer.from(str, "base64url");
// };
//
// const base64Encode = (str) => {
//   return Buffer.from(str).toString('base64url');
// };
//
// const sha256 = (str) => {
//   return createHash("sha256").update(str).digest('hex');
// };
//
// console.log(base64Decode(code_challenge).toString('hex')); // hashed verifier
// console.log(sha256(code_verifier));

const jwk = {
  kty: "RSA",
  n: "pOptbzcmWxAtxy_WXmpFyVQcpnZ_OhkehQyiL1VR5TGou084z5quLv2-pLZua2__BisR8KSnRB406HPpOLyzEoKkk1T2BR1HZj_AILO9XU6kpTk2XHG9-iBkj6UD_A3RD0WWAA2zlUQqdQs3NJYhZ1Lei_f_llDDUL7-aDOXFkItfw7vPfzY8v510mulNXJGYMAmCs8CG6KkUWJZXQS9XAJHsWfPbUNpDVWOvovR98zXsx7OfJdNKlnNvk_mEX4vNY2_JoMMt1KczJFzZuNpSI1EYPmMdeNunpWN-IaBCNNa_emHEk5eC7_GXsBlaYIKtbdKFeJLizTnHC8haAtDQw",
  e: "AQAB",
};

const token =
  "eyJhbGciOiJSUzI1NiJ9.eyJzY29wZSI6InByb2plY3Q6NjI4ZmZhMjM0YWVmOGM4MjY0MmRjMTU1IGNvbGxhdGVyYWw6cmVhZCBjb2xsYXRlcmFsOndyaXRlIiwiaWF0IjoxNjUzNjg4NDk5LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJzdWIiOiI2MjdjMTQ1ODY1Y2M2MGNlNzczNGE2OTIiLCJhdWQiOiJjbXMiLCJleHAiOjE2NTM2ODg1NTl9.fpR2-0vkvYB5Nl0UoqDICq_klIeSY4UXbZJrS_snVMl3h1CWikyurqjusBC37-AKyOjaFdvTPnNaVsCInS49tfqM1njMVxOcoR1qvLdHJRs1BbJjrkc03dJBhLcxHGG_XLIq_8X9GNVLBc3MvXSv7UZKRyoIUuVd93RORILEoMhGDLTGJovo672pf-Bbk89KLrAqNmwPxDmPWCtKOwUScE3PfeF4Kculc7LRmG2JDfk8xlKJQxRGambUjCYebFDiLJQ8xcXNJLfK_pVexd0ixp85dk5XtmBv96PdmOS2rf-zrMMDXzxaLSvwWVNnkGBANhopzFdG6M7CyBYo1klreA";
/**
 * @type {import('jose').PublicKeyObject}
 */
// const key = await jose.importJWK(jwk, 'RS256');
// console.log(key.toPEM());

import crypto from 'crypto';
const pub = crypto.createPublicKey({
  format: 'jwk',
  key: jwk,
}).export({
  format: 'pem',
  type: 'pkcs1'
});

console.log(pub);

import jsonwebtoken from "jsonwebtoken";

console.log(jsonwebtoken.verify(token, pub, {
  algorithms: ['RS256']
}));
