import {EncoderAwareInterface, PlainTextPasswordEncoder, User as BaseUser} from '@rxstack/security';

export class User extends BaseUser implements EncoderAwareInterface {
  getEncoderName(): string {
    return PlainTextPasswordEncoder.ENCODER_NAME;
  }
}