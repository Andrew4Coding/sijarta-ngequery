export type Session = {
    name: string;
    price: number;
};

export type SubcategoryInfo = {
    description: string;
    sessions: Session[];
};

export type Worker = {
    name: string;
    rating: number;
    completedOrders: number;
    phone: string;
    birthDate: string;
    address: string;
    image: string;
};

export type Testimonial = {
    workerName: string;
    rating: number;
    customerName: string;
    review: string;
    date: string;
};