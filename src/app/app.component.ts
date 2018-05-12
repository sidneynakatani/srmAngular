import { AppModule } from './app.module';
import { Component, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CONFIG } from '../app.config';
import { ClientService } from './service/client.service';
import {NgForm} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from './model/cliente';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'SRM Assets';
  rForm: FormGroup;
  post: any;
  risco  = '';
  name  = '';
  value = 0;
  nameValidate = false;
  riscos = ['A', 'B', 'C'];



  public clientList: Cliente[];

  constructor(private clientService: ClientService, 
              private fb: FormBuilder) {

    this.rForm = fb.group({
      'name' : ['', Validators.required],
      'risco' : ['', Validators.required],
    });

  }

  ngOnInit(): void {
     console.log('init');
     this.getUsers();

  }



  getUsers() {
    this.clientService.getAll().subscribe((data: Cliente[]) => this.clientList = data);
  }



  addPost(post) {
    this.risco = post.risco == null ? '' : post.risco;
    this.name  = post.name  == null ? '' : post.name;

    if ( this.name.length > 0 && this.risco.length > 0 && this.value > 0) {
      this.nameValidate = false;
      this.rForm.reset();

      const cliente = new  Cliente();
      cliente.nomeCliente = this.name;
      cliente.limiteDeCredito = this.value;
      cliente.risco = this.risco;
      this.clientService.add(cliente);

      this.value = 0;

    } else {
      this.nameValidate = true;
    }
  }

}
