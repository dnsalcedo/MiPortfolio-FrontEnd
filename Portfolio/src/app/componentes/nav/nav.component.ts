import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {

  }

  isLogged() {
    return this.tokenService.isLogged();
  }

  logOut() {
    this.tokenService.logOut();
    this.isLogged();
  }

  userName(): String {
    return this.tokenService.getUserName();
  }

}
