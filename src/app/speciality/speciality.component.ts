import {Component, OnInit} from "@angular/core";
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Speciality} from "./speciality";
import {SpecialityService} from "./speciality.service";

@Component({
    selector: 'app-speciality',
    templateUrl: './speciality.component.html',
    styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {

    specialities: any;
    isLoading: boolean;
    selected_speciality: Speciality;
    modal: NgbModalRef;
    search_filter: string;
    sort_name_status: string;

    constructor(private modalService: NgbModal, private  specialityService: SpecialityService) {
    }

    ngOnInit() {
        this.getAll();
    }

    toggleSortName() {
        if (this.sort_name_status == null || this.sort_name_status == 'desc') {
            this.sort_name_status = 'asc';
            this.getAll('name');
        } else {
            this.sort_name_status = 'desc';
            this.getAll('-name');
        }
    }

    open(modal: any, s?: Speciality) {

        if (s)
            this.selected_speciality = JSON.parse(JSON.stringify(s)) as Speciality;
        else
            this.selected_speciality = new Speciality();

        this.modal = this.modalService.open(modal, {backdrop: "static", keyboard: false});
        this.modal.result.then((result) => {
            console.log(result);
        }, (reason) => {
            console.log(reason);
        });
    }

    getAll(sort_path?: string) {
        this.isLoading = true;

        this.specialityService.getAll(this.search_filter, sort_path)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe((d: any) => {
                this.specialities = d;
            });
    }

    save(s: Speciality) {
        this.specialityService.save(s)
            .subscribe((d: any) => {
                this.modal.close();
                this.getAll();
            });
    }

    delete(p: Speciality) {
        this.specialityService.delete(p)
            .subscribe((d: any) => {
                this.getAll();
            });
    }

}
