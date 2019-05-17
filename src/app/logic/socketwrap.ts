import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SocketWrap {
  open(url: string) {
    let states = new Subject();
    let tweets = new Subject();

    let socket = new WebSocket(url);
    socket.addEventListener('open', () => states.next('open'));
    socket.addEventListener('close', () => states.next('closed'));
    socket.addEventListener('message', e => {
      tweets.next(e.data);
    });

    return {
      states,
      tweets,
      send(message: string) {
        socket.send(message);
      }
    }
  }
}
