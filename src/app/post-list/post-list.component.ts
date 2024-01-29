import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from './post'; // Assuming a Post interface/class

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Output() postSelected = new EventEmitter<Post>();

  onPostSelect(post: Post) {
    this.postSelected.emit(post);
  }
}
