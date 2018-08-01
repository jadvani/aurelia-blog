import { App } from './../app';
import { inject } from 'aurelia-framework';
import { PostService } from 'common/services/post-service';

@inject(PostService)
export class Index {
  message: string;
  myPostPreviews: any[];

  constructor(private postService: PostService) {
  }


  attached() {


    this.postService.allPostPreviews()
      .then((data: any) => {

        if (data.errors) {
          //handle errors
        }
        else {
          this.postService.posts = data.posts;
          this.myPostPreviews = this.postService.posts;
          console.log(this.postService.posts);
        }

      })
      .catch(err => {
        console.error(err.message);

      });
  }

}
