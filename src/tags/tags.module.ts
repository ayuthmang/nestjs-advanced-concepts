import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule implements OnApplicationBootstrap {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationBootstrap() {
    /*
    // ⚠️ Make sure to comment out everything inside this method, before continuing onto later lessons ⚠️
    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId({ hello: 'world' }, contextId);
    const tagsService = await this.moduleRef.resolve(TagsService, contextId);
    console.log(tagsService);
    const tagsServices = await Promise.all([
      this.moduleRef.resolve(TagsService, contextId),
      this.moduleRef.resolve(TagsService, contextId),
    ]);
    console.log(tagsServices[0] === tagsServices[1]); */
  }
}