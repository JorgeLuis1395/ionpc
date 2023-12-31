import { UserSchema } from '../schemas/user.schema';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { CorsMiddleware } from '../middlewares/cors.middleware';
import { RoomSchema } from './../schemas/room.schema';
import {EventsGateway} from '../chat.gateway';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
    controllers: [RoomsController],
    providers: [RoomsService, EventsGateway],
    exports: [RoomsService]
})

export class RoomsModule {
}
