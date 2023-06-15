import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./user.service";
import { User } from "./user.entity";
import { RolesAuthGuard } from "src/auth/auth.service";
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; 

@ApiTags('Users')
@Controller('Users')
export class UsersController {
    constructor (private readonly userService: UsersService) {}

    @ApiOperation({ summary: 'Retorna uma lista com todos os usuários.', tags: ['get']})
    @ApiResponse({status: 200, description: 'Array JSON com os usuáruos encontrados.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros retorna um NOT FOUND.'})
    @Get()
    async getAll(){
        try{
            return await this.userService.getAll()
        } catch(err) {
            throw new HttpException({
                statusCode: err.getStatus(),
                err: err.message,
            }, err.getStatus(), {
                cause: err,
            });
        }
    }

    @ApiOperation({ summary: 'Retorna um usuário dado um determinado ID.', tags: ['get']})
    @ApiResponse({status: 200, description: 'JSON com informações do usuários solicitado.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros retorna um NOT FOUND.'})
    @Get(':id')
    async getById(
        @Param('id') id: number
    ) {
        try {
            return await this.userService.getById(id);
        } catch(err) {
            throw new HttpException({
                statusCode: err.getStatus(),
                err: err.message,
            }, err.getStatus(), {
                cause: err,
            });
        }
    }

    @ApiOperation({ summary: 'Cadastra um usuário novo com role de Autor.', tags:['post']})
    @ApiResponse({status: 400, description: 'Caso os campos não obrigatórios sejam nulos, retorna um BAD REQUEST.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
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

    @ApiOperation({ summary: 'Cadastra um usuário novo com role de Admin, somente admins podem cadastrar novos admins.', tags:['post']})
    @ApiResponse({status: 400, description: 'Caso os campos não obrigatórios sejam nulos, retorna um BAD REQUEST.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado e não possua privilégio de ADMIN, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard(['admin']))
    @Post('/admin')
    async createAdminUser(
        @Body() user: User
    ) {
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

            return this.userService.createAdminUser(user);
        } catch (err) {
            throw new HttpException({
                statusCode: err.getStatus(),
                err: err.message,
            }, err.getStatus(), {
                cause: err,
            });
        }
    }

    @ApiOperation({summary: 'Atualiza um usuário.', tags: ['patch']})
    @ApiResponse({status: 200, description: 'Usuário atualizado com sucesso.'})
    @ApiResponse({status: 400, description: 'Caso o body ou o id não contenham nada, retorna um BAD REQUEST.'})
    @ApiResponse({status: 404, description: 'Caso o usuário a ser atualizado não exista retorna um NOT FOUND.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @Patch(':id')
    async updateUser(
        @Param('id') id: number,
        @Body() user: Partial<User>
    ) {
        try {
            if (!user || !id) {
                throw new HttpException('Id e campos de usuário obrigatórios!', HttpStatus.BAD_REQUEST);
            }

            return await this.userService.updateUser(id, user);
        } catch(err) {
            throw new HttpException({
                statusCode: err.getStatus(),
                err: err.message,
            }, err.getStatus(), {
                cause: err,
            });
        }
    }

    @ApiOperation({summary: 'Deleta um usuário, somente ADMINs podem apagar usuários.', tags: ['delete']})
    @ApiResponse({status: 200, description: 'Usuário deletado com sucesso.'})
    @ApiResponse({status: 401, description: 'Caso o solicitante da exclusão não Seja um ADMIN, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'Caso o usuário a ser deletado não exista retorna um NOT FOUND.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível apagar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard(['admin']))
    @Delete(':id')
    async deleteUser(
        @Param('id') id: number
    ) {
        try {
            if (!id) {
                throw new HttpException('ID é obrigatório!', HttpStatus.BAD_REQUEST);
            }

            return await this.userService.deleteUser(id);
        } catch(err) {
            throw new HttpException({
                statusCode: err.getStatus(),
                err: err.message,
            }, err.getStatus(), {
                cause: err,
            })
        }
    }
}
