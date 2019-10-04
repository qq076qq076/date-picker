import { trigger, transition, query, style, group, animate, state } from '@angular/animations';

export const timePickerMaskAnimation =
  trigger('timePickerAnimation', [
    state('true', style({ opacity: 1 })),
    state('false', style({ opacity: 0 })),
    transition('void => *', [
      style({
        opacity: 0,
      }),
      animate('200ms')
    ]),
    transition('* => void', [
      style({
        opacity: 1,
      }),
      animate('200ms')
    ]),
  ]);
