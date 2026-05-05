/**Allows building of configs for the fetch-method.*/
export class RequestConfigBuilder {
  protected config: Record<string, any> = {};
  method(m: 'GET' | 'POST' | 'HEAD' | 'OPTIONS' | 'PUT' | 'PATCH' | 'DELETE') {
    this.config = {
      ...this.config,
      method: m,
    };
    return this;
  }

  credentials(c: 'include') {
    this.config = {
      ...this.config,
      credentials: c,
    };

    return this;
  }

  content(type: 'application/json') {
    this.config = {
      ...this.config,
      headers: {
        ...this.config.headers,
        'Content-Type': type,
      },
    };
    return this;
  }

  contentJson() {
    return this.content('application/json');
  }

  credentialsInclude() {
    return this.credentials('include');
  }

  body(data: Record<string, any>) {
    this.config = {
      ...this.config,
      body: JSON.stringify(data),
    };
    return this;
  }

  /**Returns the currently built config object, and resets the builder. */
  get() {
    const config = { ...this.config };
    this.config = {};
    return config;
  }
}
