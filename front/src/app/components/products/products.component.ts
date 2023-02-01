import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  paymentBtn:boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.getUserData().result.user_payment === "null"){
      this.paymentBtn = true;
    }
  }

}
