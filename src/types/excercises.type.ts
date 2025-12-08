export interface Exercise {
    createdAt: string;
    description: string;
    equipment: string;
    id: string;
    name: string;
    primaryMuscle: string;
    secondaryMuscle: string[];
    stabilizers: string[];
    type: string;
    updatedAt: string;
    videoUrl: string;
}