import { NamedWork } from "./named-work";

export interface NamedWorkRepository {
    allOf(): { [index: string]: NamedWork };
}