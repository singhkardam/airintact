import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  payment:Number = 0;
  math = Math;
  allData = [
    {
      id:1,
      name: "virat kohli",
      payment: true,
      refrenceId: "vir-1",
      child: [ { id:1, name: "amit kumar" }, { id:1, name: "amit kumar" }, { id:2, name: "alok kumar" }, { id:3, name: "vikram kumar" }, { id:4, name: "naveen kumar" }, { id:5, name: "aasif kumar" }]
    },
    {
      id:2,
      name: "kl rahul",
      payment: true,
      refrenceId: "klr-1",
      child: [ { id:1, name: "amit kumar" }, { id:1, name: "amit kumar" }, { id:2, name: "alok kumar" },{ id:1, name: "amit kumar" }, { id:1, name: "amit kumar" }, { id:2, name: "alok kumar" },{ id:1, name: "amit kumar" }, { id:1, name: "amit kumar" }, { id:2, name: "alok kumar" },{ id:1, name: "amit kumar" }, { id:1, name: "amit kumar" }, { id:1, name: "amit kumar" }, { id:2, name: "alok kumar" },{ id:1, name: "rani kumari" }, { id:2, name: "mithlesh kumar" }, { id:3, name: "gaurav sharma" }, { id:4, name: "nayan tara" }, { id:5, name: "minisha lamba" }]
    },
    {
      id:3,
      name: "rohit sharma",
      payment: true,
      refrenceId: "roh-1",
      child: [ { id:1, name: "bhupender kumar" }, { id:2, name: "ishu kumar" }, { id:3, name: "bhura kumar" }, { id:1, name: "amit kumar" }, { id:1, name: "amit kumar" }, { id:2, name: "alok kumar" }]
    }
  ];
  constructor() { }

  ngOnInit(): void {
    console.log(this.allData)
  }
  onSubmit(event: any, totalIncome: any, id: any){
    this.allData.forEach(function(v, i){
      if(v.id == id){
        console.log(v);
      }
    });
    console.log(totalIncome - parseInt(event.target.paise.value));
  }
}
