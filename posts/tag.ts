import { EventAggregator } from 'aurelia-event-aggregator';
import { PostService } from './../common/services/post-service';
import { inject } from '../../node_modules/aurelia-framework';


@inject(PostService, EventAggregator)
export class Tag {
  myTags: any[];

  constructor(private postService: PostService, private ea: EventAggregator) {
  }
  created() {
    this.postService.allTags().then((data: any) => {
      console.log('tags?', data);

      this.myTags = data.tags;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    });
  }


  
}
