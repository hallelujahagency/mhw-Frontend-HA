import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastr: ToastrService) {}

  showSuccess(content:string) {
    this.toastr.success(content, 'Success');
  }

  showError(content:string, title:string) {
    this.toastr.error(content, title);
  }


}
