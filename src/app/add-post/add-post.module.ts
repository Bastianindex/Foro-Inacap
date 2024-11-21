import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostPage } from './add-post.page';
import { AddPostPageRoutingModule } from './add-post-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AddPostPageRoutingModule
  ],
  declarations: [AddPostPage]
})
export class AddPostPageModule {}
