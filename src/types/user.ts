export interface IUser {
    id: string;
    type: string;
    avatar: string;
    cellphone: string;
    document: string;
    email: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    localManager: ILocation;
    professional: IProfessional;
}

export interface ILocation {
    id: string;
    name: string;
    description: string;
    images: Array<string>;
    address: IAddress;
    professionals: Array<IProfessional>;
    type: string;
    createdAt: string;
    upadatedAt: string;
    manager: IUser;
}

export interface IProfessional {
    id: string;
    type: string;
    specialties: Array<string>;
    agreements: Array<string>;
    name: string;
    cost: number;
    description: string;
    bio: string;
    avatar: string;
    cellphone: string;
    document: string;
    address: IAddress;
    openingHours: Array<IOpeningHours>;
    user: IUser;
    locations: Array<ILocation> 
}

export interface IAddress {
    id: string;
    name: string;
    uf: string;
    city: string;
    route: string;
    district: string;
    number: number;
    zipcode: string;
}

export interface IOpeningHours {
    id: string;
    day: string;
    start: string;
    end: string;
    specificDate: string;
    professional: IProfessional;
    location: ILocation;
}