import JobInfo from "@components/jobinfo/JobInfo";
import Masthead from "@components/layout/masthead/Masthead";
import {
  GetListResponse,
  IResourceComponentsProps
} from "@refinedev/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiBookmark, FiBriefcase, FiClock, FiDollarSign, FiHeart, FiMapPin } from "react-icons/fi";
import { IJobRow, ISaveJob, IUser } from "src/interfaces/interface";

import avatar from "@public/images/avatar.jpg";
import Link from "next/link";
import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "src/utility";
import { GetServerSideProps } from "next";
import { SEO } from "@components/seo/SEO";
import { useLoggedIn } from "src/hooks/useLoggedIn";
import toast from "react-simple-toasts";

const JobShow: React.FC<
  IResourceComponentsProps<GetListResponse> & {
    job: IJobRow;
  }
> = ({ job }) => {
  
  console.log("job", job);

  const [postedBy, setPostedBy] = useState<IUser>();
  const [liked, setLiked] = useState<ISaveJob | boolean>(false);
  const { user, profile, isLoading, isError } = useLoggedIn();

  useEffect(() => {
    
    const getJobPoster = async () => {
      try {
        const { data, error } = await supabaseClient
        .from("profiles")
        .select()
        .eq("id", job.postedby);

        if (!error && data.length > 0) {
            data && setPostedBy(data[0]);
        }

      } catch (e) {
        console.log("Error occured",e);
      }
      
    };

    const getJobLikes = async () => {
      try {
        const { data, error } = await supabaseClient
        .from("saved_jobs")
        .select()
        .match({
          profile_id: profile?.id,
          job_id: job.id
        })

        if (!error && data.length > 0) {
            console.log("[likes]", data);
            data && setLiked(data[0]);
        }

      } catch (e) {
        console.log("Error occured",e);
        setLiked(false);
      }
    }
    
    if (job && job.postedby) {
      console.log("jobddd");
        getJobPoster();
    }

    if (profile) {
      console.log("fetching likes...");
      getJobLikes();
    }

  }, [job, profile]);


  const saveThisJob = async () => {
      if (profile && !liked) {
        try {
          const { data, error } = await supabaseClient
          .from("saved_jobs")
          .insert({
            job_id: job.id,
            profile_id: profile?.id
          });
          setLiked(true);
          toast("Job added to your bookmarks");
        } catch(e) {
          toast("Error while bookmarking the job");
        }
      } else {
        try {
          const { error } = await supabaseClient
          .from("saved_jobs")
          .delete()
          .match({
            job_id: job.id,
            profile_id: profile?.id
          })

          toast("Job removed from your bookmarks");
          setLiked(false);

        } catch(e) {
          toast("An error occurred. Please try again");
        }
      }
  }

  return (
    <>
      <Masthead title={job.positionname} />

      <div className="container mx-auto">
        <div className="job-brief-info flex gap-3 mt-3 mb-10 justify-center">
          {/* {job.salary && <div className="flex items-center job-info-pill text-sm rounded-sm px-4 py-1 text-gray-700"> <FiDollarSign /> <span>{job.salary}</span></div>} */}
          {job.experience && (
            <div className="flex items-center job-info-pill text-sm rounded-sm px-4 py-1 text-gray-700">
              {" "}
              <FiBriefcase className="mr-2" /> <span>{job.experience}</span>
            </div>
          )}
          {job.jobtype && (
            <div className="flex items-center job-info-pill text-sm rounded-sm px-4 py-1 text-gray-700">
              {" "}
              <FiClock className="mr-2" /> <span>{job.jobtype}</span>
            </div>
          )}
          {job.joblocation && (
            <div className="flex items-center job-info-pill text-sm rounded-sm px-4 py-1 text-gray-700">
              {" "}
              <FiMapPin className="mr-2" /> <span>{job.joblocation}</span>
            </div>
          )}
        </div>

        <hr />

        <div className="job-details mt-10">
          <div className="flex gap-10">
            <div className="job-info-wrapper">
              <JobInfo title="Description" content={job.jobdescription} />
            </div>

            {postedBy && (
                <div className="job-posted-by w-full max-w-xs sticky top-4 h-full">
                <div className="flex bg-gray-50 p-5 rounded-sm border flex-col text-center">
                    <p className="text-sm">Posted by</p>
                    
                    <div className="user-avatar mt-4 p-2">
                    <div className="overflow-hidden rounded-full inline-flex">
                        <Image
                        src={postedBy ? postedBy.avatar_url : avatar.src}
                        alt={postedBy ? postedBy.full_name : ""}
                        width={100}
                        height={100}
                        />
                    </div>
                    <div className="user-name pb-3">
                        <h5 className="text-2xl font-bold">Kunal Virk</h5>
                        <div className="user-info">
                        <p className="user-position">Senior Developer</p>
                        <div className="flex justify-center gap-1">
                            <p className="user-org">EKCS,</p>
                            <p className="user-location">UK</p>
                        </div>
                        </div>
                    </div>
                    <hr />
                    <div className="user-bio pt-3">
                        <p>
                        Full-stack dev and love to contribute to open source
                        projects
                        </p>
                    </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="job-actions">
                    <Link
                    href={job ? job.applicationlink : ""}
                    target="_blank"
                    className="w-full flex justify-center mt-4 bg-primary-500 text-white px-6 py-3 rounded-lg"
                    >
                    Apply Now
                    </Link>
                    {user && (<button onClick={saveThisJob} className="w-full flex justify-center items-center mt-4 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg">
                      <FiBookmark className={`mr-2 ${liked && 'fill-red-600 stroke-red-600'}`} />
                      {liked ? 'Unsave Now' : 'Save it'}
                    </button>)}
                    
                </div>
                </div>

            )}
            
          </div>
        </div>
      </div>
      <SEO  title={job.positionname} />
    </>
  );
};

export default JobShow;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const { query } = context;
  const id = query?.["id"] as string;

  const {data} = await dataProvider(supabaseClient).getOne({
    resource: "jobs",
    id,
  });

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      job: data
    },
  };
};
