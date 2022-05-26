import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private tokenService: TokenService, private toastr: ToastrService) {

    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {
    
  }

  get Password() {
    return this.form.get("password");
  }

  get Usuario() {
    return this.form.get("usuario");
  }

  get PasswordValid() {
    return this.Password?.touched && !this.Password?.valid;
  }

  Login(event: Event) {
    event.preventDefault;
    this.authService.login(this.form.value).subscribe({
      next: (data) => {
        this.tokenService.setToken(data.token);
        this.tokenService.setUserID(data.id);
        this.router.navigate(['/portfolio']);
      },
      error: (err) => {
        this.router.navigate(['/login']);
        this.toastr.error('Login invalido. Verificar usuario y contraseña','ERROR');
      }
    })
  }
}