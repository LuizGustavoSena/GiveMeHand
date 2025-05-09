import { env } from "@src/lib/env";
import { InformationInfoContructor } from "./models/information-info-model";

export class InformationInfo {
    De = env.MAIL_FROM;

    Para;
    Titulo;
    Mensagem;
    Tipo;

    constructor({ TYPE_EMAIL, MAILS_TO, MAIL_SUBJECT, MAIL_TEXT }: InformationInfoContructor) {
        this.Tipo = TYPE_EMAIL;
        this.Para = MAILS_TO.join(', ');
        this.Titulo = MAIL_SUBJECT;
        this.Mensagem = MAIL_TEXT;
    }
}
