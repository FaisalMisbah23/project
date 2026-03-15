import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

const devConfig = { port: 3000 }
const proConfig = { port: 4000 }



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      database: process.env.DB_NAME ?? 'skills_project_db',
      host: process.env.DB_HOST ?? '127.0.0.1',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      type: 'postgres',
      username: process.env.DB_USER ?? 'skills_project_user',
      password: process.env.DB_PASSWORD ?? '',
      entities:[],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    SongsModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: DevConfigService,
    useClass: DevConfigService
  }, {
      provide: "CONFIG",
      useFactory: () => {
        return process.env.NODE_ENV === "development" ? devConfig : proConfig;
      }
    }],
})
export class AppModule implements NestModule {
  constructor(private datasource:DataSource){
    console.log("DBName ",datasource.driver.database)
  }
  configure(consumer: MiddlewareConsumer) {
    // option 1 
    // consumer.apply(LoggerMiddleware).forRoutes('songs');

    // option 2 
    // consumer.apply(LoggerMiddleware).forRoutes({
    //   path:"songs",
    //   method:RequestMethod.GET
    // })

    // option 3
    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }


}
