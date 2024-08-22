import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiOkResponsePaginated, IdParam, IdResponse } from '@app/libs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Authorize } from 'src/decorators';
import { CreateTaskRequest, SearchTaskItem, SearchTasksRequest, SetCompleteTaskRequest, UpdateTaskRequest } from './dtos';
import { GetTaskDetailsResponse } from './dtos/get-details.dtos';

@ApiTags('tasks')
@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @Authorize()
  @ApiOkResponsePaginated(SearchTaskItem)
  search(@Query() request: SearchTasksRequest) {
    return this.taskService.search(request);
  }

  @Get('/:id')
  @Authorize()
  @ApiOkResponse({ type: GetTaskDetailsResponse })
  detail(@IdParam() id: string) {
    return this.taskService.detail(id);
  }

  @Post()
  @Authorize()
  @ApiOkResponse({ type: IdResponse })
  create(@Body() request: CreateTaskRequest) {
    return this.taskService.create(request);
  }

  @Put('/:id')
  @Authorize()
  @ApiOkResponse({ type: IdResponse })
  update(@IdParam() id: string, @Body() request: UpdateTaskRequest) {
    return this.taskService.update(id, request);
  }

  @Put('/:id/status')
  @Authorize()
  @ApiOkResponse({ type: IdResponse })
  setComplete(@IdParam() id: string, @Body() request: SetCompleteTaskRequest) {
    return this.taskService.setComplete(id, request);
  }

  @Delete('/:id')
  @Authorize()
  @ApiOkResponse({ type: IdResponse })
  delete(@IdParam() id: string) {
    return this.taskService.delete(id);
  }
}
