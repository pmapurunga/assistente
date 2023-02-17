export interface Zone { name: string; }

export interface Bed {
    id: string;
    bed_name: string;
    client_name: string;
    birthday: Date;
    start_emergency: string;
    start_internment:string;
    service_number: string;
    plan_number: string;
    problems_list: string;
    conduct: string;
    check_list: { [key: string]: boolean };
    doctor: string;
    nurse: string;
    state: string;
    notes: string;
    goal: {[key: string]: boolean };
}


export interface BottomSheetData {
    source: string;
    zone: string;
    bed: string;
  }

  export interface User {
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
    type_class: string;
    number_class: string;
    state_class: string;
    hospital: string;
    phone: string;
    type_user: string
 }