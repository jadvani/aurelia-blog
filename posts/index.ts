import { App } from './../app';
import { inject } from 'aurelia-framework';
import { PostService } from 'common/services/post-service';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(PostService,EventAggregator)
export class Index {
  message: string;
  myPostPreviews: any[];

  constructor(private postService: PostService, private ea: EventAggregator) {
  }


  attached() {

    this.postService.allPostPreviews()
      .then((data: any) => {

        if (data.errors) {
          //handle errors
        }
        else {
          this.myPostPreviews = data.posts;
          console.log('posts en index', this.postService.posts);
        }

      })
      .catch(err => {
        console.error(err.message);

      });

  }




}
