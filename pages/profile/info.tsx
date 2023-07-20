import JobRow from "@components/job/JobRow";
import Masthead from "@components/layout/masthead/Masthead";
import React, { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { useLoggedIn } from "src/hooks/useLoggedIn";
import { supabaseClient } from "src/utility";

const Info: React.FC = () => {
  const { user, profile, isLoading, isError } = useLoggedIn();
  const [jobs, setJobs] = useState([]);

    useEffect(() => {

        // Fetch all the bookmarks
        const getSavedJobs = async () => {
            try {
                const { data, error } = await supabaseClient.from('saved_jobs').select('id, job_id, profile_id, jobs (*)');
                setJobs(data);
            } catch(e) {
                toast("An error occured while fetching bookmarks");
            }
        }

        if (profile) {
            getSavedJobs();
        }

    }, [profile]);

  return (
    <>
        <Masthead title="Bookmarked Jobs" />

        <div className="container mx-auto">
            <div className="flex justify-center w-full">
                <div className="job-lists-wrapper max-w-4xl w-full">
                    {jobs && jobs.map(job => <JobRow job={job.jobs} />)}
                </div>
            </div>
        </div>
    </>
  );
};

export default Info;
