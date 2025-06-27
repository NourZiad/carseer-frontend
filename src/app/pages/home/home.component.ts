import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';     
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {
  makes: any[] = [];
  vehicleTypes: any[] = [];
  models: any[] = [];

  selectedMakeId?: number;
  selectedYear?: number;

  constructor(private vs: VehicleService) {}

  ngOnInit(): void {
    this.vs.getMakes().subscribe(r => this.makes = r.results);
  }

  onMakeChange(): void {
    if (!this.selectedMakeId) return;
    this.vs.getVehicleTypes(this.selectedMakeId)
      .subscribe(r => this.vehicleTypes = r.results);
    this.loadModels();        // reload models if year already chosen
  }

  onYearChange(): void {
    this.loadModels();
  }

  private loadModels(): void {
    if (!this.selectedMakeId || !this.selectedYear) return;
    this.vs.getModels(this.selectedMakeId, this.selectedYear)
      .subscribe(r => this.models = r.results);
  }
}
