export interface SchoolDetailsDTO {
    schoolId: number;
    schoolName: string;
    assignDate: string; // or Date if you prefer
    inspectorName: string;
    address: string;  // New field
    contactNumber: string;  // New field
}
