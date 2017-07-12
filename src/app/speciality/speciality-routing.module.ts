import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {Route} from "../core/route.service";
import {extract} from "../core/i18n.service";
import {SpecialityComponent} from "./speciality.component";

const routes: Routes = Route.withShell([
    {path: 'specialities', component: SpecialityComponent, data: {title: extract('Speciality')}}
]);

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class SpecialityRoutingModule {
}
