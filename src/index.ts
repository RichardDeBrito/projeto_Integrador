import { QueuePriority } from "./classes/queuePriority";

const Patient1 = {
    nome: 'Fulano',
    idade: 18,
    telefone: '4567334'
}

const Patient2 = {
    nome: 'Sicrano',
    idade: 12,
    telefone: '2353452'
}

const Patient3 = {
    nome: 'Beltrano',
    idade: 21,
    telefone: '524656346'
}

const Patient4 = {
    nome: 'João',
    idade: 34,
    telefone: '324851243'
}

const queuePriority = new QueuePriority();
queuePriority.enqueue(Patient1, 0);
queuePriority.enqueue(Patient2, 0);
queuePriority.enqueue(Patient3, 1);
queuePriority.enqueue(Patient4, 2);
queuePriority.showQueue();
console.log('------------');
queuePriority.dequeue();
queuePriority.showQueue();