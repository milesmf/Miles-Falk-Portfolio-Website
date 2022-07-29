import { Injectable } from '@angular/core';
import { AppStateService } from '../app-state.service'
import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { SERVER } from '../app.config';

@Injectable({ providedIn: 'root' })
export class LiveNotificationService {
    private user_id: string = "";

    private client: any;

    private liveConnection: boolean = false;
    private liveConnection$: BehaviorSubject<boolean>;

    constructor(
        private appStateService: AppStateService,
    ) {
        this.liveConnection$ = new BehaviorSubject(this.liveConnection);
    }

    public init() {
        // 
        this.appStateService.getState('user_id').pipe(distinctUntilChanged()).subscribe((user_id: any) => {
            if (user_id) {
                this.user_id = user_id

                this.connect();

                this.liveConnection = true;
                this.liveConnection$.next(this.liveConnection);
            } else {
                //TRIGGERED ON LOGOUT
                this.disconnect('init');
            }
        })
    }

    private disconnect(error: string) {
        this.client?.close();

        this.liveConnection = false;
        this.liveConnection$.next(this.liveConnection);

        console.log('Live notifications connection dropped');

        console.log(error)
    }

    private connect() {
        if (this.user_id) {
            this.client = new EventSource(`${SERVER}/notification/?user_id=${this.user_id}`);

            console.log(`Connection established with user: ${this.user_id}`)

            //BTC price changes
            this.client.addEventListener('btcPriceChange', (event: any) => {
                const data = JSON.parse(event.data);
                this.appStateService.setState('btc_usd', data);
            })

            this.client.addEventListener('error', () => {
                this.disconnect('client error');
                setTimeout(this.init.bind(this), 15000);
            })
        } else {
            this.disconnect('no user_id');
            setTimeout(this.init.bind(this), 15000);
        }
    }

    public getLiveConnectionStatus(): BehaviorSubject<boolean> {
        return this.liveConnection$;
    }
}