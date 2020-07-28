import { Component, OnInit } from '@angular/core';
import { ApisService } from '../apis.service'
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../validators/phone-validator'
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup; submitted = false; setError: string;

  constructor(
    private fb: FormBuilder,
    private apis: ApisService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      usr_fname: ['', Validators.required],
      usr_lname: ['', Validators.required],
      usr_tel: ['', Validators.required, phoneNumberValidator],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.regForm.controls; }

  get usr_tel() {
    return this.regForm.get('usr_tel');
  }

  get usr_fname() {
    return this.regForm.get('usr_fname');
  }

  get usr_lname() {
    return this.regForm.get('usr_lname');
  }

  register() {
    let data = this.regForm.value;
    
    this.apis.createUser(data)
    .then(
      res => {
        this.regForm.reset();
        console.log("data saved");
        this.router.navigate(['/home']);
      }
    );
  }

  revert() {
    this.regForm.reset();
  }

}
