import { Component } from '@angular/core';
import { faFileCode, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { RouteService } from 'src/app/services/routes-service.service';

interface IProject {
  title: string;
  body: string;
  tags: string[];
  link: string;
}

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent {

  public requestsLoading: { [request: string]: boolean } = {
    'get-projects': false,
  }

  public projects!: IProject[];

  public projectIcon: IconDefinition = faFileCode;

  constructor(
    private routesService: RouteService,
    private toastrService: ToastrService,
  ) {
    this.requestsLoading['get-projects'] = !this.requestsLoading['get-projects'];

    this.routesService.getProjects().pipe(
      finalize(() => this.requestsLoading['get-projects'] = !this.requestsLoading['get-projects'])
    ).subscribe({
      next: ({ success, data }) => {
        if (success) this.projects = data;
        else this.toastrError();
      },
      error: () => {
        this.toastrError();
      }
    });
  }

  private toastrError(): void {
    this.toastrService.error('Failed to retrieve projects');
  }
}