import {OAuthConfigDefinition} from '@shipengine/connect'

const oauthConfig: OAuthConfigDefinition = {
  tokenProperties: {
    tokenExpirationLengthTimeUnit: 's',
  },
  authorizationProcess: {
    loginRequest: {
      method: 'GET',
      url: 'https://connect-mock-server.herokuapp.com/auth/login',
      queryParameters: [
        { name: 'client_id', value: '{CLIENT_ID}' },
        { name: 'redirect_uri', value: '{CUSTOM.RuName}' }
      ],
    },
    redirectRequest: {
      queryParameters: [
        { name: 'code', value: '{AUTHORIZATION_CODE}' }
      ]
    },
    authorizeRequest: {
      method: 'POST',
      url: 'https://connect-mock-server.herokuapp.com/auth/authorize',
      contentType: 'application/x-www-form-urlencoded',
      headerParameters: [
        { name: 'Authorization', value: '{CLIENT_ID}:{CLIENT_SECRET}', encoding: 'basic-auth' },
      ],
      queryParameters: [],
      bodyParameters: [
        { name: 'grant_type', value: 'authorization_code' },
        { name: 'code', value: '{AUTHORIZATION_CODE}' },
        { name: 'redirect_uri', value: '{CUSTOM.RuName}' }
      ],
    },
    authorizeResponse: {
      queryParameters: [],
      bodyParameters: [
        { name: 'access_token', value: '{ACCESS_TOKEN}' },
        { name: 'expires_in', value: '{ACCESS_TOKEN_EXPIRES_IN}' },
        { name: 'refresh_token', value: '{REFRESH_TOKEN}' },
        { name: 'refresh_token_expires_in', value: '{REFRESH_TOKEN_EXPIRES_IN}' },
      ],
    },
  },
  refreshTokenProcess: {
    refreshTokenRequest: {
      method: 'POST',
      url: 'https://connect-mock-server.herokuapp.com/auth/refresh',
      headerParameters: [
        { name: 'Authorization', value: '{CLIENT_ID}:{CLIENT_SECRET}', encoding: 'basic-auth' },
      ],
      queryParameters: [],
      bodyParameters: [
        { name: 'grant_type', value: 'refresh_token' },
        { name: 'refresh_token', value: '{REFRESH_TOKEN}' },
      ],
    },
    refreshTokenResponse: {
      queryParameters: [],
      bodyParameters: [
        { name: 'access_token', value: '{ACCESS_TOKEN}' },
        { name: 'expires_in', value: '{ACCESS_TOKEN_EXPIRES_IN}' },
      ],
    },
  },
}

export default oauthConfig;