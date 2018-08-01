import { inject } from 'aurelia-framework';

import { PostService } from '../common/services/post-service';

@inject(PostService)
export class View {

  error: string;
  post: any[];

  constructor(private postService: PostService) {

  }

  activate(params) {
    this.postService.find(params.slug).then((data: any) => {
      if (data.error) {
        this.error = data.error;
      }
      else {
        this.post=data.post;
      }
    });

  }
}
