import { PLATFORM } from 'aurelia-pal';
import { RouterConfiguration, Router } from 'aurelia-router';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { PostService } from './common/services/post-service';
import { AuthService } from './common/services/auth-service';
import { inject } from 'aurelia-framework';

@inject(PostService, EventAggregator, AuthService)
export class App {
  myTags: any[];
  myArchives: any[];
  message: 'pureza';
  currentUser: any;
  router: Router;
  userSubcription: Subscription;

  constructor(private postService: PostService, private ea: EventAggregator, private authService: AuthService) {
  }
  attached() {
    this.postService.allTags().then((data: any) => {
      this.currentUser = this.authService.currentUser;
      this.userSubcription = this.ea.subscribe('user', user => {
        this.currentUser = user;
      })
      this.myTags = data.tags;
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
    });
    this.postService.allArchives().then((data: any) => {
      this.myArchives = data.archives;
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
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('./auth/login'), title: 'Login' },
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('./posts/view'), title: 'Post View' },
      { route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('./posts/tag-view'), title: 'Posts by Tag' },
      { route: 'archive/:archive', name: 'archive-view', moduleId: PLATFORM.moduleName('./posts/archive-view'), title: 'Posts by Archive' }
    ]);
  }

  detached() {
    this.userSubcription.dispose();
  }
}
