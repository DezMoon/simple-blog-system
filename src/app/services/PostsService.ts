import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Adjust URL if your server endpoint is different
const BASE_URL = 'http://localhost:3000/api/posts';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  // Get all posts (optional filters and search)
  getPosts(filter?: string, search?: string): Observable<Post[]> {
    const url = `${BASE_URL}?${filter ? `filter=${filter}` : ''}${
      search ? `&search=${search}` : ''
    }`;
    return this.http.get<Post[]>(url).pipe(
      catchError((error) => of([])) // Handle errors appropriately
    );
  }

  // Create a new post
  createPost(title: string, content: string): Observable<Post> {
    const body = { title, content };
    return this.http.post<Post>(BASE_URL, body);
  }

  // Update a post
  updatePost(postId: number, title: string, content: string): Observable<Post> {
    const url = `${BASE_URL}/${postId}`;
    const body = { title, content };
    return this.http.put<Post>(url, body);
  }

  // Delete a post
  deletePost(postId: number): Observable<any> {
    const url = `${BASE_URL}/${postId}`;
    return this.http.delete(url).pipe(
      map(() => {
        /* Handle successful deletion */
      })
    );
  }
}
