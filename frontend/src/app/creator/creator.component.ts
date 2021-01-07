import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiBackendService } from '../core/services/api-backend.service';
import { Oil, Power, Water } from '../core/services/classes/api-backend';

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
  private postedWater!: Water;
  private postedPower!: Power;

  constructor(private readonly fb: FormBuilder, private readonly apiBackendService: ApiBackendService) { }

  ngOnInit(): void {
  }

  submitPower(): void {
    this.apiBackendService.postPower({
      date: this.powerForm.value.date,
      kwh: parseFloat(this.powerForm.value.kwh),
    }).subscribe((res) => this.postedPower = res);
  }

  submitWater(): void {
    this.apiBackendService.postWater({
      date: this.waterForm.value.date,
      cubicmeter: parseFloat(this.waterForm.value.m3),
    }).subscribe((res) => this.postedWater = res);
  }

  submitOil(): void {
    this.apiBackendService.postOil({
      date: this.oilForm.value.date,
      filled: parseFloat(this.oilForm.value.filled)
    }).subscribe((res) => {
      this.postedOil = res;
    });
  }

}
