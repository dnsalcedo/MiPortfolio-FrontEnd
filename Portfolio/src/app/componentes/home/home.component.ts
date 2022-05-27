import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.authService.chequearLogin().subscribe({
      next: () => {
      },
      error: (err) => {
        this.toastr.error('Sesión expirada. Solo consulta.', '', { progressBar: false });
        this.tokenService.logOut();
      }
    })
  }

}
