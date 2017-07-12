import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {Route} from "../core/route.service";
import {extract} from "../core/i18n.service";
import {DoctorComponent} from "./doctor.component";

const routes: Routes = Route.withShell([
    {path: 'doctors', component: DoctorComponent, data: {title: extract('Doctor')}}
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class DoctorRoutingModule {
}
