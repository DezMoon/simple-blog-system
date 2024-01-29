import { Component } from '@angular/core';
import { PostsService } from '../services/PostsService';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  posts: any[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
