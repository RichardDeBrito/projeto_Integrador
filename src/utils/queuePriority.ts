export type typePriority = 0 | 1 | 2 | 3

export class QueuePriority<T> {
    private nextItem: T | undefined = undefined; 
    private readonly orangeQueue: T[] = [];
    private readonly yellowQueue: T[] = [];
    private readonly greenQueue: T[] = [];
    private readonly blueQueue: T[] = [];
    private readonly geralQueue = [
        this.orangeQueue, 
        this.yellowQueue, 
        this.greenQueue, 
        this.blueQueue
    ];

    enqueue(item: T, priority: typePriority): void {
        this.geralQueue[priority].push(item);
    }

    dequeue() :void {
        for(const queue of this.geralQueue) {
            let breakCondition = false;
            for (const item of queue){
                if(item !== undefined){
                    this.nextItem = queue.shift();
                    breakCondition = true;
                    break;
                }
            }
            if (breakCondition){
                break;
            }
        }
    }

    showQueue() :void {
        console.log(this.geralQueue);
    }
}