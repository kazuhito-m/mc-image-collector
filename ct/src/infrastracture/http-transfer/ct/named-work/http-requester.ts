import { injectable } from "inversify";
import https from 'https';

@injectable()
export class HttpRequester {
    public async httpsGetTextOf(url: string): Promise<string> {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.text();
        return data;
    }
}
