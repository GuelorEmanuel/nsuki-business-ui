export interface IAppointment {
    clientName: string
    appointmentType: string
    dateTime: Date
    imageLink: string
};

export interface ITodo {
    title: string
    description: string
};

export interface IPeriodRevenue {
    month: string
    amount: string
};