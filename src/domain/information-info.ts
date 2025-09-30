import { env } from "@src/lib/env";
import { InformationInfoContructor } from "./models/information-info-model";

export class InformationInfo {
    De = env.MAIL_FROM;

    Para;
    Copia;
    Titulo;
    Mensagem;
    Tipo;
    attachments;

    constructor({ TYPE_EMAIL, MAILS_TO, MAIL_SUBJECT, MAIL_TEXT, MAILS_CC, attachments }: InformationInfoContructor) {
        this.Tipo = TYPE_EMAIL;
        this.Para = MAILS_TO.join(', ');
        this.Copia = MAILS_CC.join(', ');
        this.Titulo = MAIL_SUBJECT;
        this.Mensagem = MAIL_TEXT;
        this.attachments = attachments;
    }
}
