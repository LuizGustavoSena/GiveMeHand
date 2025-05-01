import { env } from "@src/lib/env";
import { InformationInfoContructor } from "./models/information-info-model";

export class InformationInfo {
    MAIL_HOST = env.MAIL_HOST;
    MAIL_PORT = env.MAIL_PORT;
    MAIL_USER = env.MAIL_USER;
    MAIL_FROM = env.MAIL_FROM;

    TYPE_EMAIL;
    MAILS_TO;
    MAIL_SUBJECT;
    MAIL_TEXT;

    constructor({ TYPE_EMAIL, MAILS_TO, MAIL_SUBJECT, MAIL_TEXT }: InformationInfoContructor) {
        this.TYPE_EMAIL = TYPE_EMAIL;
        this.MAILS_TO = MAILS_TO.join(', ');
        this.MAIL_SUBJECT = MAIL_SUBJECT;
        this.MAIL_TEXT = MAIL_TEXT;
    }
}