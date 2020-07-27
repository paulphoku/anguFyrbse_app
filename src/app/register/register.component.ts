import { Component, OnInit } from '@angular/core';
import { ApisService } from '../apis.service'
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../validators/phone-validator'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup; submitted = false; setError: string;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      usr_fname: ['', Validators.required],
      usr_lname: ['', Validators.required],
      usr_tel: ['', Validators.required], phoneNumberValidator,
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
    console.log('First Name', this.regForm.value.usr_fname);
    console.log('Last Name', this.regForm.value.usr_lname);
    console.log('Tel', this.regForm.value.usr_tel);

    if (this.regForm.value.usr_fname && this.regForm.value.usr_lname && this.regForm.value.usr_tel) {
      if (this.regForm.value.usr_fname >= 2) {
        console.log("valid");
      } else {
        console.log("min length is two max is 50");
      }
    }
  }

  revert() {
    this.regForm.reset();
  }

}
