import { RedisClientType } from "redis";
import { Observable } from "rxjs";
export declare class RedisService {
    private readonly redisClient;
    constructor(redisClient: RedisClientType);
    addFileToQueue(project: string, _id: string, key: string): Promise<number>;
    subscribe(): Observable<any>;
    processingFinished(project: string, _id: string): Promise<number>;
}
