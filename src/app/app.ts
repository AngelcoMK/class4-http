import { Component, inject, signal, type OnInit } from '@angular/core';
import type { Post } from './post.type';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private postService = inject(PostService);

  posts = signal<Post[]>([]);
  isLoading = signal(false);

  ngOnInit() {
    this.isLoading.set(true);

    this.postService.getPosts().subscribe((posts) => {
      this.posts.set(posts);
      this.isLoading.set(false);
      console.log('Posts inside of the http call', this.posts, Date.now());
    });

    console.log('Posts outside of the http call', this.posts, Date.now());
  }
}