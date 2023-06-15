import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Posts } from "./posts.entity";
import { RolesAuthGuard } from "src/auth/auth.service";
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger'; 

@ApiTags('Posts')
@Controller('Posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @ApiOperation({ summary: 'Retorna uma lista com todos os posts.', tags: ['get']})
    @ApiResponse({status: 200, description: 'Array JSON com os posts encontrados.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros retorna um NOT FOUND.'})
    @Get()
    async getAll() {
        try{
            return await this.postService.getAll()
        } catch(err) {
            throw new HttpException({
                statusCode: err.getStatus(),
                err: err.message,
            }, err.getStatus(), {
                cause: err,
            });
        }
    }

    @ApiOperation({ summary: 'Retorna um post dado um determinado ID.', tags: ['get']})
    @ApiResponse({status: 200, description: 'JSON com informações do post solicitado.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros retorna um NOT FOUND.'})
    @Get(':id')
    async getById(
        @Param('id') id: number
    ) {
        try{
            return await this.postService.getAll()
        } catch(err) {
            throw new HttpException({
                statusCode: err.getStatus(),
                err: err.message,
            }, err.getStatus(), {
                cause: err,
            });
        }
    }

    @ApiOperation({ summary: 'Cria um novo post.', tags:['post']})
    @ApiResponse({status: 400, description: 'Caso os campos não obrigatórios sejam nulos, retorna um BAD REQUEST.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard(['autor', 'admin']))
    @Post()
    async createPost(@Body() post: Posts) {
        try {
            const camposObrigatorios = ['title', 'subtitle', 'content', 'author'];
            const camposEmFalta = [];

            camposObrigatorios.forEach((campo) => {
                if (!post[campo]) {
                    camposEmFalta.push(campo);
                }
            });

            if (camposEmFalta.length > 0) {
                throw new HttpException(`Os campos ${camposEmFalta} são obrigatórios!`, HttpStatus.BAD_REQUEST);
            }

            return await this.postService.createPost(post);
        } catch(err) {
            throw new HttpException({
                statusCode: err.getStatus(),
                err: err.message,
            }, err.getStatus(), {
                cause: err,
            });
        }
    }

    @ApiOperation({summary: 'Atualiza um post.', tags: ['put']})
    @ApiResponse({status: 200, description: 'Post atualizado com sucesso.'})
    @ApiResponse({status: 400, description: 'Caso o body ou o id não contenham nada, retorna um BAD REQUEST.'})
    @ApiResponse({status: 404, description: 'Caso o post a ser atualizado não exista retorna um NOT FOUND.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard(['autor', 'admin']))
    @Put(':id')
    async updatePost(
        @Param('id') id: number,
        @Body() post: Posts
    ) {
        try {
            if (!id) {
                throw new HttpException('ID é obrigatório!', HttpStatus.BAD_REQUEST);
            }

            return await this.postService.updatePost(id, post);
        } catch(err) {
            throw new HttpException({
                statusCode: err.getStatus(),
                err: err.message,
            }, err.getStatus(), {
                cause: err,
            });
        }
    }

    @ApiOperation({summary: 'Deleta um post, somente Autores ou ADMINs podem apagar posts.', tags: ['delete']})
    @ApiResponse({status: 200, description: 'Post deletado com sucesso.'})
    @ApiResponse({status: 401, description: 'Caso o solicitante da exclusão não Seja um AUTOR ou ADMIN, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'Caso o post a ser deletado não exista retorna um NOT FOUND.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível apagar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @UseGuards(AuthGuard('jwt'), new RolesAuthGuard(['autor', 'admin']))
    @Delete(':id')
    async deletePost(
        @Param('id') id: number
    ) {
        try {
            if (!id) {
                throw new HttpException('ID é obrigatório!', HttpStatus.BAD_REQUEST);
            }

            return await this.postService.deletePost(id);
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
