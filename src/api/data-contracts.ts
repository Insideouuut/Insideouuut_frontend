/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ClubRequestDto {
  category?: string;
  categoryDetail?: string;
  level?: string;
  hasMembershipFee?: boolean;
  /** @format int32 */
  membershipFeeAmount?: number;
  date?: string;
  /** @format int32 */
  participantLimit?: number;
  hasGenderRatio?: string;
  ratio?: string;
  ageRange?: number[];
  name?: string;
  introduction?: string;
  /** @uniqueItems true */
  rules?: string[];
  /** @uniqueItems true */
  joinQuestions?: string[];
  activityRegion?: string;
}

export interface ApiResponseClubResponseDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubResponseDto[];
}

export interface ClubResponseDto {
  /** @format int64 */
  clubId?: number;
  message?: string;
}

export interface Metadata {
  /** @format int32 */
  resultCount?: number;
  pageable?: PageableObject;
}

export interface PageableObject {
  /** @format int64 */
  offset?: number;
  sort?: SortObject;
  unpaged?: boolean;
  paged?: boolean;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
}

export interface SortObject {
  empty?: boolean;
  unsorted?: boolean;
  sorted?: boolean;
}

export interface Status {
  /** @format int32 */
  code?: number;
  message?: string;
}

export interface ClubPostRequestDto {
  postTitle?: string;
  category?: string;
  postContent?: string;
}

export interface ApiResponseClubPostResponseDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubPostResponseDto[];
}

export interface ClubPostResponseDto {
  message?: string;
  /** @format int64 */
  clubPostId?: number;
}

export interface ClubCommentRequestDto {
  content?: string;
}

export interface ApiResponseClubCommentResponseDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubCommentResponseDto[];
}

export interface ClubCommentResponseDto {
  /** @format int64 */
  clubCommentId?: number;
  message?: string;
}

export interface ReportRequest {
  reason: string;
}

export interface ApiResponse {
  status?: Status;
  metadata?: Metadata;
  results?: object[];
}

export interface LocationVerifiedRequest {
  locations?: string[];
  isVerified?: boolean;
}

export interface SocialJoinRequest {
  nickName?: string;
  phoneNumber?: string;
  gender?: string;
  category?: string[];
  /** @format date */
  birthDate?: string;
}

export interface MeetingCreateRequest {
  name?: string;
  introduction?: string;
  category?: string;
  categoryDetail?: string;
  meetingPlace?: MeetingPlaceRequest;
  /** @format int32 */
  participantLimit?: number;
  /** @uniqueItems true */
  rules?: string[];
  /** @uniqueItems true */
  joinQuestions?: string[];
  /** @format date-time */
  date?: string;
  level?: string;
  ageRange?: number[];
  hasGenderRatio?: string;
  ratio?: string;
  hasMembershipFee?: boolean;
  /** @format int32 */
  membershipFeeAmount?: number;
}

export interface MeetingPlaceRequest {
  name?: string;
  placeUrl?: string;
  kakaoMapId?: string;
  addressName?: string;
  roadAddressName?: string;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
}

export interface ApiResponseString {
  status?: Status;
  metadata?: Metadata;
  results?: string[];
}

export interface UserJoinRequestDTO {
  email: string;
  /** @pattern ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$ */
  password: string;
  name: string;
  nickName?: string;
  phoneNumber?: string;
  gender?: string;
  category?: string[];
  /** @format date */
  birthDate?: string;
}

export interface ClubApplyRequestDto {
  answer?: string;
}

export interface ProfileUpdateRequest {
  nickname?: string;
  password?: string;
}

export interface ApiResponseProfileResponse {
  status?: Status;
  metadata?: Metadata;
  results?: ProfileResponse[];
}

export interface ProfileMeetingResponse {
  category?: string;
  meetingName?: string;
  meetingImage?: string;
  meetingHostNickName?: string;
}

export interface ProfileResponse {
  /** @format int64 */
  userId?: number;
  profileImage?: string;
  nickname?: string;
  mannerRating?: number;
  pendingMeetings?: ProfileMeetingResponse[];
  attendedMeetings?: ProfileMeetingResponse[];
  closedMeetings?: ProfileMeetingResponse[];
}

export interface MeetingUpdateRequest {
  name?: string;
  introduction?: string;
  category?: string;
  categoryDetail?: string;
  meetingPlace?: MeetingPlaceRequest;
  /** @format int32 */
  participantLimit?: number;
  /** @uniqueItems true */
  rules?: string[];
  /** @uniqueItems true */
  joinQuestions?: string[];
  /** @format date-time */
  date?: string;
  level?: string;
  ageRange?: number[];
  hasGenderRatio?: string;
  ratio?: string;
  hasMembershipFee?: boolean;
  /** @format int32 */
  membershipFeeAmount?: number;
}

