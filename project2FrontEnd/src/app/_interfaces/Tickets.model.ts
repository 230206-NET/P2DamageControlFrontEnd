export interface Tickets{
    id: number;
    clientId: number;
    amount: number;
    employeeId: number;
    submissionDate: Date;
    damageDate: Date;
    description: string;
    damagerId: number;
    justification: number;
    ticketStatus: number;
}