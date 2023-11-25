export interface ImerzaClientAuthToken {
  token: string;
}

export type ImerzaClientAuth = ImerzaClientAuthToken;

export interface ImerzaClientConfig {
  url: string;
  auth?: ImerzaClientAuth;
}

export class ImerzaClient {
  /**
   * Imerza Client
   * @param config
   */
  constructor(private config: ImerzaClientConfig) {}

  get Collateral() {
    return new Collateral(this);
  }

  public fetch(url: string, options?: RequestInit) {
    return fetch(this.config.url + url, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        authorization: `Bearer ${this.config.auth.token}`,
      },
    });
  }
}

export class Collateral {
  public constructor(private imerzaClient: ImerzaClient) {}

  async listGalleries() {
    return (await this.imerzaClient.fetch("/collateral/galleries")).json();
  }
}
