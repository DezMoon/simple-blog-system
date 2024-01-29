import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    // Add other necessary modules here
  ],
})
export class PostsModule {}
