import type { componentSchema } from '@kotidok/schemas';
import type z from 'zod';
import { RequestConfigBuilder } from './request-config-builder';

class ApiInterface {
  protected apiPath: string;
  protected config: RequestConfigBuilder = new RequestConfigBuilder();
  constructor(apiPath: string) {
    this.apiPath = apiPath;
  }

  /**A mock error-response with the status 500, error-field in the body set to "not-implemented". */
  protected mockErrorResponse = new Response(
    JSON.stringify({
      error: 'not-implemented',
    }),
    { status: 500 },
  );

  /**Builds a full address concatenated after the main api-path, out of the provided array of strings. */
  protected withApiPath(...path: string[]) {
    return [`${this.apiPath}`, ...path].join('/');
  }

  /**Registers a new user. */
  async registerUser(credentials: any) {
    const config = this.config
      .method('POST')
      .contentJson()
      .body(credentials)
      .credentialsInclude()
      .get();
    return await fetch(this.withApiPath('auth/register'), config);
  }

  /**Logs a user in. */
  async loginUser(credentials: any) {
    const config = this.config
      .method('POST')
      .credentialsInclude()
      .contentJson()
      .body(credentials)
      .get();
    return await fetch(this.withApiPath('auth/login'), config);
  }

  /**Logs a user out. */
  async logoutUser() {
    const config = this.config.method('PUT').credentialsInclude().get();
    return await fetch(this.withApiPath('auth/logout'), config);
  }

  /**Returns the users current session. */
  async getUserSession() {
    const config = this.config.method('GET').credentialsInclude().get();
    return await fetch(this.withApiPath('auth/session'), config);
  }

  /**Creates a new event for a component. */
  async createEvent(payload: any) {
    return await fetch(this.withApiPath('components', payload.component_id, 'events'), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(payload),
    });
  }

  /**Returns all properties owned by the currently authenticated user. */
  async getOwnedProperties() {
    const config = this.config.method('GET').credentialsInclude().get();
    return await fetch(this.withApiPath('properties'), config);
  }

  /**Creates a new component. */
  async createComponent(payload: z.infer<typeof componentSchema>) {
    const config = this.config
      .method('POST')
      .credentialsInclude()
      .contentJson()
      .body(payload)
      .get();
    return await fetch(this.withApiPath('components'), config);
  }

  /**Retuns a component by its id. */
  async getComponentById(componentId: string) {
    const config = this.config.method('GET').credentialsInclude().get();
    return await fetch(this.withApiPath('components', componentId), config);
  }

  /**Returns all children and grandchildren of a component by id. */
  async getComponentChildren(componentId: string, name?: string, page?: number, limit?: number) {
    const query = [];
    if (name) query.push(`name=${name}`);
    if (typeof page === 'number') query.push(`page=${page}`);
    if (typeof limit === 'number') query.push(`limit=${limit}`);
    const queryParams = query.join('&');

    const config = this.config.method('GET').credentialsInclude().get();
    return await fetch(
      this.withApiPath('components', componentId, `children?${queryParams}`),
      config,
    );
  }

  /**Returns all events of a component and its children and grandchildren. */
  async getComponentEvents(componentId: string, title?: string) {
    const config = this.config.method('GET').credentialsInclude().get();
    return await fetch(
      this.withApiPath('components', componentId, `events?title=${title}`),
      config,
    );
  }

  /**Returns all event transactions for a component by id. */
  async getComponentTransactions(componentId: string, queryStr?: string) {
    const config = this.config.method('GET').credentialsInclude().get();
    return await fetch(
      this.withApiPath('components', componentId, `transactions?q=${queryStr}`),
      config,
    );
  }

  /**Returns all roles associated with a component. */
  async getComponentRoles(componentId: string) {
    const config = this.config.method('GET').credentialsInclude().get();
    return await fetch(this.withApiPath('components', componentId, 'roles'), config);
  }
}

/**Contains methods to make calls to the server api. */
export const apiInterface = new ApiInterface(
  import.meta.env.MODE === 'production'
    ? 'https://www.kotidok.fi/api'
    : 'http://localhost:3000/api',
);
