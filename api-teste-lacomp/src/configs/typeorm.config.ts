import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'yourUSer',
    password: 'yourPassword',
    database: 'lacomp_api',
    entities: [__dirname + '/../**/*.entity.{js, ts}'],
    synchronize: true
}
