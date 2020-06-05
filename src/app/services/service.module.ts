import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  declarations: [
  ],
  imports: [
      CommonModule

  ],
  providers: [
    ModalUploadService
  ],
})
export class ServiceModule { }
