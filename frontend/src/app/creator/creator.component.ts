import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiBackendService } from '../core/services/api-backend.service';
import { Oil } from '../core/services/classes/api-backend';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
})
export class CreatorComponent implements OnInit {
  public powerForm = this.fb.group({
    date: ['', Validators.required],
    kwh: ['', Validators.required],
  });
  public waterForm = this.fb.group({
    date: ['', Validators.required],
    m3: ['', Validators.required],
  });
   public oilForm = this.fb.group({
    date: ['', Validators.required],
    filled: ['', Validators.required],
  });
  private postedOil!: Oil;

  constructor(private readonly fb: FormBuilder, private readonly apiBackendService: ApiBackendService) { }

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
    this.apiBackendService.postOil({
      date: this.oilForm.value.date,
      filled: parseFloat(this.oilForm.value.filled)
    }).subscribe((res) => {
      // TODO: Fix
      this.postedOil = res;
      console.log(res);
    });
  }

}
