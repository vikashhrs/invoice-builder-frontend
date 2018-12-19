export class Invoice {
    _id: string;
    item: string;
    qty: string;
    date: Date;
    due: Date;
    tax: number;
}

export class InvoicePaginationResponse{
    docs: Invoice[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}
