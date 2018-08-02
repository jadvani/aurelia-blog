import { App } from './../app';
import { inject } from 'aurelia-framework';
import { PostService } from 'common/services/post-service';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(PostService, EventAggregator)
export class Index {
  message: string;
  myPostPreviews: any[];
  err: any;

  constructor(private postService: PostService, private ea: EventAggregator) {
  }

  attached() {
  	this.postService.allPostPreviews().then((data : any) => {
  		this.myPostPreviews = data.posts;
  	}).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    });
  }


}
