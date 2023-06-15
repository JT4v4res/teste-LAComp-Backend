import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./user.service";
import { User } from "./user.entity";


@Controller('Users')
export class UsersController {
    constructor (private readonly userService: UsersService) {}

    @Get()
    async getAll(){
        try{
            return await this.userService.getAll()
        } catch(err) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                err: err.message,
            }, HttpStatus.NOT_FOUND, {
                cause: err,
            });
        }
    }

    @Get(':id')
    async getById(
        @Param('id') id: number
    ) {
        try {
            return await this.userService.getById(id);
        } catch(err) {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                err: err.message,
            }, HttpStatus.NOT_FOUND, {
                cause: err,
            });
        }
    }

    @Post()
    async createUser(@Body() user: User) {
        try {
            const camposObrigatorios = ['email', 'name', 'role', 'password'];
            const camposEmFalta = [];

            camposObrigatorios.forEach((campo) => {
                if (!user[campo]) {
                    camposEmFalta.push(campo);
                }
            });

            if (camposEmFalta.length > 0) {
                throw new HttpException(`Os campos ${camposEmFalta} são obrigatórios!`, HttpStatus.BAD_REQUEST);
            }

            return await this.userService.createUser(user);
        } catch(err) {
            throw new HttpException({
                statusCode: err.getStatus(),
                err: err.message,
            }, err.getStatus(), {
                cause: err,
            });
        }
    }

    @Patch(':id')
    async updateUser(
        @Param('id') id: number,
        @Body() user: Partial<User>
    ) {
        try {
            return await this.userService.updateUser(id, user);
        } catch(err) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                err: 'Não foi possível atualizar o usuário',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: err,
            });
        }
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id: number
    ) {
        try {
            return await this.userService.deleteUser(id);
        } catch(err) {
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                err: 'Não foi possível deletar o usuário.',
            }, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: err,
            })
        }
    }
}