export class Job {
    // tslint:disable-next-line:variable-name
    _id?: string;
    title: string;
    employmentType: JobType;
    company: string;
    location: {
        country: string;
        state: string;
        city: string;
    };
    startDate: Date;
    endDate: Date;
    description: string;
}

enum JobType {
    FullTime,
    PartTime,
    SelfEmployed,
    Freelance,
    Contract,
    Internship,
    Apprenticeship,
    Volunteer
}


