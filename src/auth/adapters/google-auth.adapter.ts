import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface GooglePayload {
  aud: string;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthenticatedUser {
  email: string;
  name: string;
  picture?: string;
}

@Injectable()
export class GoogleAuthAdapter {
  private googleUrl = 'https://oauth2.googleapis.com/tokeninfo';

  constructor(private http: HttpService) {}

  async verifyToken(idToken: string): Promise<AuthenticatedUser> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await firstValueFrom(
        this.http.get<GooglePayload>(`${this.googleUrl}?id_token=${idToken}`),
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const payload: GooglePayload = response.data;

      if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
        throw new HttpException('Token inválido', 401);
      }

      return {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      };
    } catch {
      throw new HttpException('Error verificando token', 401);
    }
  }
}
