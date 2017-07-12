import {Component, OnInit} from "@angular/core";
import {DoctorService} from "./doctor.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {SpecialityService} from "../speciality/speciality.service";
import {CPF_MASK} from "../shared/cpf/cpf.mask";
import {CPF_VALIDATOR} from "../shared/cpf/cpf.validator";
import {Doctor} from "./doctor";
import {Speciality} from "../speciality/speciality";

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

    doctors: any;
    specialities: Array<Speciality>;
    isLoading: boolean;
    cpf_mask: any;
    selected_doctor: Doctor;
    modal: NgbModalRef;
    search_filter: string;
    sort_name_status: string;
    sort_crm_status: string;
    is_cpf_valid: boolean = true;

    constructor(private modalService: NgbModal, private doctorService: DoctorService, private specialityService: SpecialityService) {
    }

    ngOnInit() {
        this.getAllDoctors();
        this.getAllSpecialities();
        this.cpf_mask = CPF_MASK;
    }

    getAllSpecialities() {
        this.specialityService.getAll()
            .subscribe((d: any) => {
                this.specialities = d as Array<Speciality>;
            });
    }

    toggleSortName() {
        this.sort_crm_status = null;
        if (this.sort_name_status == null || this.sort_name_status == 'desc') {
            this.sort_name_status = 'asc';
            this.getAllDoctors('name');
        } else {
            this.sort_name_status = 'desc';
            this.getAllDoctors('-name');
        }
    }

    toggleSortCRM() {
        this.sort_name_status = null;
        if (this.sort_crm_status == null || this.sort_crm_status == 'desc') {
            this.sort_crm_status = 'asc';
            this.getAllDoctors('crm');
        } else {
            this.sort_crm_status = 'desc';
            this.getAllDoctors('-crm');
        }
    }

    getAllDoctors(sort_path?: string) {
        this.isLoading = true;

        this.doctorService.getAll(this.search_filter, sort_path)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe((d: any) => {
                this.doctors = d;
            });
    }

    open(modal: any, doctor?: Doctor) {

        if (doctor)
            this.selected_doctor = JSON.parse(JSON.stringify(doctor)) as Doctor;
        else
            this.selected_doctor = new Doctor();

        this.modal = this.modalService.open(modal, {backdrop: "static", keyboard: false});
        this.modal.result.then((result) => {
            console.log(result);
        }, (reason) => {
            console.log(reason);
        });
    }

    checkCPF() {

        if (this.selected_doctor.cpf.trim().length > 0) {
            let rawcpf = this.selected_doctor.cpf.replace(/\./g, '').replace('-', '');
            this.is_cpf_valid = CPF_VALIDATOR(rawcpf);
        } else {
            this.is_cpf_valid = true;
        }

    }

    toggleSpeciality(speciality: Speciality) {

        let sps = this.selected_doctor.doctorSpecialities;

        if (!sps)
            sps = [];

        for (let x = 0; x < sps.length; x++) {
            let sp = sps[x];
            if (sp.id == speciality.id) {
                sps.splice(x, 1);
                this.selected_doctor.doctorSpecialities = sps;
                return;
            }
        }

        this.selected_doctor.doctorSpecialities = sps.concat(speciality);

    }

    saveDoctor(doctor: Doctor) {
        this.doctorService.save(doctor)
            .subscribe((d: any) => {
                this.modal.close();
                this.getAllDoctors();
            });
    }

    deleteDoctor(doctor: Doctor) {

        this.doctorService.delete(doctor)
            .subscribe((d: any) => {
                this.getAllDoctors();
            });
    }

}
