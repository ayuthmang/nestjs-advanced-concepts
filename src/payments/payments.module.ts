import { Module } from '@nestjs/common';
import { PaymentsWebhookController } from './payments-webhook.controller';
import { SubscriptionsService } from './subscriptions.service';
import { NotificationsService } from './notifications.service';
import { EventContext } from './context/event-context';

@Module({
  controllers: [PaymentsWebhookController],
  providers: [NotificationsService, SubscriptionsService, EventContext],
})
export class PaymentsModule {}
