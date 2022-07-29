import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouteService } from 'src/app/services/routes-service.service';

interface ICodeLinks {
  title: string;
  links: {
    title: string;
    description: string;
    address: string;
  }[];
  currentPage: number;
  totalPages: number;
  previousPage: number;
  nextPage: number;
}

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent {

  public requestsLoading: any = {
    'paginate-angular': { loading: false, error: false },
    'paginate-nodejs': { loading: false, error: false },
    'paginate-react': { loading: false, error: false },
  }

  public codeLinks: { [category: string]: ICodeLinks } = {};

  constructor(
    private routesService: RouteService,
    private toastrService: ToastrService,
  ) {
    //Angular
    this.paginateSnippets(1, 'angular');

    // //NodeJs
    this.paginateSnippets(1, 'nodejs');

    // //React
    this.paginateSnippets(1, 'reactjs');
  }

  //PAGINATE----------------------------------------------------------------------------------------------------------------
  public paginateSnippets(page: number = 1, category: string): void {

    /*Requests loading*/
    this.requestsLoading[`paginate-${category}`] = { loading: true, error: false };

    this.routesService.paginateCodeSnippets(page, category).subscribe({
      next: ({ success, data }) => {
        if (success) this.codeLinks[category] = data;
        else this.toastrService.error('Failed to retrieve news posts');
      },
      error: () => {
        /*Requests loading*/
        this.requestsLoading[`paginate-${category}`] = { loading: false, error: true };
        this.toastrService.error('Failed to retrieve news posts');
      },
      complete: () => {
        /*Requests loading*/
        this.requestsLoading[`paginate-${category}`] = { loading: false, error: false };
      }
    });
  }

}
