import { inject } from 'aurelia-framework';
import { PostService } from 'common/services/post-service';

@inject(PostService)
export class Index {
  message: string;
  myPosts: any[];

  constructor(private postService: PostService) {

  }

  attached() {
    this.myPosts = this.postService.posts;
    this.postService.allPostPreviews()
    .then((data: any) => {

      if (data.errors) {
        //handle errors
      }
      else {
        this.postService.posts = data.posts;
        console.log(this.postService.posts);
      }

    })
    .catch(err => {
      console.error(err.message);
      
    });
  }

}
