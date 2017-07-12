import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    menuHidden = true;

    constructor(private router: Router,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
    }

    toggleMenu() {
        this.menuHidden = !this.menuHidden;
    }

    logout() {
        this.authenticationService.logout()
            .subscribe(() => this.router.navigate(['/login']));
    }

    get username(): string {
        const credentials = this.authenticationService.credentials;
        return credentials ? credentials.username : null;
    }

}
