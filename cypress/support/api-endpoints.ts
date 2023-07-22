import { WaitMethods } from "./CoreConstants";

export class ApiEndpoint{
    constructor(
        public method: WaitMethods, 
        public serviceUrl: string, 
        public alias: string,
        public tabName:string,
        public className?: string
    ) {}
}