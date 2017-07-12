import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {SpecialityRoutingModule} from "./speciality-routing.module";
import {SpecialityComponent} from "./speciality.component";
import {SpecialityService} from "./speciality.service";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TextMaskModule} from "angular2-text-mask";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        SpecialityRoutingModule,
        FormsModule,
        SharedModule,
        NgbModule.forRoot(),
        TextMaskModule
    ],
    declarations: [
        SpecialityComponent
    ],
    providers: [
        SpecialityService
    ]
})
export class SpecialityModule {
}
