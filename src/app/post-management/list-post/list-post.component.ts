import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostService} from "../post.service";
import {IPost} from "../post.model";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  public postService = inject(PostService);

  constructor() {
  }

  ngOnInit(): void {
  }

  postById(index: number, post: IPost) {
    return post.id;
  }
}
