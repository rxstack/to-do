import {AbstractFixture} from '@rxstack/data-fixtures';
import {Injectable} from 'injection-js';
import {UserService} from '../resources/user/user.service';
import {BcryptPasswordEncoder, EncoderFactory} from '@rxstack/security';

@Injectable()
export class UserFixture extends AbstractFixture {

  async load(): Promise<void> {
    const encoder = this.injector.get(EncoderFactory).get(BcryptPasswordEncoder.ENCODER_NAME);
    const service = this.injector.get(UserService);

    await service.insertMany([
      {
        username: 'admin',
        password: await encoder.encodePassword('admin'),
        roles: [
          'ROLE_ADMIN'
        ]
      },
      {
        username: 'user',
        password: await encoder.encodePassword('user'),
        roles: [
          'ROLE_USER'
        ]
      }
    ]);
  }

  getName(): string {
    return 'user';
  }
}