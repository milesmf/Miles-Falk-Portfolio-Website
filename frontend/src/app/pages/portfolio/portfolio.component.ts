import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouteService } from 'src/app/services/routes-service.service';

interface IPortfolioPosts {
  years: string;
  link: string;
  development_status: string;
  launch_status: string;
  // launched: boolean;
  images: { imageUrl: string; text: string }[],
  body: string;
  preview: string;
  client: string;
  requirements: string[],
  technologies: string[],
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {

  public requestsLoading: any = {
    'load-portfolio': { loading: false, error: false },
  }

  public portfolioPosts: IPortfolioPosts[] = [];

  public showModal: boolean = false;
  public showModalIndex: number = 0;

  constructor(
    private routesService: RouteService,
    private toastrService: ToastrService,
  ) {
    /*Requests loading*/
    this.requestsLoading[`load-portfolio`] = { loading: true, error: false };

    this.routesService.getPortfolio().subscribe({
      next: ({ success, data }) => {
        if (success) this.portfolioPosts = data;
        else this.toastrService.error('Failed to retrieve news posts');
      },
      error: () => {
        /*Requests loading*/
        this.requestsLoading[`load-portfolio`] = { loading: false, error: true };
        this.toastrService.error('Failed to retrieve news posts');
      },
      complete: () => {
        /*Requests loading*/
        this.requestsLoading[`load-portfolio`] = { loading: false, error: false };
      }
    });
  }

  public toggleModal(index?: number): void {
    this.showModal = !this.showModal;

    if (index !== undefined) this.showModalIndex = index;
  }

}
