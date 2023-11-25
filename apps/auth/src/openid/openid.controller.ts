import { Controller, Get } from '@nestjs/common';

@Controller('.well-known')
export class OpenidController {
  @Get('openid-configuration')
  openidConfiguration() {
    return {
      issuer: 'http://localhost:3000',
      authorization_endpoint: 'http://localhost:3000/authorize',
      token_endpoint: 'http://localhost:3000/token',
      jwks_uri: 'http://localhost:3000/jwk',
      response_types_supported: ['code'],
      response_modes_supported: ['query'],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['RS256'],
      scopes_supported: ['openid', 'email'],
      claims_supported: ['sub', 'iss', 'email'],
      grant_types_supported: ['authorization_code'],
    };
  }
}
