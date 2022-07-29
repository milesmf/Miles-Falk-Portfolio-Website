import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBrandIcons, faRegularIcons, faSolidIcons } from './icons/index';
import { HttpClientModule } from '@angular/common/http';

//Pages
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { CodeComponent } from './pages/code/code.component';

//Components
import { AwesomeIconModule } from './components/awesome-icon/awesome-icon.module';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ToastrModule } from 'ngx-toastr';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { LoadingSpinnerModule } from './components/loading-spinner/loading-spinner.module';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [

  { path: '', redirectTo: 'about', pathMatch: 'full' },

  // { path: 'about', redirectTo: 'about.png' },
  { path: 'about', component: AboutComponent },

  // { path: 'portfolio', redirectTo: 'portfolio.jpg' },
  { path: 'portfolio', component: PortfolioComponent },

  // { path: 'code', redirectTo: 'code.svg' },
  { path: 'code', component: CodeComponent },

  { path: '**', redirectTo: 'about' },
]

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    CodeComponent,
    PaginationComponent,
    TruncateTextPipe,
    AboutComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 2500,
      // disableTimeOut: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-bottom-center',
    }),

    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    //Icons
    FontAwesomeModule,

    //Components
    AwesomeIconModule,
    LoadingSpinnerModule,

    HttpClientModule,

    RouterModule.forRoot(routes, { anchorScrolling: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public faLibrary: FaIconLibrary) {
    this.faLibrary.addIcons(...faBrandIcons, ...faRegularIcons, ...faSolidIcons);
  }
}