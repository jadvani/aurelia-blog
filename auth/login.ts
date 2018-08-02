import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { AuthService } from '../common/services/auth-service';

@inject(AuthService, EventAggregator, Router)
export class Login {
  message: string;
  name: any;
  error: any;

  constructor(private authService: AuthService, private ea: EventAggregator, private router: Router) {
  }
  login() {
    this.authService.login(this.name).then((data: any) => {
      this.ea.publish('user', data.user);
      console.log(data);
      
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.ea.publish('toast', {
        message: error.message
      });
    });
  }
}
