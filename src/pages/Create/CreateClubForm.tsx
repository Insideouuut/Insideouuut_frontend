import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Slider from '@radix-ui/react-slider';
import { Camera, Info } from 'lucide-react';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const ClubSchema = z.object({
  clubCategory: z.enum(['사교/취미', '운동', '스터디']),
  membershipFee: z.union([z.literal('있음'), z.literal('없음')]),
  membershipFeeAmount: z.preprocess(
    (val) => Number(val),
    z.number().optional(),
  ), // 기본 값을 설정하고 숫자로 변환
  activityRegion: z.string(), // 주로 활동하는 지역
  regularMeetingDate: z.string(), // 정기 모임 날짜
  participantCount: z.preprocess((val) => Number(val), z.number().positive()), // 양수 설정
  genderRatio: z.string(), // 성비
  ratio: z.preprocess((val) => Number(val), z.number()), // 기본 값을 설정하고 숫자로 변환
  ageRange: z.array(z.number()), // 연령대
  clubName: z.string(), // 동아리 이름
  clubIntroduction: z.string(), // 동아리 소개
  clubRules: z.string(), // 동아리 규칙
  clubImage: z.string().optional(), // 이미지 추가 (선택)
  joinQuestions: z.string(), // 가입 질문을 문자열로 변경
  frequency: z.string(), // 주기
  weekDay: z.string().optional(), // 요일 (매주 선택 시)
  monthDate: z.string().optional(), // 날짜 (매달 선택 시)
  hobbyType: z.string().optional(), // 취미
  sportsType: z.string().optional(), // 운동 종류
  level: z.enum(['상', '중', '하']).optional(), // 레벨 (운동, 스터디)
  studyGoal: z.string().optional(), // 스터디 목표
});

type ClubFormData = z.infer<typeof ClubSchema>;

const initialValues: ClubFormData = {
  clubCategory: '사교/취미',
  membershipFee: '없음',
  membershipFeeAmount: 0,
  activityRegion: '',
  regularMeetingDate: '',
  participantCount: 1,
  genderRatio: '무관',
  ratio: 5,
  ageRange: [20, 50],
  clubName: '',
  clubIntroduction: '',
  clubRules: '',
  clubImage: '',
  joinQuestions: '',
  frequency: '',
  weekDay: '',
  monthDate: '',
  hobbyType: '',
  sportsType: '',
  level: '중',
  studyGoal: '',
};

const CreateClubForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ClubFormData>({
    resolver: zodResolver(ClubSchema),
    defaultValues: initialValues,
  });

  const clubCategory = watch('clubCategory');
  const membershipFee = watch('membershipFee');
  const genderRatio = watch('genderRatio');
  const ratio = watch('ratio', 5);
  const frequency = watch('frequency');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (values: ClubFormData) => {
    console.log('values:', values);
    alert('동아리 생성이 완료되었습니다!');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-12 min-h-full w-full max-w-[700px] p-8"
    >
      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="clubCategory">동아리 카테고리</Label>
        <Controller
          name="clubCategory"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              type="single"
              value={field.value}
              onValueChange={(value) =>
                field.onChange(value as '사교/취미' | '운동' | '스터디')
              }
            >
              <ToggleGroupItem value="사교/취미">사교/취미</ToggleGroupItem>
              <ToggleGroupItem value="운동">운동</ToggleGroupItem>
              <ToggleGroupItem value="스터디">스터디</ToggleGroupItem>
            </ToggleGroup>
          )}
        />
        {errors.clubCategory && (
          <span className="text-red-500 text-sm">
            {errors.clubCategory.message}
          </span>
        )}
      </div>

      {clubCategory === '사교/취미' && (
        <div className="flex flex-col gap-4 items-start">
          <Label htmlFor="hobbyType">취미</Label>
          <Controller
            name="hobbyType"
            control={control}
            render={({ field }) => (
              <Input id="hobbyType" placeholder="취미" {...field} />
            )}
          />
          {errors.hobbyType && (
            <span className="text-red-500 text-sm">
              {errors.hobbyType?.message}
            </span>
          )}
        </div>
      )}

      {clubCategory === '운동' && (
        <>
          <div className="flex flex-col gap-4 items-start">
            <Label htmlFor="sportsType">운동 종류</Label>
            <Controller
              name="sportsType"
              control={control}
              render={({ field }) => (
                <Input id="sportsType" placeholder="운동 종류" {...field} />
              )}
            />
            {errors.sportsType && (
              <span className="text-red-500 text-sm">
                {errors.sportsType?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4 items-start">
            <div className="flex items-center justify-between w-full">
              <Label htmlFor="level">레벨</Label>
              <Popover>
                <PopoverTrigger>
                  <Info color="#ccc" />
                </PopoverTrigger>
                <PopoverContent className="m-4">
                  <p className="text-sm md:text-base font-neoBold mb-2">상</p>
                  <p className="text-sm md:text-base">이러 저러한 실력</p>
                  <Separator className="my-4" />
                  <p className="text-sm md:text-base font-neoBold mb-2">중</p>
                  <p className="text-sm md:text-base">이러 저러한 실력</p>
                  <Separator className="my-4" />
                  <p className="text-sm md:text-base font-neoBold mb-2">하</p>
                  <p className="text-sm md:text-base">이러 저러한 실력</p>
                </PopoverContent>
              </Popover>
            </div>
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={(value) =>
                    field.onChange(value as '상' | '중' | '하')
                  }
                  className="flex w-full"
                >
                  <ToggleGroupItem
                    value="상"
                    className="flex-1"
                    variant="outline"
                  >
                    상
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="중"
                    className="flex-1"
                    variant="outline"
                  >
                    중
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="하"
                    className="flex-1"
                    variant="outline"
                  >
                    하
                  </ToggleGroupItem>
                </ToggleGroup>
              )}
            />
            {errors.level && (
              <span className="text-red-500 text-sm">
                {errors.level?.message}
              </span>
            )}
          </div>
        </>
      )}

      {clubCategory === '스터디' && (
        <>
          <div className="flex flex-col gap-4 items-start">
            <Label htmlFor="studyGoal">스터디 목표</Label>
            <Controller
              name="studyGoal"
              control={control}
              render={({ field }) => (
                <Input id="studyGoal" placeholder="스터디 목표" {...field} />
              )}
            />
            {errors.studyGoal && (
              <span className="text-red-500 text-sm">
                {errors.studyGoal?.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-4 items-start">
            <div className="flex items-center justify-between w-full">
              <Label htmlFor="level">레벨</Label>
              <Popover>
                <PopoverTrigger>
                  <Info color="#ccc" />
                </PopoverTrigger>
                <PopoverContent className="m-4">
                  <p className="text-sm md:text-base font-neoBold mb-2">상</p>
                  <p className="text-sm md:text-base">이러 저러한 실력</p>
                  <Separator className="my-4" />
                  <p className="text-sm md:text-base font-neoBold mb-2">중</p>
                  <p className="text-sm md:text-base">이러 저러한 실력</p>
                  <Separator className="my-4" />
                  <p className="text-sm md:text-base font-neoBold mb-2">하</p>
                  <p className="text-sm md:text-base">이러 저러한 실력</p>
                </PopoverContent>
              </Popover>
            </div>
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={(value) =>
                    field.onChange(value as '상' | '중' | '하')
                  }
                  className="flex w-full"
                >
                  <ToggleGroupItem
                    value="상"
                    className="flex-1"
                    variant="outline"
                  >
                    상
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="중"
                    className="flex-1"
                    variant="outline"
                  >
                    중
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="하"
                    className="flex-1"
                    variant="outline"
                  >
                    하
                  </ToggleGroupItem>
                </ToggleGroup>
              )}
            />
            {errors.level && (
              <span className="text-red-500 text-sm">
                {errors.level?.message}
              </span>
            )}
          </div>
        </>
      )}

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="membershipFee">회비</Label>
        <Controller
          name="membershipFee"
          control={control}
          render={({ field }) => (
            <RadioGroup
              className="flex gap-4"
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="없음" id="없음" />
                <Label htmlFor="없음">없음</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="있음" id="있음" />
                <Label htmlFor="있음">있음</Label>
              </div>
            </RadioGroup>
          )}
        />
        {membershipFee === '있음' && (
          <>
            <div className="flex flex-col gap-4 items-start">
              <Label htmlFor="membershipFeeAmount">회비</Label>
              <Controller
                name="membershipFeeAmount"
                control={control}
                render={({ field }) => (
                  <Input
                    id="membershipFeeAmount"
                    type="number"
                    placeholder="회비"
                    {...field}
                  />
                )}
              />
              {errors.membershipFeeAmount && (
                <span className="text-red-500 text-sm">
                  {errors.membershipFeeAmount?.message}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="activityRegion">주로 활동하는 지역</Label>
        <Controller
          name="activityRegion"
          control={control}
          render={({ field }) => (
            <Input
              id="activityRegion"
              placeholder="주로 활동하는 지역"
              {...field}
            />
          )}
        />
        {errors.activityRegion && (
          <span className="text-red-500 text-sm">
            {errors.activityRegion?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="frequency">정기 모임 주기</Label>
        <div className="flex gap-4 w-full">
          <Controller
            name="frequency"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="주기" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="매달">매달</SelectItem>
                  <SelectItem value="매주">매주</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {frequency === '매주' && (
            <Controller
              name="weekDay"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="요일" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="월요일">월요일</SelectItem>
                    <SelectItem value="화요일">화요일</SelectItem>
                    <SelectItem value="수요일">수요일</SelectItem>
                    <SelectItem value="목요일">목요일</SelectItem>
                    <SelectItem value="금요일">금요일</SelectItem>
                    <SelectItem value="토요일">토요일</SelectItem>
                    <SelectItem value="일요일">일요일</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          )}
          {frequency === '매달' && (
            <Controller
              name="monthDate"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min="1"
                  max="31"
                  placeholder="일"
                  className="w-full md:w-[80px]"
                />
              )}
            />
          )}
        </div>
        {errors.frequency && (
          <span className="text-red-500 text-sm">
            {errors.frequency?.message}
          </span>
        )}
        {errors.weekDay && (
          <span className="text-red-500 text-sm">
            {errors.weekDay?.message}
          </span>
        )}
        {errors.monthDate && (
          <span className="text-red-500 text-sm">
            {errors.monthDate?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="participantCount">참여 인원</Label>
        <Controller
          name="participantCount"
          control={control}
          render={({ field }) => (
            <Input
              id="participantCount"
              type="number"
              placeholder="참여 인원"
              {...field}
            />
          )}
        />
        {errors.participantCount && (
          <span className="text-red-500 text-sm">
            {errors.participantCount?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="genderRatio">성비</Label>
        <Controller
          name="genderRatio"
          control={control}
          render={({ field }) => (
            <RadioGroup
              className="flex gap-4 mb-4"
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="무관" id="무관" />
                <Label htmlFor="무관">무관</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="지정" id="지정" />
                <Label htmlFor="지정">지정</Label>
              </div>
            </RadioGroup>
          )}
        />
        {genderRatio === '지정' && (
          <>
            <div className="flex items-center justify-between w-full">
              <span>남성</span>
              <span>여성</span>
            </div>
            <Controller
              name="ratio"
              control={control}
              defaultValue={5}
              render={({ field }) => (
                <Slider.Root
                  className="relative flex items-center select-none touch-none w-full h-5"
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  max={10}
                  step={1}
                >
                  <Slider.Track className="relative bg-gray-200 flex-grow rounded-full h-2">
                    <Slider.Range className="absolute bg-green-500 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-5 h-5 bg-green-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    style={{ cursor: 'pointer' }}
                  />
                </Slider.Root>
              )}
            />
            <div className="text-center mt-2">{`${ratio} : ${10 - ratio}`}</div>
          </>
        )}
        {errors.genderRatio && (
          <span className="text-red-500 text-sm">
            {errors.genderRatio?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="ageRange">연령대</Label>
        <Controller
          name="ageRange"
          control={control}
          defaultValue={[20, 50]}
          render={({ field }) => (
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              min={20}
              max={50}
              step={5}
              value={field.value}
              onValueChange={field.onChange}
            >
              <Slider.Track className="relative bg-gray-200 flex-grow rounded-full h-2">
                <Slider.Range className="absolute bg-green-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-green-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer" />
              <Slider.Thumb className="block w-5 h-5 bg-green-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer" />
            </Slider.Root>
          )}
        />
        <div className="flex justify-between w-full mt-2">
          <span className="text-sm">20</span>
          <span className="text-sm">25</span>
          <span className="text-sm">30</span>
          <span className="text-sm">35</span>
          <span className="text-sm">40</span>
          <span className="text-sm">45</span>
          <span className="text-sm">50+</span>
        </div>
        {errors.ageRange && (
          <span className="text-red-500 text-sm">
            {errors.ageRange?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="clubName">동아리 이름</Label>
        <Controller
          name="clubName"
          control={control}
          render={({ field }) => (
            <Input id="clubName" placeholder="동아리 이름" {...field} />
          )}
        />
        {errors.clubName && (
          <span className="text-red-500 text-sm">
            {errors.clubName?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="clubIntroduction">동아리 소개</Label>
        <Controller
          name="clubIntroduction"
          control={control}
          render={({ field }) => (
            <Textarea
              id="clubIntroduction"
              placeholder="동아리 소개"
              {...field}
            />
          )}
        />
        {errors.clubIntroduction && (
          <span className="text-red-500 text-sm">
            {errors.clubIntroduction?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="clubRules">동아리 규칙</Label>
        <Controller
          name="clubRules"
          control={control}
          render={({ field }) => (
            <Textarea id="clubRules" placeholder="동아리 규칙" {...field} />
          )}
        />
        {errors.clubRules && (
          <span className="text-red-500 text-sm">
            {errors.clubRules?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="clubImage">이미지 추가 (선택)</Label>
        <Input
          id="clubImage"
          type="file"
          placeholder="clubImage"
          {...register('clubImage')}
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <button
          type="button"
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
          className="flex w-full items-center justify-center border border-dashed p-16 rounded-md"
        >
          <Camera strokeWidth={0.75} size={48} color="#cccccc" />
        </button>
        {errors.clubImage && (
          <span className="text-red-500 text-sm">
            {errors.clubImage?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="joinQuestions">가입 질문</Label>
        <Controller
          name="joinQuestions"
          control={control}
          render={({ field }) => (
            <Input id="joinQuestions" placeholder="가입 질문" {...field} />
          )}
        />
        {errors.joinQuestions && (
          <span className="text-red-500 text-sm">
            {errors.joinQuestions?.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full font-neoBold">
        동아리 생성하기
      </Button>
    </form>
  );
};

export default CreateClubForm;
