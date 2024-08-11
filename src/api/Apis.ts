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

import axiosInstance from './axiosConfig';
export interface ChatRoom {
  /** @format int64 */
  id?: number;
  title?: string;
  type?: ChatRoomTypeEnum;
  /** @format int64 */
  associatedId?: number;
  lastMessageContent?: string;
  /** @format date-time */
  lastMessageTime?: string;
  club?: Club;
}

export interface Club {
  clubName?: string;
  category?: ClubCategoryEnum;
  categoryDetail?: string;
  level?: ClubLevelEnum;
  /** @format date-time */
  createdAt?: string;
  content?: string;
  date?: string;
  region?: string;
  joinQuestions?: string[];
  /** @format int32 */
  memberLimit?: number;
  /** @format int32 */
  memberCount?: number;
  hasMembershipFee?: boolean;
  /** @format int32 */
  price?: number;
  genderRatio?: ClubGenderRatioEnum;
  /** @format int32 */
  minAge?: number;
  /** @format int32 */
  maxAge?: number;
  /** @uniqueItems true */
  rules?: string[];
  owner?: User;
  members?: ClubUser[];
  images?: ClubImage[];
  likes?: ClubLike[];
  chatRoom?: ChatRoom;
  meetings?: Meeting[];
  /** @format int64 */
  chat_room_id?: number;
}

export interface ClubImage {
  /** @format int64 */
  id?: number;
  image?: Image;
  club?: Club;
}

export interface ClubLike {
  /** @format int64 */
  id?: number;
  user?: User;
  club?: Club;
}

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
  /** @format int32 */
  minAge?: number;
  /** @format int32 */
  maxAge?: number;
  name?: string;
  introduction?: string;
  /** @uniqueItems true */
  rules?: string[];
  joinQuestions?: string[];
  activityRegion?: string;
  enum?: Club;
}

export interface ClubUser {
  /** @format int64 */
  clubUserId?: number;
  /** @format int64 */
  userId: number;
  /** @format int64 */
  clubId: number;
  role?: ClubUserRoleEnum;
  userName?: string;
  profileImgUrl?: string;
  mannerTemp?: number;
}

export interface Image {
  uploadName?: string;
  storeName?: string;
  url?: string;
}

export interface Meeting {
  /** @format int64 */
  id?: number;
  type?: MeetingTypeEnum;
  title?: string;
  description?: string;
  /** @uniqueItems true */
  rules?: string[];
  joinQuestions?: string[];
  /** @format date-time */
  schedule?: string;
  progress?: MeetingProgressEnum;
  level?: MeetingLevelEnum;
  /** @format int32 */
  participantsNumber?: number;
  /** @format int32 */
  participantLimit?: number;
  /** @format int32 */
  minimumAge?: number;
  /** @format int32 */
  maximumAge?: number;
  genderRatio?: MeetingGenderRatioEnum;
  hasMembershipFee?: boolean;
  /** @format int32 */
  membershipFee?: number;
  category?: MeetingCategoryEnum;
  categoryDetail?: string;
  /** @format int32 */
  view?: number;
  images?: MeetingImage[];
  likes?: MeetingLike[];
  host?: User;
  meetingUsers?: MeetingUser[];
  meetingPlace?: MeetingPlace;
  chatRoom?: ChatRoom;
  club?: Club;
}

export interface MeetingImage {
  /** @format int64 */
  id?: number;
  image?: Image;
  meeting?: Meeting;
}

export interface MeetingLike {
  /** @format int64 */
  id?: number;
  user?: User;
  meeting?: Meeting;
}

