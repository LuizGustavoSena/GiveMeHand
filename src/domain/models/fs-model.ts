export type readFileByPathName = {
    MAIL_SUBJECT: string;
    MAIL_TEXT: string;
    MAILS_TO: string[];
};

export type filesToExportProps = {
    filename: string;
    content: string;
    encoding: string;
}