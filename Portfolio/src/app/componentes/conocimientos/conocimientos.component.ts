import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: ['./conocimientos.component.css']
})
export class ConocimientosComponent implements OnInit {

  constructor(private datosportfolio: PortfolioService, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  isLogged() {
    return this.tokenService.isLogged();
  }
}