export interface ApiResponseMeetingResponse {
  status?: Status;
  metadata?: Metadata;
  results?: MeetingResponse[];
}

export interface HostResponse {
  /** @format int64 */
  id?: number;
  nickname?: string;
  profileImage?: ImageResponse;
}

export interface ImageResponse {
  name?: string;
  url?: string;
}

export interface MeetingPlaceResponse {
  name?: string;
  placeUrl?: string;
  kakaoMapId?: string;
  addressName?: string;
  roadAddressName?: string;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
}

export interface MeetingResponse {
  /** @format int64 */
  id?: number;
  name?: string;
  introduction?: string;
  type?: string;
  /** @format int32 */
  view?: number;
  /** @format int32 */
  like?: number;
  hasMembershipFee?: boolean;
  /** @format int32 */
  membershipFeeAmount?: number;
  progress?: string;
  level?: string;
  category?: string;
  categoryDetail?: string;
  /** @format date-time */
  date?: string;
  /** @format int32 */
  participantsNumber?: number;
  /** @format int32 */
  participantLimit?: number;
  ratio?: string;
  ageRange?: number[];
  rules?: string[];
  joinQuestions?: string[];
  host?: HostResponse;
  place?: MeetingPlaceResponse;
  images?: ImageResponse[];
}

export interface Pageable {
  /**
   * @format int32
   * @min 0
   */
  page?: number;
  /**
   * @format int32
   * @min 1
   */
  size?: number;
  sort?: string[];
}

export interface ApiResponseListClubListResponseDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubListResponseDto[][];
}

export interface ClubListResponseDto {
  /** @format int64 */
  clubId?: number;
  category?: string;
  /** @format int64 */
  ownerId?: number;
  clubName?: string;
  content?: string;
}

export interface ApiResponseClubBoardResponseDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubBoardResponseDto[];
}

export interface ClubBoardResponseDto {
  /** @format int64 */
  id?: number;
  name?: string;
  introduction?: string;
  type?: string;
  /** @format int64 */
  chatRoomId?: number;
  isHost?: boolean;
  activityRegion?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format int32 */
  view?: number;
  /** @format int32 */
  like?: number;
  hasMembershipFee?: boolean;
  /** @format int32 */
  membershipFeeAmount?: number;
  isRecruiting?: boolean;
  level?: string;
  category?: string;
  categoryDetail?: string;
  date?: string;
  /** @format int32 */
  participantNumber?: number;
  /** @format int32 */
  participantLimit?: number;
  ratio?: string;
  ageRange?: number[];
  rules?: string[];
  joinQuestions?: string[];
  host?: HostResponse;
  images?: ImageResponse[];
}

export interface ApiResponseListClubPostListResponseDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubPostListResponseDto[][];
}

export interface ClubPostListResponseDto {
  postTitle?: string;
  category?: string;
  writer?: string;
  content?: string;
}

export interface ApiResponseClubPostDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubPostDto[];
}

export interface ClubPostDto {
  title: string;
  category?: string;
  /** @format date-time */
  dateTime?: string;
  writer?: string;
  content: string;
}

export interface ApiResponseListClubCommentListResponseDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubCommentListResponseDto[][];
}

export interface ClubCommentListResponseDto {
  /** @format int64 */
  id?: number;
  writer?: string;
  comment?: string;
  /** @format date-time */
  dateTime?: string;
}

export interface ApiResponseListClubMembersResponseDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubMembersResponseDto[][];
}

export interface ClubMembersResponseDto {
  userName?: string;
  profileImgUrl?: string;
  mannerTemp?: number;
}

export interface ApiResponseListClubApplyResponseDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubApplyResponseDto[][];
}

export interface ClubApplyResponseDto {
  /** @format int64 */
  applyId?: number;
  userName?: string;
  profileImgUrl?: string;
  mannerTemp?: number;
  answer?: string;
}

export interface ApiResponseListChatRoomResponseDTO {
  status?: Status;
  metadata?: Metadata;
  results?: ChatRoomResponseDTO[][];
}

export interface ChatRoomResponseDTO {
  title?: string;
  type?: 'CLUB' | 'MEETING';
  lastMessageContent?: string;
  /** @format date-time */
  lastMessageTime?: string;
  /** @format int64 */
  userCount?: number;
  /** @format int64 */
  unreadMessageCnt?: number;
}

