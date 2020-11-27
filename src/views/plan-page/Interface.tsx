export enum PlanType {
    Monthly = "Monthly",
    Annual = "Yearly"
}

export interface IPlan {
    name: string
    paymentOptionsAndFee: Record<PlanType,number>
    defaultPlanType: PlanType
    featureList: Array<string>
    nextDueDate: Record<PlanType,Date>
};


