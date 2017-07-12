import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {Route} from "../core/route.service";
import {extract} from "../core/i18n.service";
import {PatientComponent} from "./patient.component";

const routes: Routes = Route.withShell([
    {path: '', redirectTo: '/patients', pathMatch: 'full'},
    {path: 'patients', component: PatientComponent, data: {title: extract('Patient')}},
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class PatientRoutingModule {
}
