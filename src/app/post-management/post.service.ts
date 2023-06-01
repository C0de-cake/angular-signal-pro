import {computed, Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPost} from "./post.model";
import {toSignal} from "@angular/core/rxjs-interop";
import {catchError, map, Observable, of} from "rxjs";
import {State} from "./state.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseURL = 'https://jsonplaceholder.typicode.com';

  private savePost$: WritableSignal<State<IPost>> = signal(new State<IPost>("INIT"));

  posts: Signal<State<Array<IPost>> | State<null> | undefined> = toSignal(this.load());
  savePost = computed(() => this.savePost$());

  constructor(private http: HttpClient) {
  }

  load(): Observable<State<Array<IPost>> | State<null>> {
    return this.http.get<Array<IPost>>(`${this.baseURL}/posts`).pipe(
      map(posts => {
          // throw new Error("An error occured");
          return new State<Array<IPost>>('OK', posts, undefined);
        }
      ),
      catchError((error) => {
        return of(new State<Array<IPost>>('ERROR', undefined, error));
      })
    );
  }

  save(newPost: IPost): void {
    this.http.post<IPost>(`${this.baseURL}/posts`, newPost).pipe(
      // tap(() => {
      //   throw new Error('An error occured while saving the post')
      // })
    ).subscribe({
      next: post => this.savePost$.set(new State<IPost>('OK', post)),
      error: err => {
        console.log('throw error');
        this.savePost$.set(new State<IPost>('ERROR', undefined, err))
      }
    });
  }
}
