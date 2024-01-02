import { Injectable } from '@nestjs/common';
// import { RequestContext } from 'nestjs-request-context';
import {
  DataSource,
  EntitySubscriberInterface,
  InsertEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { EntityAuditable, EntityAuditableSoft } from './base-entity';

@Injectable()
export class GlobalSubscriber
  implements EntitySubscriberInterface<EntityAuditable>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return EntityAuditable;
  }

  beforeInsert(event: InsertEvent<EntityAuditable>): void {
    if (!event.entity) {
      return;
    }

    // event.entity.createdBy =
    //   RequestContext.currentContext?.req?.user?.id ?? 'ANONYMOUS';
  }

  beforeUpdate(event: UpdateEvent<EntityAuditable>): void {
    if (!event.entity) {
      return;
    }

    // event.entity.updatedBy =
    //   RequestContext.currentContext?.req?.user?.id ?? 'ANONYMOUS';
  }
}

@Injectable()
export class SoftRemoveSubscriber
  implements EntitySubscriberInterface<EntityAuditableSoft>
{
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return EntityAuditableSoft;
  }

  beforeSoftRemove(
    event: SoftRemoveEvent<EntityAuditableSoft>,
  ): void | Promise<any> {
    if (!event?.entity) {
      return;
    }

    // event.entity.deletedBy =
    //   RequestContext.currentContext?.req?.user?.id ?? 'ANONYMOUS';
  }
}
