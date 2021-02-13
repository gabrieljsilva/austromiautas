import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { hash, genSalt } from 'bcrypt';

import { User } from '../entities/User';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    event.entity.password = await hash(event.entity.password, await genSalt(8));
    event.entity.email = event.entity.email.toLowerCase();
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    if (event.entity.password) {
      event.entity.password = await hash(event.entity.password, await genSalt(8));
    }
  }
}
