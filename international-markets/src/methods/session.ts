/**
 * An example session object
 * Use this interface to define the session that will be created in your connection
 */
export interface Session {
  id: string;
  ip: string;
  created: string;
  language: string;
}
