export interface InspecDTO {
    id: number;
    type: string;
    certificationStatus: string;
    notes: string;
    frontDeskSignature: string;
    kitchenLog: string;
    staffList: boolean;
    dohInspection: boolean;
    halalMenu: boolean;
    haccpInspection: boolean;
    halalApproved: boolean;
    halalCertification: boolean;
    breakfastStart: string;
    breakfastEnd: string;
    lunchStart: string;
    lunchEnd: string;
    studentsBreakfast: number;
    studentsLunch: number;
    totalStudents: number;
    halalPercentage: number;
    incident: string;
    remedy: string;
    conclusion: string;
    additionalNotes: string;
    isArchived: boolean;

    // School Details
    schoolId: number;
    schoolName: string;
    address: string;
    contactNumber: string;
    assignDate: string;        // Consider using Date type
}
