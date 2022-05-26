import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  Logged: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
