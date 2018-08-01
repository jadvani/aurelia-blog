import { PLATFORM } from 'aurelia-pal';
import { RouterConfiguration, Router } from 'aurelia-router';


export class App {
  message: 'pureza';
  router: Router;


  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
  
    config.title = 'Pureza Flamenca';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName('./posts/index'), title: 'Home' },
      { route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('./posts/view'), title: 'Post View' },
    ]);
  }
}
