import * as moment from 'moment';
export class DateFormatValueConverter {
  //time format
  toView(value) {
    return moment(value).format('MMMM Do YYYY, h:mm a')
  }

  fromView(value) {

  }
}

