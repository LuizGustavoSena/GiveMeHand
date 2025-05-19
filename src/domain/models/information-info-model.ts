import { readFileByPathName } from "@src/lib/fs";

export type InformationInfoContructor = {
    TYPE_EMAIL: string;
    attachments: string;
} & readFileByPathName;