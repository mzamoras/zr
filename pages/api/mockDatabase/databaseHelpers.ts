import fs from 'fs';
import set from 'lodash/set';


export type User = {
    id: number;
    username: string;
    password?: string;
}

export type Customer = {
    id: number;
    data: any;
};

export type IconInfo = {
    icon: string;
    size: number;
    color: string;
    label: string;
    className?: string;
}

type customColoring = {
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
}
export type customColoringBar = {
    color?: "inherit" | "primary" | "secondary" | "default" | "transparent" | undefined;
}

export type ButtonInfo = {
    label: string;
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
    action: string;
    icon?: string;
    variant?: "contained" | "outlined" | "text" | undefined;
}

export type ControlOption = {
    label: string;
    value: string;
}

export type ControlValidation = {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
}

export type ControlInfo = {
    label: string;
    type: string;
    defaultValue: string;
    name: string;
    placeholder: string;
    options: ControlOption[];
    helperText?: string;
    validation?: ControlValidation;
}

export type ScreenButtons = {
    next: ButtonInfo;
    prev: ButtonInfo;
    custom: ButtonInfo;
}

export type OnboardingStep = {
    id: number;
    name: string;
    title: string;
    subtitle: string;
    icons?: IconInfo[];
    buttons?: ScreenButtons;
    controls?: ControlInfo[];
    slug: string;
}

export type ThemeSettings = {
    buttonStyle?: {
        [key: string]: string;
    };
    iconStyle?: {
        [key: string]: string;
    };
    titleStyle?: {
        [key: string]: string;
    };
    subTitleStyle?: {
        [key: string]: string;
    };
    stepperStyle?: {
        [key: string]: string;
    };
    stepperCounterStyle?: {
        [key: string]: string;
    };
    buttons?: {
        sx: { 
            [key:string]: string 
        };
        useIcons?: boolean;
    }
};

export type ClientThemeSettings = {
    buttons: IndividualSettings;
    title: IndividualSettings;
    subtitle: IndividualSettings;
    stepperText: IndividualSettings;
    stepperCounter: IndividualSettings;
    icons: IndividualSettings;
    card: IndividualSettings;
    bar: IndividualSettings;
    wrapper: IndividualSettings;
}

export type IndividualSettings = {
    sx: {
        [key:string]: string 
    } & customColoring,
    settings: {
        [key:string]: string 
    } & customColoring
}


export type Client = {
    id: number;
    name: string;
    steps: OnboardingStep[];
    theme?: {
        light?: string;
        main?: string;
        dark?: string;
        barColor?: string;
        borderRadius?: string | number;
    };
    themeSettings?: ThemeSettings;
    customerThemeSettings: ClientThemeSettings;
};

type Database = {
    users: User[];
    customers: Customer[];
    clients: Client[];
}

export enum tables {
    users = 'users',
    customers = 'customers',
    clients = 'clients',
}
import db from './database.json';
let database: Database = {... db} as any as Database;

export const create = (tableName:tables, object:any) => {
    const newRecord = { ...object, id: getNextId(tableName) };
    set(database, `${tableName}[${database[tableName].length}]`, newRecord);
    saveData();
    return newRecord;
}

export const update = (tableName:tables, id:number, object:any) => {
    const existingObject = getById(tableName, id);
    if (existingObject) {
        const updatedObject = { ...existingObject, ...object };
        set(database, `${tableName}[${id}]`, updatedObject);
        saveData();
        return updatedObject;
    }
    return null;
}

export const deleteById = (tableName:tables, id:number) => {
    database[tableName] = (database[tableName] as []).filter((item: User | Customer | Client) => item.id !== id);
}

export const getById = (tableName:tables, id:number) : User | Customer | Client | undefined => {
    return (database[tableName] as []).find((item: User | Customer | Client) => item.id === id);
}

export const getNextId = (tableName:tables) => {
    return (database[tableName] as []).length + 1;
}

export const getAll = (tableName:tables) : User[] | Client[] | Customer[] => {
    return database[tableName];
}

export const saveData = () => {
    const newDatabase = {...database};
    console.log('saving data', newDatabase);
    fs.writeFileSync('./pages/api/mockDatabase/database.json', JSON.stringify(newDatabase, null, 4), 'utf8');
}