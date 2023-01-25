import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Injectable({
  providedIn: 'root',
})
export class Sweetalert2Service {
  constructor() {}

  show() {
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Okay',
      cancelButtonText: 'Cancel',
      didOpen(popup) {},
    });
  }
}
