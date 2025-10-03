export interface AuthStrategy {
  authenticate(data: any): Promise<{ accessToken: string; user: any }>;
}
