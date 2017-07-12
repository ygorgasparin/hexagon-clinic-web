import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../shared/shared.module";
import {DoctorRoutingModule} from "./doctor-routing.module";
import {DoctorComponent} from "./doctor.component";
import {DoctorService} from "./doctor.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SpecialityService} from "../speciality/speciality.service";
import {TextMaskModule} from "angular2-text-mask";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        DoctorRoutingModule,
        FormsModule,
        SharedModule,
        NgbModule.forRoot(),
        TextMaskModule
    ],
    declarations: [
        DoctorComponent
    ],
    providers: [
        DoctorService,
        SpecialityService
    ]
})
export class DoctorModule {
}
