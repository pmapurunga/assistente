import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(birthdate: number, format: string): any {

    const timeDiff = Math.abs(Date.now() - birthdate);
    const years = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));
    const months = Math.floor(timeDiff / (1000 * 3600 * 24 * 30.4375));
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hours = Math.floor(timeDiff / (1000 * 3600));
  
    if (format === 'years') {
      return `${years} anos`;
    } else if (format === 'yearsMonths') {
      return `${years} anos e ${months % 12} meses`;
    } else if (format === 'yearsMonthsDays') {
      return `${years} anos, ${months % 12} meses, and ${days % 30.4375} dias`;
    } else if (format === 'monthsDays') {
      return `${months} meses e ${days % 30.4375} dias`;
    } else if (format === 'daysHours') {
      if (days>0){
        return `${hours % 24} horas`;
      } else{
        return `${days} dias e ${hours % 24} horas`;
      }
    }
  }
  

}
