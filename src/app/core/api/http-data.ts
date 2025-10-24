import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Levels, Puzzles} from "./api-data";

@Injectable({
  providedIn: 'root'
})
export class HttpData {
  private readonly http = inject(HttpClient);

  constructor() {
    // this.getLevels().subscribe(console.log);
    // this.getPuzzles(1).subscribe(console.log);
    // this.getPuzzle(1).subscribe(console.log);
    // this.getImage(1).subscribe(console.log);
    // this.getPhrases(1).subscribe(console.log);
    // this.getAudio(1).subscribe(console.log);
    this.getPuzzleProgress(2, 1).subscribe(console.log);
    // this.createUser("alex", "alex@example.com", "secret123").subscribe({
    //   next: response => console.log("User created:", response),
    //   error: error => console.error("Error creating user:", error)
    // })
  }

  public getLevels() {
    return this.http.get<Levels>('http://89.28.78.237:8000/levels/', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }


  public getPuzzles(level: number) {
    return this.http.get<Puzzles>(`http://89.28.78.237:8000/levels/${level}/puzzles`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  public getPuzzle(puzzleId: number) {
    return this.http.get<Puzzles>(`http://89.28.78.237:8000/puzzles/${puzzleId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  public getImage(puzzleId: number) {
    return this.http.get<Puzzles>(`http://89.28.78.237:8000/puzzles/${puzzleId}/images`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }


  public getPhrases(puzzleId: number) {
    return this.http.get<Puzzles>(`http://89.28.78.237:8000/puzzles/${puzzleId}/phrases`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  public getAudio(phraseId: number) {
    return this.http.get<Puzzles>(`http://89.28.78.237:8000/phrases/${phraseId}/audio`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  public getPuzzleProgress(userId: number, puzzleId: number) {
    return this.http.get<any>('http://89.28.78.237:8000/progress/puzzle', {
      params: {
        user_id: userId,
        puzzle_id: puzzleId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public createUser(username: string, email: string, password: string) {
    return this.http.post<any>('http://89.28.78.237:8000/users', {
      username: username,
      email: email,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
