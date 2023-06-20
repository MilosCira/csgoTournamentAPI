export interface IPlayer {
    pl_id: number;
    pl_firstName: string;
    pl_lastName: string;
    pl_email: string;
    pl_password: string;
    pl_role: playerRole;
    pl_image: string;
}

export enum playerRole {
    ENTRY = "entry",
    SUPPORT = "support",
    INGAMELEADER = "in-Game Leader",
    LURK = "lurk",
    AWPER = "awper",
    SECONDARYROLES = "secondary role"
}