import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./post-management/list-post/list-post.component').then(cmp => cmp.ListPostComponent)
  },
  {
    path: 'post/create',
    loadComponent: () => import('./post-management/create-post/create-post.component').then(cmp => cmp.CreatePostComponent)
  }
];
