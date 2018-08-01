import { PLATFORM } from 'aurelia-pal';
import { RouterConfiguration, Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostService } from './common/services/post-service';
import { inject } from 'aurelia-framework';

@inject(PostService, EventAggregator)
export class App {
  myTags: any[];
  message: 'pureza';
  router: Router;
  constructor(private postService: PostService, private ea: EventAggregator) {
  }
  attached() {
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

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
  
    config.title = 'Pureza Flamenca';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('./posts/index'), title: 'Home' },
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('./posts/view'), title: 'Post View' },
      { route: 'tags/', name: 'tag-view', moduleId: PLATFORM.moduleName('./posts/tag'), title: 'Posts by Tag' }
    ]);
  }
}
