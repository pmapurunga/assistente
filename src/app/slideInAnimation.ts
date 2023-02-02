import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideInAnimation =
    trigger('routeAnimation', [
        state('*', style({
            position: 'fixed',
            width: '100%',
            height: '100%'
        })),
        transition(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        transition(':leave', [
            animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ])
    ]);
