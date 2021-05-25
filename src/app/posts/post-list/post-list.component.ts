import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription} from 'rxjs'

import { Post } from '../post.model'
import { PostsService } from '../posts.service';

@Component({
  selector : 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
isLoading =  false;
  // posts = [
  //   {title: 'First Post', content: 'The first post\'s content'},
  //   {title: 'Second Post', content: 'The second post\'s content'},
  //   {title: 'Third Post', content: 'The third post\'s content'}
  // ];
  // @Input()
  posts: Post[] = [];
  private postsSub : Subscription;

  constructor(public postsService: PostsService){

  }

  ngOnInit(){
    this.isLoading= true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListner().subscribe((posts: Post[]) => {
      this.isLoading=false;
      this.posts = posts;
    })
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  onDeletePost(id: String){
    this.postsService.deletePosts(id);

  }

}
