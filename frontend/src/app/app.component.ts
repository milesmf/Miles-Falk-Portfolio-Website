import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { RouteService } from './services/routes-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription, take, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppStateService } from './app-state.service';
import { v4 as uuidv4 } from 'uuid';
import { LiveNotificationService } from './services/live-notification.service';
import { Title } from '@angular/platform-browser';

interface IBitcoinToDollar { price: number; trend: number };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  @ViewChild('biosScrollAnchor') biosScrollAnchor!: ElementRef;

  private subscriptions: Subscription[] = [];

  public biosLoading: boolean = true;
  public showBlinker: boolean = true;
  public populateBiosIndex!: number;

  public dateToday: number = Date.now();
  public currentYear: number = new Date().getFullYear();
  public deviceInfo: DeviceInfo = this.deviceDetectorService.getDeviceInfo();

  public timeoutResumeClick: boolean = false;

  public dynamicBiosMessages: any = [
    { text: this.deviceInfo?.userAgent },
    { text: `DATE: ${new Date().toISOString().slice(0, 10)}` },
    { text: this.deviceInfo?.device },

    { text: `BROWSER: ${this.deviceInfo?.browser_version}` },
    { text: `SYS: ${this.deviceInfo?.os_version}` },
    { text: "HOST: https://www.milesfalk.com" },

    { text: "Javascript...ready" },
    { text: "HTML...ready" },
    { text: "CSS...ready" },

    { text: "Preflight request sent", icon: "check" },
    { text: "CORS successfully configured", icon: "check" },
    { text: "Parsing DNS records", icon: "check" },

    { text: "Establishing secure connection...", },
    { text: "Connected successfully to server", icon: "check" },
    { text: "Connected successfully to DB", icon: "check" },

    { text: "Fetching BTC/USD price", icon: "check" },
    { text: "Calculating BTC price trends", icon: "check" },
    { text: "Loading home page", icon: "check" },

    { text: `"The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."` },
    { text: "733,738 confirmations" },
    { text: "215 bytes" }
  ]

  public bitcoinToDollar!: IBitcoinToDollar;

  public activeMenuIndex: number = 0;

  constructor(
    private routesService: RouteService,
    private deviceDetectorService: DeviceDetectorService,
    private router: Router,
    private toastrService: ToastrService,
    private appStateService: AppStateService,
    private liveNotificationService: LiveNotificationService,
    private title: Title,
  ) {

    this.initiateBios();

    this.title.setTitle("Miles Falk");

    //
    this.appStateService.initState();

    //Upsert unique client ID
    this.subscriptions[this.subscriptions?.length] = this.appStateService.getState('user_id').pipe(
      take(1)
    ).subscribe((user_id: string | undefined) => {
      if (!user_id) {
        this.appStateService.setState('user_id', uuidv4(), true);
        console.log("Client assigned user_id")
      };

      //
      this.liveNotificationService.init();
    });

    //
    this.subscriptions[this.subscriptions?.length] = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event?.urlAfterRedirects?.startsWith('/portfolio')) this.activeMenuIndex = 0;
        else if (event?.urlAfterRedirects?.startsWith('/projects')) this.activeMenuIndex = 1;
        else if (event?.urlAfterRedirects?.startsWith('/code')) this.activeMenuIndex = 2;
        else if (event?.urlAfterRedirects?.startsWith('/about')) this.activeMenuIndex = 3;
      }
    });


    this.routesService.getBtcUsdPrice().subscribe({
      next: ({ success, data }) => {
        if (success) this.bitcoinToDollar = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {

      }
    })

    this.subscriptions[this.subscriptions?.length] = this.appStateService.getState('btc_usd').pipe(
      filter((btc_usd) => !!btc_usd)
    ).subscribe((btc_usd: IBitcoinToDollar) => this.bitcoinToDollar = btc_usd);
  }

  private initiateBios(): void {
    setTimeout(() => {
      this.showBlinker = false;
      this.populateBios();
    }, 1000 * 1.75)
  }

  public populateBios(): void {
    setTimeout(() => {
      if (isNaN(this.populateBiosIndex)) this.populateBiosIndex = 0;
      else this.populateBiosIndex++;

      //Auto-scroll to bottom of bios
      this.biosScrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (this.populateBiosIndex < this.dynamicBiosMessages?.length) {
        this.populateBios();
      } else {
        this.showBlinker = true;
        setTimeout(() => {
          this.biosLoading = false; //Hide bios loading
          document.body.classList.remove("disableBodyScroll"); //Enable scrollbar when bios loading is finished
          window.scrollTo(0, 0); //Reset scroll position
        }, 1000 * 2.5);
      }
    }, 100)
  }

  public downloadResume(newTab: boolean = true): void {

    //Timeout to prevent spamming
    this.timeoutResumeClick = true;
    setTimeout(() => this.timeoutResumeClick = false, 2500);

    //
    this.routesService.downloadResume().subscribe({
      next: (response: any) => {
        const url = window.URL.createObjectURL(new Blob([response.body], { type: 'application/pdf' }));

        //Open resume in current window or new tab depending on mobile/tablet vs desktop
        if (newTab) window.open(url);
        else window.location.href = url;
      },
      error: (error) => {
        this.toastrService.error('Error retrieving resume!');
        console.log(error)
      },
      complete: () => {

      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((sub: Subscription) => sub?.unsubscribe());
  }

}
