'use client'
import CourseCard from './CourseCard';
import { RouteEnum } from '@src/constants/route.enum';
import { en } from '@src/constants/lang/en';
import { getCommunityCourses } from '@src/apiServices/contentRepositoryService';
import { useEffect, useState } from 'react';
import { TCourse } from '@src/shared/types/contentRepository';
import { FullPageLoader } from '@src/shared/components/UIElements';

const CoummintyCourseRepository = () => {

  const [allCourses,setAllCourses]=useState<TCourse[]>([])
  const [isLoading,setIsLoading]=useState(true)

  //check if data is fetched
  const getData=async()=>{
    const response= await getCommunityCourses();
    if (Array.isArray(response.data)) {
      setAllCourses(response.data); 
      console.log(response.data);
      setIsLoading(false)
    } else {
      console.error('Response data is not an array');
    }
  }

  useEffect(()=>{
    getData();
  },[])
  return (
  <>
    {isLoading && <FullPageLoader/>}
    <div>
      {/* Heading */}
      <div className="flex flex-col gap-4 text-center">
        <div className="text-5xl font-bold">{en.CommunityCouse.heading}</div>
        <div className="text-sm text-gray-500">
          {en.CommunityCouse.description}
        </div>
        <div className="text-sm  text-gray-500">
          ({allCourses && allCourses.length} {en.CommunityCouse.course} )
        </div>
      </div>
      {/* display all courses */}
      <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4 2xl:grid-cols-5">
        {allCourses && allCourses.length>0 && allCourses.map((course) => {
          return (
            <li
              key={course.id}
              className="col-span-1 hover:shadow-lg shadow-sm cursor-pointer rounded-lg"
              >
              <a href={`${RouteEnum.COMMUNITY}/${course.id}`}>
                <CourseCard
                  name={course.name}
                  title={course.description}
                  publisher={course.created_by?.first_name}
                  lesson={course?.lessons_count}
                  />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  </>
  );
};

export default CoummintyCourseRepository;
