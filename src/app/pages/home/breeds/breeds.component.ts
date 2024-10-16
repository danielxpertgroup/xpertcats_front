import { Component, inject } from '@angular/core';
import { BreedsService } from '../../../services/breeds.service';

@Component({
  selector: 'app-breeds',
  standalone: true,
  imports: [],
  templateUrl: './breeds.component.html',
  styleUrl: './breeds.component.css',
})
export default class BreedsComponent {
  public breedsService = inject(BreedsService);
}
