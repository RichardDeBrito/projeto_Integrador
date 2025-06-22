import { QueuePriority } from "./queuePriority.js";
import { Patient } from "./patient.js";
import { Screening } from "./screening.js";

export class QueuePriorityHospital extends QueuePriority<Screening> {
    public callNext(): Patient | string {
        this.dequeue();
        if(this.nextItem === undefined) {
            return "There are no patients in the queue.";
        }
        return this.nextItem.patient;
    }

    public queueForTriage(screening: Screening){
        this.enqueue(screening, screening.classification);
    }
}