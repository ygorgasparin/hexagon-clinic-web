import "rxjs/add/operator/finally";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Logger} from "../core/logger.service";
import {AuthenticationService} from "../core/authentication/authentication.service";

const log = new Logger('Login');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    error: string = null;
    isLoading = false;
    loginForm: FormGroup;

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private authenticationService: AuthenticationService) {
        this.createForm();
    }

    ngOnInit() {
    }

    login() {
        this.isLoading = true;
        this.authenticationService.login(this.loginForm.value)
            .finally(() => {
                this.isLoading = false;
                this.loginForm.markAsPristine();
            })
            .subscribe(credentials => {
                log.debug(`${credentials.username} successfully logged in`);
                this.router.navigate(['/']);
            }, error => {
                log.debug(`Login error: ${error}`);
                this.error = error;
            });
    }

    private createForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            remember: true
        });
    }

}
