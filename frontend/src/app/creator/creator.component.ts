import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
})
export class CreatorComponent implements OnInit {
  powerForm = this.fb.group({
    date: ['', Validators.required],
    kwh: ['', Validators.required],
  });
  waterForm = this.fb.group({
    date: ['', Validators.required],
    m3: ['', Validators.required],
  });
   oilForm = this.fb.group({
    date: ['', Validators.required],
    filled: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submitPower(): void {
    // send Power-Data to server
    console.log(this.powerForm.value);
  }

  submitWater(): void {
    // send Water to server
    console.log(this.waterForm.value);
  }

  submitOil(): void {
    // send Oil to Server
    console.log(this.oilForm.value);
  }

}
