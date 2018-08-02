import { PLATFORM } from 'aurelia-pal';
import { PostService } from '../common/services/post-service';
import { inject } from 'aurelia-framework';

@inject(PostService)
export class ArchiveView {
  message: string;
  archive: any;
  posts: any;


  constructor(private postService: PostService) {
    this.message = 'Archive world';
  }
  activate(params) {
    this.archive = params.archive;
    this.postService.postsByArchive(this.archive).then((data: any) => {
      this.posts = data.posts;
    }).catch(error => {
      message: error.message;
    });
  }
}

