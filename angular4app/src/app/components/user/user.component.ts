import { Component, OnInit } from '@angular/core';
import {DataService } from '../../services/data.services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name:string;
  age:number;
  email:string;
  address:Address;
  hobbies:string [];
  hello:any;
  
  
  constructor(private datatService:DataService) {
    console.log('constructor ran...');
  }

  ngOnInit() {
    console.log('ngOnInit ran...');
    this.name = 'John Doe';
    this.age = 34;
    this.address ={
      street: '124 Main St',
      city: 'Boston',
      state: 'MA'
    }
    this.hobbies= ['coding', 'watch movies'];
  }

  onClick(){
    this.name ='Khoa Vo';
    this.hobbies.push('playing guitar');
  }

  addHobby(hobby){
    //console.log(hobby);
    this.hobbies.unshift(hobby);
    return false;
  }

  deleteHobby(hobby){
    for(let i=0; i< this.hobbies.length; i++){
      if(this.hobbies[i]== hobby){
        this.hobbies.splice(i,1);
      }
    }
  }
}


interface Address {
  street: string,
  city: string,
  state: string
}