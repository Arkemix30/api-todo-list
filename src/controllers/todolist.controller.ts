import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Todolist} from '../models';
import {TodolistRepository} from '../repositories';

@authenticate('jwt')
export class TodolistController {
  constructor(
    @repository(TodolistRepository)
    public todolistRepository: TodolistRepository,
  ) { }

  @post('/todolists')
  @response(200, {
    description: 'Todolist model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todolist)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todolist, {
            title: 'NewTodolist',
            exclude: ['_id'],
          }),
        },
      },
    })
    todolist: Omit<Todolist, '_id'>,
  ): Promise<Todolist> {
    return this.todolistRepository.create(todolist);
  }

  @get('/todolists/count')
  @response(200, {
    description: 'Todolist model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Todolist) where?: Where<Todolist>,
  ): Promise<Count> {
    return this.todolistRepository.count(where);
  }

  @get('/todolists')
  @response(200, {
    description: 'Array of Todolist model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todolist, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Todolist) filter?: Filter<Todolist>,
  ): Promise<Todolist[]> {
    return this.todolistRepository.find(filter);
  }

  @patch('/todolists')
  @response(200, {
    description: 'Todolist PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todolist, {partial: true}),
        },
      },
    })
    todolist: Todolist,
    @param.where(Todolist) where?: Where<Todolist>,
  ): Promise<Count> {
    return this.todolistRepository.updateAll(todolist, where);
  }

  @get('/todolists/{id}')
  @response(200, {
    description: 'Todolist model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Todolist, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Todolist, {exclude: 'where'}) filter?: FilterExcludingWhere<Todolist>
  ): Promise<Todolist> {
    return this.todolistRepository.findById(id, filter);
  }

  @patch('/todolists/{id}')
  @response(204, {
    description: 'Todolist PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todolist, {partial: true}),
        },
      },
    })
    todolist: Todolist,
  ): Promise<void> {
    await this.todolistRepository.updateById(id, todolist);
  }

  @put('/todolists/{id}')
  @response(204, {
    description: 'Todolist PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() todolist: Todolist,
  ): Promise<void> {
    await this.todolistRepository.replaceById(id, todolist);
  }

  @del('/todolists/{id}')
  @response(204, {
    description: 'Todolist DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.todolistRepository.deleteById(id);
  }
}