export interface MeetingPlace {
  /** @format int64 */
  id?: number;
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

export interface MeetingUser {
  /** @format int64 */
  id?: number;
  role?: MeetingUserRoleEnum;
  meeting?: Meeting;
  user?: User;
}

export interface ProfileImage {
  /** @format int64 */
  id?: number;
  image?: Image;
  user?: User;
}

export interface User {
  /** @format int64 */
  id?: number;
  email?: string;
  password?: string;
  name?: string;
  nickname?: string;
  profileImage?: ProfileImage;
  /** @format date */
  birthDate?: string;
  phoneNumber?: string;
  mannerTemp?: number;
  /** @uniqueItems true */
  interests?: UserInterestsEnum[];
  /** @uniqueItems true */
  locations?: string[];
  gender?: UserGenderEnum;
  locationVerified?: boolean;
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
  paged?: boolean;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  unpaged?: boolean;
}

export interface SortObject {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
}

export interface Status {
  /** @format int32 */
  code?: number;
  message?: string;
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
  type?: string;
  name?: string;
  introduction?: string;
  category?: string;
  categoryDetail?: string;
  meetingPlace?: MeetingPlaceRequest;
  /** @format int32 */
  participantLimit?: number;
  /** @uniqueItems true */
  rules?: string[];
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

export interface AnswerDto {
  question?: string;
  answer?: string;
}

export interface MeetingApplyRequest {
  answers?: AnswerDto[];
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

export interface ClubApplyRequestDto {
  answers?: AnswerDto[];
}

export interface ProfileUpdateRequest {
  nickname?: string;
  password?: string;
  interests?: string[];
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
  type?: string;
  name?: string;
  introduction?: string;
  category?: string;
  categoryDetail?: string;
  meetingPlace?: MeetingPlaceRequest;
  /** @format int32 */
  participantLimit?: number;
  /** @uniqueItems true */
  rules?: string[];
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

export interface ApiResponseMyProfileResponse {
  status?: Status;
  metadata?: Metadata;
  results?: MyProfileResponse[];
}

export interface MyProfileResponse {
  /** @format int64 */
  userId?: number;
  email?: string;
  profileImage?: string;
  nickname?: string;
  mannerRating?: number;
  gender?: MyProfileResponseGenderEnum;
  phoneNumber?: string;
  /** @format date */
  birthDate?: string;
  interests?: MyProfileResponseInterestsEnum[];
  locations?: string[];
  pendingMeetings?: ProfileMeetingResponse[];
  attendedMeetings?: ProfileMeetingResponse[];
  closedMeetings?: ProfileMeetingResponse[];
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
  type?: string;
  name?: string;
  introduction?: string;
  /** @format int32 */
  view?: number;
  /** @format int32 */
  like?: number;
  hasMembershipFee?: boolean;
  /** @format int32 */
  membershipFeeAmount?: number;
  progress?: string;
  level?: string;
  categoryDetail?: string;
  category?: string;
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
  level?: ClubBoardResponseDtoLevelEnum;
  category?: ClubBoardResponseDtoCategoryEnum;
  categoryDetail?: string;
  date?: string;
  /** @format int32 */
  participantNumber?: number;
  /** @format int32 */
  participantLimit?: number;
  genderRatio?: ClubBoardResponseDtoGenderRatioEnum;
  ageRange?: number[];
  rules?: string[];
  joinQuestions?: string[];
  host?: HostResponse;
  images?: ImageResponse[];
  meetings?: MeetingResponse[];
}

export interface ApiResponseUnifiedSearchResponse {
  status?: Status;
  metadata?: Metadata;
  results?: UnifiedSearchResponse[];
}

export interface UnifiedSearchResponse {
  clubSearchResults?: ClubBoardResponseDto[];
  meetingSearchResults?: MeetingResponse[];
}

export interface ApiResponseListMeetingUserResponse {
  status?: Status;
  metadata?: Metadata;
  results?: MeetingUserResponse[][];
}

export interface MeetingUserResponse {
  /** @format int64 */
  id?: number;
  role?: string;
  nickName?: string;
  profileImage?: ImageResponse;
  mannerTemp?: number;
}

export interface ApiResponseMeetingUserAuthorityResponse {
  status?: Status;
  metadata?: Metadata;
  results?: MeetingUserAuthorityResponse[];
}

export interface MeetingUserAuthorityResponse {
  authority?: string;
  message?: string;
}

export interface ApiResponseListMeetingApplyResponse {
  status?: Status;
  metadata?: Metadata;
  results?: MeetingApplyResponse[][];
}

export interface BasicUserResponse {
  nickname?: string;
  mannerTemp?: number;
  profileImage?: ImageResponse;
}

export interface MeetingApplyResponse {
  basicUserResponse?: BasicUserResponse;
  /** @format int64 */
  applyId?: number;
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

export interface ApiResponseListMeetingQuestionAnswerResponse {
  status?: Status;
  metadata?: Metadata;
  results?: MeetingQuestionAnswerResponse[][];
}

export interface MeetingQuestionAnswerResponse {
  /** @format int64 */
  applyId?: number;
  question?: string;
  answer?: string;
}

export interface ApiResponseListClubPostListResponseDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubPostListResponseDto[][];
}

export interface ClubPostListResponseDto {
  /** @format int64 */
  postId?: number;
  title?: string;
  category?: string;
  /** @format date-time */
  createTime?: string;
  writer?: string;
  content?: string;
  images?: ImageResponse[];
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
  createTime?: string;
  writer?: string;
  content: string;
  images?: ImageResponse[];
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
  /** @format int64 */
  clubUserId?: number;
  role?: string;
  userName?: string;
  profileImgUrl?: string;
  mannerTemp?: number;
}

export interface ApiResponseClubUserAuthorityResponse {
  status?: Status;
  metadata?: Metadata;
  results?: ClubUserAuthorityResponse[];
}

export interface ClubUserAuthorityResponse {
  authority?: string;
  message?: string;
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
}

export interface ApiResponseListClubQuestionAnswerResponseDto {
  status?: Status;
  metadata?: Metadata;
  results?: ClubQuestionAnswerResponseDto[][];
}

export interface ClubQuestionAnswerResponseDto {
  /** @format int64 */
  applyId?: number;
  question?: string;
  answer?: string;
}

export interface ApiResponseListChatRoomResponseDTO {
  status?: Status;
  metadata?: Metadata;
  results?: ChatRoomResponseDTO[][];
}

export interface ChatRoomResponseDTO {
  /** @format int64 */
  associatedId?: number;
  title?: string;
  type?: ChatRoomResponseDtoTypeEnum;
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

export enum ChatRoomTypeEnum {
  CLUB = 'CLUB',
  MEETING = 'MEETING',
}

export enum ClubCategoryEnum {
  SOCIAL = 'SOCIAL',
  SPORTS = 'SPORTS',
  STUDY = 'STUDY',
}

export enum ClubLevelEnum {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  NONE = 'NONE',
}

export enum ClubGenderRatioEnum {
  ONLY_MALE = 'ONLY_MALE',
  ONLY_FEMALE = 'ONLY_FEMALE',
  ONE_TO_NINE = 'ONE_TO_NINE',
  TWO_TO_EIGHT = 'TWO_TO_EIGHT',
  THREE_TO_SEVEN = 'THREE_TO_SEVEN',
  FOUR_TO_SIX = 'FOUR_TO_SIX',
  FIVE_TO_FIVE = 'FIVE_TO_FIVE',
  SIX_TO_FOUR = 'SIX_TO_FOUR',
  SEVEN_TO_THREE = 'SEVEN_TO_THREE',
  EIGHT_TO_TWO = 'EIGHT_TO_TWO',
  NINE_TO_ONE = 'NINE_TO_ONE',
  IRRELEVANT = 'IRRELEVANT',
}

export enum ClubUserRoleEnum {
  HOST = 'HOST',
  MEMBER = 'MEMBER',
  NONE = 'NONE',
}

export enum MeetingTypeEnum {
  MEETING = 'MEETING',
  CLUB_MEETING = 'CLUB_MEETING',
}

export enum MeetingProgressEnum {
  ONGOING = 'ONGOING',
  ENDED = 'ENDED',
}

export enum MeetingLevelEnum {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  NONE = 'NONE',
}

export enum MeetingGenderRatioEnum {
  ONLY_MALE = 'ONLY_MALE',
  ONLY_FEMALE = 'ONLY_FEMALE',
  ONE_TO_NINE = 'ONE_TO_NINE',
  TWO_TO_EIGHT = 'TWO_TO_EIGHT',
  THREE_TO_SEVEN = 'THREE_TO_SEVEN',
  FOUR_TO_SIX = 'FOUR_TO_SIX',
  FIVE_TO_FIVE = 'FIVE_TO_FIVE',
  SIX_TO_FOUR = 'SIX_TO_FOUR',
  SEVEN_TO_THREE = 'SEVEN_TO_THREE',
  EIGHT_TO_TWO = 'EIGHT_TO_TWO',
  NINE_TO_ONE = 'NINE_TO_ONE',
  IRRELEVANT = 'IRRELEVANT',
}

export enum MeetingCategoryEnum {
  SOCIAL = 'SOCIAL',
  SPORTS = 'SPORTS',
  STUDY = 'STUDY',
}

export enum MeetingUserRoleEnum {
  HOST = 'HOST',
  MEMBER = 'MEMBER',
  NONE = 'NONE',
}

export enum UserInterestsEnum {
  SOCIAL = 'SOCIAL',
  SPORTS = 'SPORTS',
  STUDY = 'STUDY',
}

export enum UserGenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum MyProfileResponseGenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum MyProfileResponseInterestsEnum {
  SOCIAL = 'SOCIAL',
  SPORTS = 'SPORTS',
  STUDY = 'STUDY',
}

export enum ClubBoardResponseDtoLevelEnum {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  NONE = 'NONE',
}

export enum ClubBoardResponseDtoCategoryEnum {
  SOCIAL = 'SOCIAL',
  SPORTS = 'SPORTS',
  STUDY = 'STUDY',
}

export enum ClubBoardResponseDtoGenderRatioEnum {
  ONLY_MALE = 'ONLY_MALE',
  ONLY_FEMALE = 'ONLY_FEMALE',
  ONE_TO_NINE = 'ONE_TO_NINE',
  TWO_TO_EIGHT = 'TWO_TO_EIGHT',
  THREE_TO_SEVEN = 'THREE_TO_SEVEN',
  FOUR_TO_SIX = 'FOUR_TO_SIX',
  FIVE_TO_FIVE = 'FIVE_TO_FIVE',
  SIX_TO_FOUR = 'SIX_TO_FOUR',
  SEVEN_TO_THREE = 'SEVEN_TO_THREE',
  EIGHT_TO_TWO = 'EIGHT_TO_TWO',
  NINE_TO_ONE = 'NINE_TO_ONE',
  IRRELEVANT = 'IRRELEVANT',
}

export enum ChatRoomResponseDtoTypeEnum {
  CLUB = 'CLUB',
  MEETING = 'MEETING',
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axiosInstance;
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { 'Content-Type': type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title API TITLE
 * @version 0.0.1
 * @baseUrl https://modong-backend.site
 *
 * DESCRIPTION
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description 동아리를 단건으로 조회하는 API 입니다.
     *
     * @tags ClubController
     * @name FindClubBoard
     * @summary 동아리 단건 조회 API
     * @request GET:/api/clubs/{clubId}
     * @secure
     */
    findClubBoard: (clubId: number, params: RequestParams = {}) =>
      this.request<ApiResponseClubBoardResponseDto, any>({
        path: `/api/clubs/${clubId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리를 수정하는 API 입니다.
     *
     * @tags ClubController
     * @name UpdateClub
     * @summary 동아리 수정 API
     * @request PUT:/api/clubs/{clubId}
     * @secure
     */
    updateClub: (
      clubId: number,
      data: {
        clubRequestDto: ClubRequestDto;
        imageFiles: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseClubResponseDto, any>({
        path: `/api/clubs/${clubId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리를 삭제하는 API 입니다.
     *
     * @tags ClubController
     * @name ClubDelete
     * @summary 동아리 삭제 API
     * @request DELETE:/api/clubs/{clubId}
     * @secure
     */
    clubDelete: (clubId: number, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/clubs/${clubId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 게시글의 댓글을 수정하는 API 입니다.
     *
     * @tags ClubCommentController
     * @name UpdateClubComment
     * @summary 동아리 게시글 댓글 수정 API
     * @request PUT:/api/clubs/{clubId}/posts/{postId}/comment/{commentId}
     * @secure
     */
    updateClubComment: (
      clubId: number,
      postId: number,
      commentId: number,
      data: ClubCommentRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseClubCommentResponseDto, any>({
        path: `/api/clubs/${clubId}/posts/${postId}/comment/${commentId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리 게시글의 댓글을 삭제하는 API 입니다.
     *
     * @tags ClubCommentController
     * @name DeleteClubComment
     * @summary 동아리 게시글 댓글 삭제 API
     * @request DELETE:/api/clubs/{clubId}/posts/{postId}/comment/{commentId}
     * @secure
     */
    deleteClubComment: (
      clubId: number,
      postId: number,
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/clubs/${clubId}/posts/${postId}/comment/${commentId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags report-controller
     * @name ReportUser
     * @request POST:/api/users/report/{userId}
     * @secure
     */
    reportUser: (
      userId: number,
      data: ReportRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/users/report/${userId}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동네인증을 하는 API 입니다.
     *
     * @tags user-location-controller
     * @name InsertUserLocation
     * @summary 동네인증 API
     * @request POST:/api/users/location
     * @secure
     */
    insertUserLocation: (
      data: LocationVerifiedRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/users/location`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags report-controller
     * @name LikeUser
     * @request POST:/api/users/like/{userId}
     * @secure
     */
    likeUser: (userId: number, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/users/like/${userId}`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description Access Token을 재발급하는 API 입니다.
     *
     * @tags ReissueController
     * @name Reissue
     * @summary Access Token 재발급 API
     * @request POST:/api/reissue
     * @secure
     */
    reissue: (params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/reissue`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description 최초 로그인 체크를 하는 API 입니다.
     *
     * @tags UserJoinController
     * @name CheckFirstLogin
     * @summary 최초 로그인 체크 API
     * @request GET:/api/oauth2/userInfo
     * @secure
     */
    checkFirstLogin: (params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/oauth2/userInfo`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 소셜 로그인을 하는 API 입니다.
     *
     * @tags UserJoinController
     * @name InsertUserInfo
     * @summary 소셜 로그인 API
     * @request POST:/api/oauth2/userInfo
     * @secure
     */
    insertUserInfo: (data: SocialJoinRequest, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/oauth2/userInfo`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 모임 전체를 조회할 수 있는 API 입니다.
     *
     * @tags MeetingController
     * @name FindAll1
     * @summary 모임 전체 조회 API
     * @request GET:/api/meetings
     * @secure
     */
    findAll1: (params: RequestParams = {}) =>
      this.request<ApiResponseMeetingResponse, any>({
        path: `/api/meetings`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 모임을 생성하는 API 입니다.
     *
     * @tags MeetingController
     * @name CreateMeeting
     * @summary 모임 생성 API
     * @request POST:/api/meetings
     * @secure
     */
    createMeeting: (
      data: {
        request: MeetingCreateRequest;
        imageFiles: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseString, any>({
        path: `/api/meetings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 모임 참여 신청자를 조회하는 API 입니다.
     *
     * @tags MeetingApplyUserController
     * @name FindApplyList
     * @summary 모임 참여 신청자 조회 API
     * @request GET:/api/meetings/{meetingId}/apply
     * @secure
     */
    findApplyList: (meetingId: number, params: RequestParams = {}) =>
      this.request<ApiResponseListMeetingApplyResponse, any>({
        path: `/api/meetings/${meetingId}/apply`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 모임 참여 신청을 하는 API 입니다.
     *
     * @tags MeetingApplyUserController
     * @name ApplyMeetingUser
     * @summary 모임 참여 신청 API
     * @request POST:/api/meetings/{meetingId}/apply
     * @secure
     */
    applyMeetingUser: (
      meetingId: number,
      data: MeetingApplyRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/meetings/${meetingId}/apply`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 모임 참여 신청을 수락하는 API 입니다.
     *
     * @tags MeetingApplyUserController
     * @name AcceptApply
     * @summary 모임 참여 수락 API
     * @request POST:/api/meetings/apply/{applyId}/accept
     * @secure
     */
    acceptApply: (applyId: number, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/meetings/apply/${applyId}/accept`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description 회원가입을 하는 API 입니다.
     *
     * @tags UserJoinController
     * @name Join
     * @summary 회원가입 API
     * @request POST:/api/join
     * @secure
     */
    join: (data: UserJoinRequestDTO, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/join`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리 목록을 조회하는 API 입니다.
     *
     * @tags ClubController
     * @name FindByType
     * @summary 동아리 목록 조회 API
     * @request GET:/api/clubs
     * @secure
     */
    findByType: (params: RequestParams = {}) =>
      this.request<ApiResponseClubBoardResponseDto, any>({
        path: `/api/clubs`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리를 생성하는 API 입니다.
     *
     * @tags ClubController
     * @name SaveClub
     * @summary 동아리 생성 API
     * @request POST:/api/clubs
     * @secure
     */
    saveClub: (
      data: {
        request: ClubRequestDto;
        imageFiles: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseClubResponseDto, any>({
        path: `/api/clubs`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리 게시글 목록을 조회하는 API 입니다.
     *
     * @tags ClubPostController
     * @name FindByPostType
     * @summary 동아리 게시글 목록 조회 API
     * @request GET:/api/clubs/{clubId}/posts
     * @secure
     */
    findByPostType: (clubId: number, params: RequestParams = {}) =>
      this.request<ApiResponseListClubPostListResponseDto, any>({
        path: `/api/clubs/${clubId}/posts`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 게시글을 생성하는 API 입니다.
     *
     * @tags ClubPostController
     * @name SaveClubPost
     * @summary 동아리 게시글 생성 API
     * @request POST:/api/clubs/{clubId}/posts
     * @secure
     */
    saveClubPost: (
      clubId: number,
      data: {
        request: ClubPostRequestDto;
        imageFiles: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseClubPostResponseDto, any>({
        path: `/api/clubs/${clubId}/posts`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리 게시글의 댓글을 조회하는 API 입니다.
     *
     * @tags ClubCommentController
     * @name FindByClubPostId
     * @summary 동아리 게시글 댓글 조회 API
     * @request GET:/api/clubs/{clubId}/posts/{postId}/comment
     * @secure
     */
    findByClubPostId: (
      postId: number,
      clubId: string,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseListClubCommentListResponseDto, any>({
        path: `/api/clubs/${clubId}/posts/${postId}/comment`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 게시글의 댓글을 생성하는 API 입니다.
     *
     * @tags ClubCommentController
     * @name SaveClubComment
     * @summary 동아리 게시글 댓글 생성 API
     * @request POST:/api/clubs/{clubId}/posts/{postId}/comment
     * @secure
     */
    saveClubComment: (
      clubId: number,
      postId: number,
      data: ClubCommentRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseClubCommentResponseDto, any>({
        path: `/api/clubs/${clubId}/posts/${postId}/comment`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 특정 동아리에 대한 모임 목록을 조회할 수 있는 API 입니다.
     *
     * @tags MeetingController
     * @name FindAllClubMeetings
     * @summary 동아리 모임 목록 조회 API
     * @request GET:/api/clubs/{clubId}/meetings
     * @secure
     */
    findAllClubMeetings: (clubId: number, params: RequestParams = {}) =>
      this.request<ApiResponseMeetingResponse, any>({
        path: `/api/clubs/${clubId}/meetings`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 모임을 생성하는 API 입니다.
     *
     * @tags MeetingController
     * @name CreateClubMeeting
     * @summary 동아리 모임 생성 API
     * @request POST:/api/clubs/{clubId}/meetings
     * @secure
     */
    createClubMeeting: (
      clubId: number,
      data: {
        request: MeetingCreateRequest;
        imageFiles: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseString, any>({
        path: `/api/clubs/${clubId}/meetings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리 멤버 지원자 목록을 조회하는 API 입니다.
     *
     * @tags ClubUserController
     * @name FindApplyList1
     * @summary 동아리 멤버 지원자 목록 조회 API
     * @request GET:/api/clubs/{clubId}/apply
     * @secure
     */
    findApplyList1: (clubId: number, params: RequestParams = {}) =>
      this.request<ApiResponseListClubApplyResponseDto, any>({
        path: `/api/clubs/${clubId}/apply`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 멤버로 지원하는 API 입니다.
     *
     * @tags ClubUserController
     * @name Apply
     * @summary 동아리 멤버 지원 API
     * @request POST:/api/clubs/{clubId}/apply
     * @secure
     */
    apply: (
      clubId: number,
      data: ClubApplyRequestDto,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/clubs/${clubId}/apply`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리 멤버 지원을 승인하는 API 입니다.
     *
     * @tags ClubUserController
     * @name AcceptApply1
     * @summary 동아리 멤버 지원 승인 API
     * @request POST:/api/clubs/{clubId}/apply/{applyId}/accept
     * @secure
     */
    acceptApply1: (
      clubId: number,
      applyId: number,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/clubs/${clubId}/apply/${applyId}/accept`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description 채팅방에서 퇴장하는 API 입니다.
     *
     * @tags UserChatRoomController
     * @name ExitChatRoom
     * @summary 채팅방 퇴장 API
     * @request POST:/api/chatroom/{chatRoomId}/exit
     * @secure
     */
    exitChatRoom: (chatRoomId: number, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/chatroom/${chatRoomId}/exit`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description 채팅방에 입장하는 API 입니다.
     *
     * @tags UserChatRoomController
     * @name EnterChatRoom
     * @summary 채팅방 입장 API
     * @request POST:/api/chatroom/{chatRoomId}/enter
     * @secure
     */
    enterChatRoom: (chatRoomId: number, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/chatroom/${chatRoomId}/enter`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * @description 사용자 프로필를 확인할 수 있는 API 입니다.
     *
     * @tags UserProfileController
     * @name GetMyProfile
     * @summary 사용자 프로필 확인 API
     * @request GET:/api/users
     * @secure
     */
    getMyProfile: (params: RequestParams = {}) =>
      this.request<ApiResponseMyProfileResponse, any>({
        path: `/api/users`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 프로필 정보를 수정할 수 있는 API 입니다.(닉에임과 비밀번호만 가능)
     *
     * @tags UserProfileController
     * @name UpdateUserProfile
     * @summary 사용자 정보 수정 API
     * @request PATCH:/api/users
     * @secure
     */
    updateUserProfile: (
      data: ProfileUpdateRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/users`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 사용자 프로필를 확인할 수 있는 API 입니다.
     *
     * @tags UserProfileController
     * @name GetUserProfile
     * @summary 특정 유저 프로필 확인 API
     * @request PATCH:/api/users/{userId}
     * @secure
     */
    getUserProfile: (userId: number, params: RequestParams = {}) =>
      this.request<ApiResponseProfileResponse, any>({
        path: `/api/users/${userId}`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * @description 프로필 이미지 수정할 수 있는 API 입니다.
     *
     * @tags UserProfileController
     * @name UpdateUserProfileImage
     * @summary 사용자 이미지 수정 API
     * @request PATCH:/api/users/image
     * @secure
     */
    updateUserProfileImage: (
      data: {
        /** @format binary */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseString, any>({
        path: `/api/users/image`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description 모임을 단건으로 조회할 수 있는 API 입니다.
     *
     * @tags MeetingController
     * @name FindById
     * @summary 모임 단건 조회 API
     * @request GET:/api/meetings/{meetingId}
     * @secure
     */
    findById: (meetingId: number, params: RequestParams = {}) =>
      this.request<ApiResponseMeetingResponse, any>({
        path: `/api/meetings/${meetingId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 모임을 삭제할 수 있는 API 입니다.
     *
     * @tags MeetingController
     * @name DeleteMeeting
     * @summary 모임 삭제 API
     * @request DELETE:/api/meetings/{meetingId}
     * @secure
     */
    deleteMeeting: (meetingId: number, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/meetings/${meetingId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description 모임 정보를 수정할 수 있는 API 입니다.
     *
     * @tags MeetingController
     * @name UpdateMeeting
     * @summary 모임 정보 수정 API
     * @request PATCH:/api/meetings/{meetingId}
     * @secure
     */
    updateMeeting: (
      meetingId: number,
      data: {
        request: MeetingUpdateRequest;
        imageFiles: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/meetings/${meetingId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 모임을 종료할 수 있는 API 입니다. 모임 삭제와는 달리 단순히 모임을 종료시키는 기능입니다.
     *
     * @tags MeetingController
     * @name EndMeeting
     * @summary 모임 종료 API
     * @request PATCH:/api/meetings/{meetingId}/end
     * @secure
     */
    endMeeting: (meetingId: number, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/meetings/${meetingId}/end`,
        method: 'PATCH',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 게시글을 조회하는 API 입니다.
     *
     * @tags ClubPostController
     * @name FindClubPost
     * @summary 동아리 게시글 단건 조회 API
     * @request GET:/api/clubs/{clubId}/posts/{postId}
     * @secure
     */
    findClubPost: (
      postId: number,
      clubId: string,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseClubPostDto, any>({
        path: `/api/clubs/${clubId}/posts/${postId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 게시글을 삭제하는 API 입니다.
     *
     * @tags ClubPostController
     * @name DeleteClubPost
     * @summary 동아리 게시글 삭제 API
     * @request DELETE:/api/clubs/{clubId}/posts/{postId}
     * @secure
     */
    deleteClubPost: (
      clubId: number,
      postId: number,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/clubs/${clubId}/posts/${postId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 게시글을 수정하는 API 입니다.
     *
     * @tags ClubPostController
     * @name UpdateClubPost
     * @summary 동아리 게시글 수정 API
     * @request PATCH:/api/clubs/{clubId}/posts/{postId}
     * @secure
     */
    updateClubPost: (
      clubId: number,
      postId: number,
      data: {
        request: ClubPostRequestDto;
        imageFiles: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseClubPostResponseDto, any>({
        path: `/api/clubs/${clubId}/posts/${postId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 모임을 검색하는 API 입니다.
     *
     * @tags SearchController
     * @name FindMeetings
     * @summary 모임 검색 API
     * @request GET:/api/search/meeting
     * @secure
     */
    findMeetings: (
      query: {
        query: string;
        category: string;
        sort: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseMeetingResponse, any>({
        path: `/api/search/meeting`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리를 검색하는 API 입니다.
     *
     * @tags SearchController
     * @name FindClubs
     * @summary 동아리 검색 API
     * @request GET:/api/search/club
     * @secure
     */
    findClubs: (
      query: {
        query: string;
        category: string;
        sort: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseClubBoardResponseDto, any>({
        path: `/api/search/club`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리와 모임을 한꺼번에 검색하는 API 입니다.
     *
     * @tags SearchController
     * @name FindAll
     * @summary 동아리 및 모임 검색 API
     * @request GET:/api/search/all
     * @secure
     */
    findAll: (
      query: {
        query: string;
        category: string;
        sort: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseUnifiedSearchResponse, any>({
        path: `/api/search/all`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 모임 멤버를 조회하는 API입니다.
     *
     * @tags MeetingUserController
     * @name GetMemberList
     * @summary 모임 멤버 조회 API
     * @request GET:/api/meetings/{meetingId}/members
     * @secure
     */
    getMemberList: (meetingId: number, params: RequestParams = {}) =>
      this.request<ApiResponseListMeetingUserResponse, any>({
        path: `/api/meetings/${meetingId}/members`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 멤버가 모임을 탈퇴하는 API입니다.
     *
     * @tags MeetingUserController
     * @name MemberExit
     * @summary 모임 멤버 탈퇴 API
     * @request DELETE:/api/meetings/{meetingId}/members
     * @secure
     */
    memberExit: (meetingId: number, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/meetings/${meetingId}/members`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description 모임에 대한 사용자의 권한을 확인할 수 있는 API 입니다.
     *
     * @tags MeetingUserController
     * @name CheckMeetingAuthority
     * @summary 모임에 대한 사용자 권한 확인 API
     * @request GET:/api/meetings/{meetingId}/members/authority
     * @secure
     */
    checkMeetingAuthority: (meetingId: number, params: RequestParams = {}) =>
      this.request<ApiResponseMeetingUserAuthorityResponse, any>({
        path: `/api/meetings/${meetingId}/members/authority`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 나의 운영중인 모임 목록을 조회할 수 있는 API 입니다.
     *
     * @tags MeetingController
     * @name FindRunningMeetings
     * @summary 나의 운영중인 모임 목록 조회 API
     * @request GET:/api/meetings/running
     * @secure
     */
    findRunningMeetings: (
      query: {
        pageable: Pageable;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseMeetingResponse, any>({
        path: `/api/meetings/running`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 나의 승인대기 모임 목록을 조회할 수 있는 API 입니다.
     *
     * @tags MeetingApplyUserController
     * @name FindPendingMeetings
     * @summary 나의 승인대기 모임 목록 조회 API
     * @request GET:/api/meetings/pending
     * @secure
     */
    findPendingMeetings: (
      query: {
        pageable: Pageable;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseMeetingResponse, any>({
        path: `/api/meetings/pending`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 나의 참여중인 모임 목록을 조회할 수 있는 API 입니다.
     *
     * @tags MeetingController
     * @name FindParticipatingMeetings
     * @summary 나의 참여중인 모임 목록 조회 API
     * @request GET:/api/meetings/participating
     * @secure
     */
    findParticipatingMeetings: (
      query: {
        pageable: Pageable;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseMeetingResponse, any>({
        path: `/api/meetings/participating`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 나의 종료된 모임 목록을 조회할 수 있는 API 입니다.
     *
     * @tags MeetingController
     * @name FindClosedMeetings
     * @summary 나의 종료된 모임 목록 조회 API
     * @request GET:/api/meetings/ended
     * @secure
     */
    findClosedMeetings: (
      query: {
        pageable: Pageable;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseMeetingResponse, any>({
        path: `/api/meetings/ended`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 지원자 신청서 보는 API 입니다.
     *
     * @tags MeetingApplyUserController
     * @name GetMeetingAnswers
     * @summary 지원자 신청서 보는 API
     * @request GET:/api/meetings/apply/{applyId}
     * @secure
     */
    getMeetingAnswers: (applyId: number, params: RequestParams = {}) =>
      this.request<ApiResponseListMeetingQuestionAnswerResponse, any>({
        path: `/api/meetings/apply/${applyId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 멤버 목록을 조회하는 API 입니다.
     *
     * @tags ClubUserController
     * @name FindMemberList
     * @summary 동아리 멤버 목록 조회 API
     * @request GET:/api/clubs/{clubId}/members
     * @secure
     */
    findMemberList: (clubId: number, params: RequestParams = {}) =>
      this.request<ApiResponseListClubMembersResponseDto, any>({
        path: `/api/clubs/${clubId}/members`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 멤버를 탈퇴하는 API 입니다.
     *
     * @tags ClubUserController
     * @name ClubUserLeave
     * @summary 동아리 멤버 탈퇴 API
     * @request DELETE:/api/clubs/{clubId}/members
     * @secure
     */
    clubUserLeave: (clubId: number, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/clubs/${clubId}/members`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리에 대한 사용자의 권한을 확인할 수 있는 API 입니다.
     *
     * @tags ClubUserController
     * @name CheckMeetingAuthority1
     * @summary 동아리에 대한 사용자 권한 확인 API
     * @request GET:/api/clubs/{clubId}/members/authority
     * @secure
     */
    checkMeetingAuthority1: (clubId: number, params: RequestParams = {}) =>
      this.request<ApiResponseClubUserAuthorityResponse, any>({
        path: `/api/clubs/${clubId}/members/authority`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 지원자 신청서를 보는 API 입니다.
     *
     * @tags ClubUserController
     * @name GetMeetingAnswers1
     * @summary 동아리 멤버 지원자 조회 API
     * @request GET:/api/clubs/{clubId}/apply/{applyId}
     * @secure
     */
    getMeetingAnswers1: (
      applyId: number,
      clubId: string,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseListClubQuestionAnswerResponseDto, any>({
        path: `/api/clubs/${clubId}/apply/${applyId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 닉네임 중복체크를 하는 API 입니다.
     *
     * @tags UserJoinController
     * @name CheckNickname
     * @summary 닉네임 중복체크 API
     * @request GET:/api/check-nickname
     * @secure
     */
    checkNickname: (
      query: {
        nickname: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/check-nickname`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 이메일 중복체크를 하는 API 입니다.
     *
     * @tags UserJoinController
     * @name CheckEmail
     * @summary 이메일 중복체크 API
     * @request GET:/api/check-email
     * @secure
     */
    checkEmail: (
      query: {
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/check-email`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 사용자가 속한 동아리/모임 채팅방 목록을 조회하는 API 입니다.
     *
     * @tags ChatRoomController
     * @name GetChatRoomsByUserId
     * @summary 사용자가 속한 동아리/모임 채팅방 목록 조회 API
     * @request GET:/api/chatrooms
     * @secure
     */
    getChatRoomsByUserId: (params: RequestParams = {}) =>
      this.request<ApiResponseListChatRoomResponseDTO, any>({
        path: `/api/chatrooms`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 사용자가 속한 모임 채팅방 목록을 조회하는 API 입니다.
     *
     * @tags ChatRoomController
     * @name GetMeetingRoomsByUserId
     * @summary 사용자가 속한 모임 채팅방 목록 조회 API
     * @request GET:/api/chatrooms/meeting
     * @secure
     */
    getMeetingRoomsByUserId: (params: RequestParams = {}) =>
      this.request<ApiResponseListChatRoomResponseDTO, any>({
        path: `/api/chatrooms/meeting`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 사용자가 속한 동아리 채팅방 목록을 조회하는 API 입니다.
     *
     * @tags ChatRoomController
     * @name GetClubRoomsByUserId
     * @summary 사용자가 속한 동아리 채팅방 목록 조회 API
     * @request GET:/api/chatrooms/club
     * @secure
     */
    getClubRoomsByUserId: (params: RequestParams = {}) =>
      this.request<ApiResponseListChatRoomResponseDTO, any>({
        path: `/api/chatrooms/club`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 이전 메세지를 조회하는 API 입니다.
     *
     * @tags ChatController
     * @name GetPreviousMessages
     * @summary 이전 메세지 조회 API
     * @request GET:/api/chat/previous/chatroom/{chatRoomId}
     * @secure
     */
    getPreviousMessages: (
      chatRoomId: number,
      query: {
        /** @format int64 */
        messageId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseListChatResponseDTO, any>({
        path: `/api/chat/previous/chatroom/${chatRoomId}`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 이후 메세지를 추가적으로 조회하는 API 입니다.
     *
     * @tags ChatController
     * @name GetNextMessages
     * @summary 이후 메세지 추가 조회 API
     * @request GET:/api/chat/next/chatroom/{chatRoomId}
     * @secure
     */
    getNextMessages: (
      chatRoomId: number,
      query: {
        /** @format int64 */
        messageId: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ApiResponseListChatResponseDTO, any>({
        path: `/api/chat/next/chatroom/${chatRoomId}`,
        method: 'GET',
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 채팅방에 입장시 초기 메세지를 조회하는 API 입니다.
     *
     * @tags ChatController
     * @name GetInitialMessages
     * @summary 채팅방 초기 메세지 조회 API
     * @request GET:/api/chat/initial/chatroom/{chatRoomId}
     * @secure
     */
    getInitialMessages: (chatRoomId: number, params: RequestParams = {}) =>
      this.request<ApiResponseInitialChatListResponseDTO, any>({
        path: `/api/chat/initial/chatroom/${chatRoomId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 모임 멤버를 추방하는 API입니다.
     *
     * @tags MeetingUserController
     * @name MemberExpel
     * @summary 모임 멤버 추방 API
     * @request DELETE:/api/meetings/members/{meetingUserId}/expel
     * @secure
     */
    memberExpel: (meetingUserId: number, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/meetings/members/${meetingUserId}/expel`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description 모임 참여 신청을 거부하는 API 입니다.
     *
     * @tags MeetingApplyUserController
     * @name RejectApply
     * @summary 모임 참여 거부 API
     * @request DELETE:/api/meetings/apply/{applyId}/reject
     * @secure
     */
    rejectApply: (applyId: number, params: RequestParams = {}) =>
      this.request<ApiResponse, any>({
        path: `/api/meetings/apply/${applyId}/reject`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 멤버를 추방하는 API 입니다.
     *
     * @tags ClubUserController
     * @name MemberExpel1
     * @summary 동아리 멤버 추방 API
     * @request DELETE:/api/clubs/{clubId}/members/{clubUserId}/expel
     * @secure
     */
    memberExpel1: (
      clubId: number,
      clubUserId: number,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/clubs/${clubId}/members/${clubUserId}/expel`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description 동아리 멤버 지원을 거절하는 API 입니다.
     *
     * @tags ClubUserController
     * @name RejectApply1
     * @summary 동아리 멤버 지원 거절 API
     * @request DELETE:/api/clubs/{clubId}/apply/{applyId}/reject
     * @secure
     */
    rejectApply1: (
      clubId: number,
      applyId: number,
      params: RequestParams = {},
    ) =>
      this.request<ApiResponse, any>({
        path: `/api/clubs/${clubId}/apply/${applyId}/reject`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags login-endpoint
     * @name LoginCreate
     * @request POST:/api/login
     * @secure
     */
    loginCreate: (
      data: {
        username?: string;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/api/login`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
