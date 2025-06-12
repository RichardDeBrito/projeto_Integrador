import { Patient } from "./patient";
import { Nurse } from "./nurse";
import { typePriority } from "./queuePriority";

export class Screening {
    constructor(
        readonly screeningDate: Date,
        readonly symptoms: string,
        readonly bloodPresure: string,
        readonly temperature: number,
        readonly heartRate: number,
        public readonly patient: Patient,
        readonly nurse: Nurse,
        readonly classification: typePriority
    ){}
}   