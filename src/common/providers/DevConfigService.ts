import { Injectable } from "@nestjs/common";

@Injectable()
export class DevConfigService {
    DBHOST = "locahost"
    getDBHOST() {
        return this.DBHOST;
    }
}