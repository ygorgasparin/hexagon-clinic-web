import {Component, OnInit} from "@angular/core";
import {PatientService} from "./patient.service";
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Patient} from "./patient";
import {CPF_MASK} from "../shared/cpf/cpf.mask";
import {CPF_VALIDATOR} from "../shared/cpf/cpf.validator";

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

    patients: any;
    isLoading: boolean;
    cpf_mask: any;
    selected_patient: Patient;
    modal: NgbModalRef;
    search_filter: string;
    sort_name_status: string;
    is_cpf_valid: boolean = true;


    constructor(private modalService: NgbModal, private  patientService: PatientService) {
    }

    ngOnInit() {
        this.cpf_mask = CPF_MASK;
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

    open(modal: any, p?: Patient) {

        if (p)
            this.selected_patient = JSON.parse(JSON.stringify(p)) as Patient;
        else
            this.selected_patient = new Patient();

        this.modal = this.modalService.open(modal, {backdrop: "static", keyboard: false});
        this.modal.result.then((result) => {
            console.log(result);
        }, (reason) => {
            console.log(reason);
        });
    }


    checkCPF() {

        if (this.selected_patient.cpf.trim().length > 0) {
            let rawcpf = this.selected_patient.cpf.replace(/\./g, '').replace('-', '');
            this.is_cpf_valid = CPF_VALIDATOR(rawcpf);
        } else {
            this.is_cpf_valid = true;
        }

    }

    getAll(sort_path?: string) {
        this.isLoading = true;

        this.patientService.getAll(this.search_filter, sort_path)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe((d: any) => {
                this.patients = d;
            });
    }

    save(p: Patient) {
        this.patientService.save(p)
            .subscribe((d: any) => {
                this.modal.close();
                this.getAll();
            });
    }

    delete(p: Patient) {

        this.patientService.delete(p)
            .subscribe((d: any) => {
                this.getAll();
            });
    }

}
