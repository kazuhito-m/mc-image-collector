import { NamedWork } from "./named-work";

export interface NamedWorkRepository {
    allOf(): Promise<{ [index: string]: NamedWork }>;
}