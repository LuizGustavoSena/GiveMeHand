import { filesToExportProps } from "./fs-model";

export type sendEmailProps = {
    to: string;
    subject: string;
    text: string;
    attachments: filesToExportProps[];
    cc: string[]
}