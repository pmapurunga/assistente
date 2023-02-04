import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(items: any[], field: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!items) {
      return [];
    }

    return items.sort((a, b) => {
      const aNum = parseInt(a[field].match(/\d+/)[0], 10);
      const bNum = parseInt(b[field].match(/\d+/)[0], 10);
      if (aNum < bNum) {
        return order === 'asc' ? -1 : 1;
      }
      if (aNum > bNum) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
