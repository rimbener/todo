import Todo from 'src/app/models/todo.model';
import { HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

export const todoMockBuilder = (() => {
    let todoid = 0;
    return (title: string, resolved: boolean, image?: string): Todo => {
        todoid += 1;
        return { id: todoid, title, resolved, image };
    };
})();

export const todoArrayMock = [todoMockBuilder('test', true), todoMockBuilder('other', false), todoMockBuilder('test', true)];

export const todoListGetFromApiStub = ((params: HttpParams) => {
    if (params && params.get('title')) {
        return of(todoArrayMock.filter(item => item.title === params.get('title')));
    }
    if (params && params.get('resolved')) {
        return of(todoArrayMock.filter(item => item.resolved === (params.get('resolved') === 'true')));
    }
    if (params && params.get('id')) {
        return of(todoArrayMock.filter(item => item.id === parseInt(params.get('id'), 10)));
    }
    return of(todoArrayMock);
});
