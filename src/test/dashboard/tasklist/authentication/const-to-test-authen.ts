import {Tasklist, Authen, User} from '../../../../app/_models';

export const TASKLISTS: Tasklist[] = [
  { id: 93, name: 'dasdasad', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null },
  { id: 94, name: 'sdsdsds', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null},
  { id: 95, name: 'zccxzc', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null },
  { id: 96, name: 'sdasad', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null },
  { id: 92, name: 'Xzsffsdf', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null },
  { id: 98, name: 'gdgfgd', is_write: null, user: null, share: null, count: null, done: null, authorizedUsers: null, owner: null
  }
];

export const AUTHORS: Authen[] = [
  {user_id: 4, task_list_id: 12, is_write: true, user_email: null},
  {user_id: 5, task_list_id: 12, is_write: null, user_email: null},
];

export const AUTHOR_TO_CREATE: Authen = {user_id: 6, task_list_id: 12, is_write: null, user_email: null};

export const AUTHOR_TO_DELETE: Authen = {user_id: 4, task_list_id: 12, is_write: null, user_email: 'eeeee@gmail.com'};

export const USERS: User[] = [
  {id: 2, email: 'tuanho@novahub.vn', password: ''},
  {id: 3, email: 'tuanhung9293@gmail.com', password: ''},
  {id: 4, email: 'eeeee@gmail.com', password: ''},
  {id: 5, email: 'eeee22e@gmail.com', password: ''},
  {id: 6, email: 'eeee22ssse@gmail.com', password: ''},
  {id: 7, email: 'sdasadsad@gdgdgfg.gfh', password: ''},
  {id: 8, email: '11@gmail.com', password: ''}
];
