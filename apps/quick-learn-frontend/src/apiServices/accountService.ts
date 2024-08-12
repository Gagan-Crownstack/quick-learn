import { accountApiEnum } from '@src/constants/api.enum';
import axiosInstance from './axios';
import { AxiosSuccessResponse } from './axios';
import {
  TSkill,
  TRoadmapCategories,
  TCourseCategories,
} from '@src/shared/types/accountTypes';

// export const getUserProfile = async (): Promise<
//   AxiosSuccessResponse<TUserProfileType>
// > => {
//   const response = await axiosInstance.get<
//     AxiosSuccessResponse<TUserProfileType>
//   >(userApiEnum.GET_USER_PROFILE);
//   return response.data;
// };

export const addSkill = async (
  data: TSkill,
): Promise<AxiosSuccessResponse<{}>> => {
  const response = await axiosInstance.post<AxiosSuccessResponse<{}>>(
    accountApiEnum.SKILLS,
    data,
  );
  return response.data;
};
