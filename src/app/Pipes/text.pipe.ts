import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text'
})
export class TextPipe implements PipeTransform {

  transform(value: string, format: string): any {
    if(value == null){
      return 'carregando'
    }
    else if (format === 'text'){

      return value.replace(/\\n/g, '<br>');

    } else if (format === 'textarea'){

      return value.replace(/\\n/g, '\n');
    }
    
  }

}
