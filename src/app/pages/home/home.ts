import { Component, signal } from '@angular/core';
import { Duck } from "../../components/duck/duck";

@Component({
  selector: 'app-home',
  imports: [Duck],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
}
