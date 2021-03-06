import {authenticate} from '@loopback/authentication';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Todolist,
  User
} from '../models';
import {TodolistRepository} from '../repositories';

@authenticate('jwt')
export class TodolistUserController {
  constructor(
    @repository(TodolistRepository)
    public todolistRepository: TodolistRepository,
  ) { }

  @get('/todolists/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Todolist',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Todolist.prototype._id,
  ): Promise<User> {
    return this.todolistRepository.user(id);
  }
}
