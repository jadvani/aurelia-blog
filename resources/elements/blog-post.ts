import {bindable} from 'aurelia-framework';

export class BlogPost {
  @bindable post;

  constructor(){
    console.log('post en blog-post', this.post);
  }

  valueChanged(newValue, oldValue) {
    console.log('value changed', this.post);
  }
}

