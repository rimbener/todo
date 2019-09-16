/**
 * Esta clase tiene una lista observable que se actualiza cuando:
 *      se hace un get desde la API
 *      se actualiza una tarea
 * Es abstracta y las clases que la extiendan deben implementar los métodos init y updateList
 */
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import Todo from 'src/app/models/todo.model';
import { environment } from 'src/environments/environment.prod';

export default class ObservableTodoList {
    private apiUrl: string;
    private http: HttpClient;

    public todoList: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

    constructor(http: HttpClient) {
        this.http = http;
        this.apiUrl = environment.todoAPI;
    }

    /**
     * El next se hace con el spread operator para que tenga una nueva referencia y se actualicen las vistas
     * @param list nueva lista
     */
    public nextList(list: Todo[]) {
        this.todoList.next(list);
    }

    public getFromApi(params?: HttpParams): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl, { params }).pipe(
            tap(list => list),
            catchError(err => {
                console.log(err);
                // MOSTRAR EL MENSAJE DE OTRA FORMA Y NO CON UN ALERT, SOLAMENTE ESTÁ DE EJEMPLO
                alert('Se produjo un error y no se pudieron cargar los ToDo');
                return of([new Todo()]);
            })
        );
    }

    public getTodoList$(): Observable<Todo[]> {
        return this.todoList.asObservable();
    }

    public getTodoList(): Todo[] {
        return this.todoList.value;
    }
}
