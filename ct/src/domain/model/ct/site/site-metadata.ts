import { NamedWork } from "../named-work/named-work";

export interface SiteMetadata {
    namedWorks: { [index: string]: NamedWork };
}