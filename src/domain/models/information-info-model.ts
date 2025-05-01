import { readFileByPathName } from "@src/lib/fs";
import { FilenameEnum } from "../enums/filename-enum";

export type InformationInfoContructor = {
    TYPE_EMAIL: FilenameEnum;
} & readFileByPathName;