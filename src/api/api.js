// const API = {
//   config: {
//     issuer: 'https://tuzimbee.com/identity',
//     clientId: 'tuzimbe_web_client',
//     redirectUrl: 'io.identityserver.demo:/oauthredirect',
//     scopes: ['openid', 'profile', 'api.simplcommerce', 'offline_access'],
//     serviceConfiguration: {
//       authorizationEndpoint: 'https://tuzimbee.com/connect/authorize',
//       tokenEndpoint: 'https://tuzimbee.com/connect/token',
//       revocationEndpoint: 'https://tuzimbee.com/connect/revocation',
//     },
//   },
// };
import Storage from '../storage/storage';

const API = {
  get: async (url = '', token = '', headers = '') => {
    return Storage.getAuthToken().then((result) => {
      let token = JSON.parse(result);
      return fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        return response.json().then((resultData) => {
          return resultData;
        });
      });
    });
  },
  post: async (url = '', data = {}, headers = '') => {
    return Storage.getAuthToken().then((result) => {
      let token = JSON.parse(result);
      return fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }).then((response) => {
        return response.json().then((resultData) => {
          return resultData;
        });
      });
    });
  },
};

export default API;

let x = {
  issuer: 'https://tuzimbee.com',
  jwks_uri: 'https://tuzimbee.com/.well-known/openid-configuration/jwks',
  authorization_endpoint: 'https://tuzimbee.com/connect/authorize',
  token_endpoint: 'https://tuzimbee.com/connect/token',
  userinfo_endpoint: 'https://tuzimbee.com/connect/userinfo',
  end_session_endpoint: 'https://tuzimbee.com/connect/endsession',
  check_session_iframe: 'https://tuzimbee.com/connect/checksession',
  revocation_endpoint: 'https://tuzimbee.com/connect/revocation',
  introspection_endpoint: 'https://tuzimbee.com/connect/introspect',
  device_authorization_endpoint:
    'https://tuzimbee.com/connect/deviceauthorization',
  frontchannel_logout_supported: true,
  frontchannel_logout_session_supported: true,
  backchannel_logout_supported: true,
  backchannel_logout_session_supported: true,
  scopes_supported: [
    'openid',
    'profile',
    'api.simplcommerce',
    'offline_access',
  ],
  claims_supported: [
    'sub',
    'name',
    'family_name',
    'given_name',
    'middle_name',
    'nickname',
    'preferred_username',
    'profile',
    'picture',
    'website',
    'gender',
    'birthdate',
    'zoneinfo',
    'locale',
    'updated_at',
  ],
  grant_types_supported: [
    'authorization_code',
    'client_credentials',
    'refresh_token',
    'implicit',
    'password',
    'urn:ietf:params:oauth:grant-type:device_code',
  ],
  response_types_supported: [
    'code',
    'token',
    'id_token',
    'id_token token',
    'code id_token',
    'code token',
    'code id_token token',
  ],
  response_modes_supported: ['form_post', 'query', 'fragment'],
  token_endpoint_auth_methods_supported: [
    'client_secret_basic',
    'client_secret_post',
  ],
  id_token_signing_alg_values_supported: ['RS256'],
  subject_types_supported: ['public'],
  code_challenge_methods_supported: ['plain', 'S256'],
  request_parameter_supported: true,
};
