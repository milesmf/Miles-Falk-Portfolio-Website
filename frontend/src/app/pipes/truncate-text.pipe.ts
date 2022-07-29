import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    return value?.length > limit ? (value?.substring(0, (limit - 3)) + '...') : value;
  }
}
