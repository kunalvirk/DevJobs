export interface IUser {
    avatar_url: string;
    companyname: string;
    country: string;
    created_at: string;
    full_name: string; 
    id: string;
    location: string;
    positionname: string;
    user_name: string;
    bio: string;
}

export interface IJobRow {
    id: string;
    applicationlink:  string;
    companycountry:  string;
    companylocation:  string;
    companyname:  string;
    experience:  string;
    isremote:  string;
    jobcategory:  string;
    jobdescription: string;
    joblocation: string;
    jobtype:  string;
    positionname:  string;
    salary:  string;
    tags: string;
    slug: string;
    postedby: string;
    created_at: string;
}

export interface IJob {
    job: IJobRow
}

export interface ISaveJob {
    job_id: string;
    profile_id: string;
}