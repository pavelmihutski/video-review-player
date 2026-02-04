import { ApplicationError, type ApplicationErrorContext } from '@/errors';

export type PlayerErrorCode = 'PLAYER_ERROR' | 'PLAYER_NETWORK_ERROR' | 'PLAYER_MEDIA_ERROR' | 'PLAYER_LOADING_ERROR';

export class PlayerError extends ApplicationError<PlayerErrorCode> {
  constructor(code: PlayerErrorCode, message?: string, context?: ApplicationErrorContext) {
    super(code, message, context);
    Object.setPrototypeOf(this, PlayerError.prototype);
  }
}
