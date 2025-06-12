import { Patient } from "./classes/patient";
import { Nurse } from "./classes/nurse";
import { Attendant } from "./classes/attendant";
import { Screening } from "./classes/screening";
import { QueuePriorityHospital } from "./classes/queuePriorityHospital";

const patient01 = new Patient('Richard', new Date(2004,10,3), '07464198301', 'M', '86999614414', '23834829');
const patient02 = new Patient('Rafael', new Date(2003,3,12), '07428567497', 'M', '86995511970', '55432343');
const patient03 = new Patient('Mauro', new Date(2002,12,23), '2342342123', 'M', '86993421234', '34254345');

const nurse01 = new Nurse('Paula', '1923945');
const attendant01 = new Attendant('Maria', '123919239');
const screening01 = new Screening(new Date(12, 6, 2024), 'Dor de cabeça', '12/8', 36, 128, patient01, nurse01, 0)

const queueHospital = new QueuePriorityHospital();
queueHospital.queueForTriage(screening01);
console.log(queueHospital.callNext());
console.log(queueHospital.callNext());
