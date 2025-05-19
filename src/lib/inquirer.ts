import inquirer from 'inquirer';
import { filesByPath } from './fs';

export async function whatTypeOfEmail() {
    const files = await filesByPath('./docs/type-emails');

    return await new Promise<string>(resolve => {
        inquirer.prompt([
            {
                name: 'list',
                message: 'What type of email?',
                type: 'list',
                choices: files.map(el => ({ value: el.split('.')[0] }))
            }
        ]).then((answers) => {
            resolve(answers.list);
        });
    });
}

export const confirmInfos = (): Promise<string> => {
    return new Promise((resolve) => {
        inquirer.prompt([
            {
                name: 'list',
                message: 'Proceed with this informations?',
                type: 'confirm'
            }
        ]).then((answers) => {
            resolve(answers.list);
        });
    });
};
