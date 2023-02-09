export interface Zone { name: string; }

export interface Bed {
    id: string;
    bed_name: string;
    client_name: string;
    birthday: string;
    start_emergency: string;
    start_internment:string;
    service_number: string;
    plan_number: string;
    problems_list: string;
    conduct: string;
    check_list: string[];
    doctor: string;
    nurse: string;
    state: string;
}

export interface BottomSheetData {
    source: string;
    zone: string;
    bed: string;
  }