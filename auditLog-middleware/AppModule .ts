import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLogService } from './audit-log.service';
import { AuditLogSchema } from './audit-log.schema';
import { AuditLogMiddleware } from './audit-log.middleware';

@Module({
imports: [
MongooseModule.forFeature([{ name: 'AuditLog', schema: AuditLogSchema }]),
],
providers: [AuditLogService],
})
export class AppModule implements NestModule {
configure(consumer: MiddlewareConsumer) {
consumer.apply(AuditLogMiddleware).forRoutes('*');
}
}