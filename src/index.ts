import { InformationInfo } from "./domain/information-info";
import { filesToExport, readFileByPathName } from "./lib/fs";
import { confirmInfos, whatTypeOfEmail } from "./lib/inquirer";
import { sendEmail } from "./lib/nodemailer";

async function execute() {
  const typeEmail = await whatTypeOfEmail();

  const extraInfo = await readFileByPathName(typeEmail);

  const attachments = await filesToExport()

  const informations = new InformationInfo({
    TYPE_EMAIL: typeEmail,
    attachments: attachments.map(el => el.filename).join(', '),
    ...extraInfo
  });

  console.table(informations);

  const affirmative = await confirmInfos();

  if (!affirmative) {
    console.log('Please alter the information in env file and try again.');
    return;
  }

  sendEmail({
    to: extraInfo.MAILS_TO.join(', '),
    subject: extraInfo.MAIL_SUBJECT,
    text: extraInfo.MAIL_TEXT,
    attachments
  });
}

execute();