import { Component, OnInit } from '@angular/core';
import { ApisService } from '../apis.service'
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../validators/phone-validator'
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OneSignalService } from 'ngx-onesignal';

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
    private router: Router,
    private toastr: ToastrService,
    public readonly onesignal: OneSignalService) {
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    (<any>window).ngxOnesignal = onesignal;
  }

  onSubscribe() {
    this.onesignal.subscribe();
  }

  onUnSubscribe() {
    this.onesignal.unsubscribe();
  }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      usr_fname: ['', Validators.required],
      usr_lname: ['', Validators.required],
      usr_tel: ['', Validators.required],
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
    let dataset = this.regForm.value;

    this.apis.createUser(dataset)
      .then(
        res => {
          console.log(res);
          this.regForm.reset();
        }
      );

    this.apis.sendMessage(
      dataset.usr_fname,
      dataset.usr_lname,
      dataset.usr_tel
    ).subscribe(
      data => {
        if (data == 200) {
          console.log(data);
          this.toastr.success('User Created');
          this.router.navigate(['/Home']);
        } else {
          this.setError = data.message
        }
      },
      error => {
        //this.alert.error(error);
        console.log(error)
      }
    )
  }

  send() {

  }

  revert() {
    this.regForm.reset();
  }

}
