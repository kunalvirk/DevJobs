import Job from '@components/job/Job';
import Masthead from '@components/layout/masthead/Masthead';
import { SEO } from '@components/seo/SEO';
import { useList } from '@refinedev/core'
import { dataProvider } from '@refinedev/supabase';
import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react'
import { IJobRow } from 'src/interfaces/interface';
import { supabaseClient } from 'src/utility';

const JobList: React.FC = () => {
  
  return (
    <>
      <Masthead title="Browse jobs" />

      <div className="container mx-auto">

        <div className="intro-text">
          <p className="text-center">
            Find jobs posted by developers around the world.
          </p>
        </div>

        <div className="mt-10">
          <Job />
        </div>

      </div>

      <SEO title="Browse Jobs" />
    </>
  )
}

export default JobList