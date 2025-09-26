/// <reference types="node" />
import { FruitEnum } from "../enum/FruitEnum";
export declare class Post {
    id: number;
    int: number;
    tinyint: number;
    smallint: number;
    mediumint: number;
    bigint: string;
    float: number;
    double: number;
    decimal: string;
    char: string;
    varchar: string;
    text: string;
    tinytext: string;
    mediumtext: string;
    longtext: string;
    binary: Buffer;
    varbinary: Buffer;
    blob: Buffer;
    tinyblob: Buffer;
    mediumblob: Buffer;
    longblob: Buffer;
    date: string;
    datetime: Date;
    timestamp: Date;
    time: string;
    year: number;
    geometry: string;
    point: string;
    linestring: string;
    polygon: string;
    multipoint: string;
    multilinestring: string;
    multipolygon: string;
    geometrycollection: string;
    enum: string;
    classEnum1: FruitEnum;
    json: Object;
    simpleArray: string[];
    simpleJson: {
        param: string;
    };
}
