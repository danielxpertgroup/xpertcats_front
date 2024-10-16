import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { delay, map } from 'rxjs';

// Define interfaces para las respuestas del backend
interface Breed {
  id: string;
  name: string;
  description: string;
}

interface BreedResponse {
  data: Breed;
}

interface BreedsResponse {
  data: Breed[];
}

// Estado del servicio
interface State {
  breeds: Breed[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BreedsService {
  #state = signal<State>({
    loading: true,
    breeds: [],
  });

  public breeds = computed(() => this.#state().breeds);
  public loading = computed(() => this.#state().loading);

  constructor(private http: HttpClient) {
    this.http
      .get<BreedsResponse>('http://localhost:3000/api/v1/breeds/')
      .pipe(delay(1500))
      .subscribe({
        next: (res) => {
          this.#state.set({
            loading: false,
            breeds: res.data,
          });
        },
        error: () => {
          this.#state.set({ loading: false, breeds: [] });
          console.error('Error fetching breeds');
        },
      });
  }

  getBreedById(id: string) {
    return this.http
      .get<BreedResponse>(`http://localhost:3000/api/v1/breeds/search/${id}`)
      .pipe(
        delay(1500),
        map((resp) => resp.data)
      );
  }
}
