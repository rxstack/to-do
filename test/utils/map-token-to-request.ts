import {TokenManagerInterface} from '@rxstack/security';
import {Request} from '@rxstack/core';

export const mapTokenToRequest = async (request: Request, tokenManager: TokenManagerInterface, payload: Object): Promise<void> => {
  const token = await tokenManager.encode(payload);
  request.headers.set('authorization', 'Bearer ' + token);
};