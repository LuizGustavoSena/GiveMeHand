import { FilenameEnum } from '@src/domain/enums/filename-enum';
import { readFileByPathName } from '@src/domain/models/fs-model';
import { readFile } from "fs";
import { z } from "zod";
import { formatDateNow } from './moment';

const readFileByPathName = async (pathName: FilenameEnum): Promise<readFileByPathName> => {
    const file = await new Promise<Buffer>((resolve) => {
        readFile(`./docs/${pathName}.json`, (err, data) => {
            if (err) {
                console.error(err);;
                return;
            }

            resolve(data);
        });
    });

    const fileSchema = z.object({
        MAIL_SUBJECT: z.string(),
        MAIL_TEXT: z.string(),
        MAILS_TO: z.array(z.string())
    });

    const fileProps = fileSchema.safeParse(JSON.parse(file.toString()));

    if (!fileProps.success)
        throw new Error(`File ${pathName} is not valid.`);

    const data = fileProps.data;
    const decrementMonth = pathName === FilenameEnum.M ? 0 : 1;

    if (data.MAIL_SUBJECT.includes('${Date}'))
        data.MAIL_SUBJECT = data.MAIL_SUBJECT.replace('${Date}', formatDateNow(decrementMonth));

    if (data.MAIL_TEXT.includes('${Date}'))
        data.MAIL_TEXT = data.MAIL_TEXT.replace('${Date}', formatDateNow(decrementMonth));

    return data;
};

export { readFileByPathName };

