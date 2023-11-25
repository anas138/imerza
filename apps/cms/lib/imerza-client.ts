import { ImerzaClient } from '@imerza/client';

/**
 * Get an Imerza Client instance for this access token
 * @param accessToken
 * @returns {ImerzaClient}
 */
const getImerzaClient = (accessToken: unknown) => {
  return new ImerzaClient({
    url: process.env.NEXT_PUBLIC_IMERZA_API,
    auth: {
      token: accessToken as string,
    }
  })
};

export default getImerzaClient;
