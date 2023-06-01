import {Component, effect, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IPost} from "../post.model";
import {PostService} from "../post.service";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  public postService = inject(PostService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);


  public postForm = this.formBuilder.nonNullable.group({
    title: new FormControl<string>('', [Validators.required]),
    body: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [Validators.required])
  });

  private creationInProgress = false;

  constructor() {
    effect(() => {
      if (this.postService.savePost().status == 'OK'
        && this.creationInProgress) {
        this.creationInProgress = false;
        this.router.navigate(['']);
      }
    });
  }

  onSave() {
    const post = this.postForm.value as IPost;
    this.creationInProgress = true;
    this.postService.save(post);
  }
}

