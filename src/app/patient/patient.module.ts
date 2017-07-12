import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {PatientRoutingModule} from "./patient-routing.module";
import {PatientComponent} from "./patient.component";
import {PatientService} from "./patient.service";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TextMaskModule} from "angular2-text-mask";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PatientRoutingModule,
        FormsModule,
        SharedModule,
        NgbModule.forRoot(),
        TextMaskModule
    ],
    declarations: [
        PatientComponent
    ],
    providers: [
        PatientService
    ]
})
export class PatientModule {
}
