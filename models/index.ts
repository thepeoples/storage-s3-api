const DEFAULT_STATUS = "OK";
const SERVICE_NAME = "storage-s3-api";
const VERSION = "v0.0.1";

// Response object for `GET /`
export class GetIndexResponse {
    // Message to return
    msg: string;

    // Status string to return, defaults to `OK`
    status: string;

    // Version of this service
    version: string;

    constructor() {
        this.msg = SERVICE_NAME;
        this.status = DEFAULT_STATUS;
        this.version = VERSION;
    }
}
