import {Authen} from './authen';
export class Tasklist {
    id: number;
    name: string;
    user: string;
    share: number;
    count: number;
    done: number;
    authen_users: Authen[];
}
