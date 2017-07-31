import {TasklistFilterPipe} from '../../../app/dashboard/tasklist/tasklist-filter.pipe';
import {Tasklist} from '../../../app/_models';

const TASKLISTS: Tasklist[] = [
  {id: 93, name: 'dasdasad', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null},
  {id: 94, name: 'dasffdf', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null},
  {id: 95, name: 'zccxzc', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null},
  {id: 96, name: 'zccxASS', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null},
  {id: 92, name: 'zccxGHR', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null},
  {id: 98, name: 'WWgfgd', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null}
];

describe('Test Pipe TasklistFilterPipe', () => {
  let pipe: TasklistFilterPipe;
  let data = TASKLISTS;
  beforeEach(() => {
    pipe = new TasklistFilterPipe();
  });

  it('should return filted tasklist when filterQuery is matched', () => {
    expect(pipe.transform(data, 'das').length).toEqual(2);
    expect(pipe.transform(data, 'das').length).toEqual(2);

    expect(pipe.transform(data, 'gfgd')[0]).toEqual(TASKLISTS[5]);
  });

  it('should return completed data when filterQuery is empty', () => {
    expect(pipe.transform(data, '').length).toEqual(TASKLISTS.length);
    expect(pipe.transform(data, '')[0]).toEqual(TASKLISTS[0]);
    expect(pipe.transform(data, '')[3]).toEqual(TASKLISTS[3]);
  });

  it('should return empty result when filterQuery is NOT matched', () => {
      expect(pipe.transform(data, 'van').length).toEqual(0);
    });

  it('should return empty result when data is EMPTY', () => {
      expect(pipe.transform([], 'van').length).toEqual(0);
    });
});
