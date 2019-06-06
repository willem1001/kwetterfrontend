import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class PushNotificationsService {

  constructor() {}

  create(title: string, options ?: PushNotification): any {
    return new Observable(function (obs) {
      if (!('Notification' in window)) {
        console.log('Notifications are not available in this environment');
        obs.complete();
      }
      new Notification(title, options);
    });
  }

  generateNotification(source: Array<any>): void {
    source.forEach((item) => {
      let options = {
        body: item.alertContent,
        silent: true
      };
       this.create(item.title, options).subscribe();
    })
  }
}

export interface PushNotification {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
}
