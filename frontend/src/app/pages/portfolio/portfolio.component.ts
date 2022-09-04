import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { RouteService } from 'src/app/services/routes-service.service';

interface IPortfolioPosts {
  years: string;
  link: string;
  code?: string;
  development_status: string;
  launch_status: string;
  // launched: boolean;
  images: { imageUrl: string; text: string }[],
  body: string;
  client: string;
  requirements: string[],
  technologies: string[],
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PortfolioComponent {

  public requestsLoading: { [request: string]: boolean } = {
    'get-portfolio': false,
  }

  public portfolioPosts: IPortfolioPosts[] = [];

  public showModal: boolean = false;
  public showModalIndex: number = 0;

  constructor(
    private routesService: RouteService,
    private toastrService: ToastrService,
  ) {
    this.requestsLoading['get-portfolio'] = !this.requestsLoading['get-portfolio'];

    this.routesService.getPortfolio().pipe(
      finalize(() => this.requestsLoading['get-portfolio'] = !this.requestsLoading['get-portfolio'])
    ).subscribe({
      next: ({ success, data }) => {
        if (success) this.portfolioPosts = data;
        else this.toastrError();
      },
      error: () => {
        this.toastrError();
      }
    });
  }

  public toggleModal(index?: number): void {
    this.showModal = !this.showModal;

    if (index !== undefined) this.showModalIndex = index;
  }

  private toastrError(): void {
    this.toastrService.error('Failed to retrieve portfolio');
  }

}
