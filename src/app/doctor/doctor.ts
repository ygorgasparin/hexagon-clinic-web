import {Speciality} from "../speciality/speciality";
export class Doctor {

    constructor(public id?: number,
                public name?: string,
                public phone?: string,
                public cpf?: string,
                public crm?: string,
                public doctorSpecialities?: Array<Speciality>) {
    }

}