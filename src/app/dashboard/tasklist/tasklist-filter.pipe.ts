import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'tasklistFilter'
})
export class TasklistFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => row.name.indexOf(query) > -1);
    }
    return array;
  }
}
