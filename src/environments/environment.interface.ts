export interface Environment {
  production: boolean,
  httpBackend: string;
}

export type Profile = 'dev' | 'local' | 'prod' | 'test';