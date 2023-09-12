import { injectable } from "inversify";
import https from 'https';

@injectable()
export class HttpRequester {
    public async httpsGetTextOf(url: string): Promise<string> {
        const charBuffer: string[] = [];
        await https.get(url, (response) => {
                response.on('data', (chunk) => {
                    charBuffer.push(chunk);
                });
                response.on('end', () => {
                    console.log('File downloaded and stored.');
                });
            }).on("error", (err) => { console.error(new Error(err.message)) });
        return charBuffer.join('');
    }
}
