import { Todo } from 'src/models';

interface ITodoCreateRes {
  statusCode?: number;
  message: string;
  data?: Todo | Todo[];
}

export { ITodoCreateRes };
