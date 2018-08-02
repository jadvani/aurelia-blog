import { PLATFORM } from 'aurelia-pal';
import { PostService } from '../common/services/post-service';
import { inject } from 'aurelia-framework';

@inject(PostService)
export class TagView {
  message: string;
  tag: any;
  posts: any;


  constructor(private postService: PostService) {
    this.message = 'Tag world';
  }
  activate(params) {
    this.tag = params.tag;
    this.postService.postsByTag(this.tag).then((data: any) => {
      this.posts = data.posts;
    }).catch(error => {
      message: error.message
    });
  }
}