export interface ApiResponseListChatResponseDTO {
  status?: Status;
  metadata?: Metadata;
  results?: ChatResponseDTO[][];
}

export interface ChatResponseDTO {
  /** @format int64 */
  id?: number;
  content?: string;
  /** @format date-time */
  sendTime?: string;
  sender?: ChatUserResponse;
}

export interface ChatUserResponse {
  /** @format int64 */
  id?: number;
  nickname?: string;
  profileImage?: ImageResponse;
}

export interface ApiResponseInitialChatListResponseDTO {
  status?: Status;
  metadata?: Metadata;
  results?: InitialChatListResponseDTO[];
}

export interface InitialChatListResponseDTO {
  readMessages?: ChatResponseDTO[];
  unreadMessages?: ChatResponseDTO[];
}

export type FindClubBoardData = ApiResponseClubBoardResponseDto;

export interface UpdateClubPayload {
  clubRequestDto: ClubRequestDto;
  imageFiles: File[];
}

export type UpdateClubData = ApiResponseClubResponseDto;

export type ClubDeleteData = ApiResponse;

export type FindClubPostData = ApiResponseClubPostDto;

export type UpdateClubPostData = ApiResponseClubPostResponseDto;

export type DeleteClubPostData = ApiResponse;

export type UpdateClubCommentData = ApiResponseClubCommentResponseDto;

export type DeleteClubCommentData = ApiResponse;

export type ReportUserData = ApiResponse;

export type InsertUserLocationData = ApiResponse;

export type LikeUserData = ApiResponse;

export type ReissueData = ApiResponse;

export type CheckFirstLoginData = ApiResponse;

export type InsertUserInfoData = ApiResponse;

export type FindAll1Data = ApiResponseMeetingResponse;

export interface CreateMeetingPayload {
  request: MeetingCreateRequest;
  imageFiles: File[];
}

export type CreateMeetingData = ApiResponseString;

export type JoinData = ApiResponse;

export type FindByTypeData = ApiResponseListClubListResponseDto;

export interface SaveClubPayload {
  clubRequestDto: ClubRequestDto;
  imageFiles: File[];
}

export type SaveClubData = ApiResponseClubResponseDto;

export type FindByPostTypeData = ApiResponseListClubPostListResponseDto;

export type SaveClubPostData = ApiResponseClubPostResponseDto;

export type FindByClubPostIdData = ApiResponseListClubCommentListResponseDto;

export type SaveClubCommentData = ApiResponseClubCommentResponseDto;

export type FindApplyListData = ApiResponseListClubApplyResponseDto;

export type ApplyData = ApiResponse;

export type AcceptApplyData = ApiResponse;

export type ExitChatRoomData = ApiResponse;

export type EnterChatRoomData = ApiResponse;

export type GetMyProfileData = ApiResponseProfileResponse;

export type UpdateUserProfileData = ApiResponse;

export type GetUserProfileData = ApiResponseProfileResponse;

export interface UpdateUserProfileImagePayload {
  /** @format binary */
  image: File;
}

export type UpdateUserProfileImageData = ApiResponseString;

export type FindByIdData = ApiResponseMeetingResponse;

export type DeleteMeetingData = ApiResponse;

export interface UpdateMeetingPayload {
  request?: MeetingUpdateRequest;
  imageFiles?: File[];
}

export type UpdateMeetingData = ApiResponse;

export type EndMeetingData = ApiResponse;

export type FindAllData = ApiResponseMeetingResponse;

export type FindRunningMeetingsData = ApiResponseMeetingResponse;

export type FindPendingMeetingsData = ApiResponseMeetingResponse;

export type FindParticipatingMeetingsData = ApiResponseMeetingResponse;

export type FindClosedMeetingsData = ApiResponseMeetingResponse;

export type FindMemberListData = ApiResponseListClubMembersResponseDto;

export type ClubUserLeaveData = ApiResponse;

export type CheckNicknameData = ApiResponse;

export type CheckEmailData = ApiResponse;

export type GetChatRoomsByUserIdData = ApiResponseListChatRoomResponseDTO;

export type GetMeetingRoomsByUserIdData = ApiResponseListChatRoomResponseDTO;

export type GetClubRoomsByUserIdData = ApiResponseListChatRoomResponseDTO;

export type GetPreviousMessagesData = ApiResponseListChatResponseDTO;

export type GetNextMessagesData = ApiResponseListChatResponseDTO;

export type GetInitialMessagesData = ApiResponseInitialChatListResponseDTO;

export type MemberExpelData = ApiResponse;

export type RejectApplyData = ApiResponse;

export interface LoginCreatePayload {
  username?: string;
  password?: string;
}

export type LoginCreateData = any;
