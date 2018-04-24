import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from '../shared/services/authentication.service';
 

@Component({
    //moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    localStorage.setItem('isLoggedin', 'true');
                    this.router.navigate(['/dashboard']);
                    console.log("true");
                } else {
                    this.loading = false;
                    this.error = 'Cuenta Suspendida, Consulta al Administrador para que la active';

                }
            },err => {// login failed
                this.error = 'Usuario o Contraseña Incorrectos';
                this.loading = false;
                console.log("false");
            });
    }
}