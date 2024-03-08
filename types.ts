import { Service } from "@prisma/client";

export interface MyState{
    dialog: any;

    service: Service | null;
    open: boolean;
    edit:boolean;
    add:boolean;

}