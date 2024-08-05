import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Slider from '@radix-ui/react-slider';
import { format } from 'date-fns';
import { CalendarIcon, Camera, Clock4, Info } from 'lucide-react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const CATEGORY_DETAIL = ['사교/취미 종류', '운동 종류', '스터디 목표'];
const LEVEL_DETAIL = [
  ['운동 상 실력', '운동 중 실력', '운동 하 실력'],
  ['스터디 상 실력', '스터디 중 실력', '스터디 하 실력'],
];

const MeetingSchema = z.object({
  category: z.enum(['사교/취미', '운동', '스터디']),
  categoryDetail: z.string(),
  level: z.enum(['상', '중', '하']).optional(), // 레벨 (운동, 스터디)
  hasMembershipFee: z.union([z.literal('있음'), z.literal('없음')]),
  membershipFeeAmount: z.preprocess(
    (val) => Number(val),
    z.number().optional(),
  ), // 기본 값을 설정하고 숫자로 변환
  meetingPlace: z.string(), // 모임 장소
  meetingDate: z.union([z.date(), z.undefined()]), // 모임 날짜
  meetingTime: z.string(), // 모임 시간
  participantLimit: z.preprocess((val) => Number(val), z.number().positive()), // 양수 설정
  hasGenderRatio: z.string(), // 성비
  ratio: z.preprocess((val) => Number(val), z.number()), // 기본 값을 설정하고 숫자로 변환
  ageRange: z.array(z.number()), // 연령대
  name: z.string(), // 모임 이름
  introduction: z.string(), // 모임 소개
  rules: z.string(), // 모임 규칙
  images: z.string().optional(), // 이미지 추가 (선택)
  joinQuestions: z.string(), // 가입 질문을 문자열로 변경
});

type MeetingFormData = z.infer<typeof MeetingSchema>;

const initialValues: MeetingFormData = {
  category: '사교/취미',
  categoryDetail: '',
  level: '중',
  hasMembershipFee: '없음',
  membershipFeeAmount: 0,
  meetingPlace: '',
  meetingDate: undefined,
  meetingTime: '',
  participantLimit: 1,
  hasGenderRatio: '무관',
  ratio: 5,
  ageRange: [20, 50],
  name: '',
  introduction: '',
  rules: '',
  images: '',
  joinQuestions: '',
};

const CreateMeetingForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<MeetingFormData>({
    resolver: zodResolver(MeetingSchema),
    defaultValues: initialValues,
  });
  const [categoryDetail, setCategoryDetail] = useState(CATEGORY_DETAIL[0]);
  const [levelDetail, setLevelDetail] = useState(LEVEL_DETAIL[0]);

  const category = watch('category');
  const hasMembershipFee = watch('hasMembershipFee');
  const hasGenderRatio = watch('hasGenderRatio');
  const ratio = watch('ratio', 5);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (values: MeetingFormData) => {
    console.log('values:', values);
    alert('모임 생성이 완료되었습니다!');
  };

  const handleTimeChange = (meridian: string, hour: string, minute: string) => {
    const formattedTime = `${meridian} ${hour}:${minute}`;
    setValue('meetingTime', formattedTime);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-12 min-h-full w-full max-w-[700px] p-8"
    >
      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="category">모임 카테고리</Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              type="single"
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value as '사교/취미' | '운동' | '스터디');
                switch (value) {
                  case '사교/취미':
                    setCategoryDetail(CATEGORY_DETAIL[0]);
                    break;
                  case '운동':
                    setCategoryDetail(CATEGORY_DETAIL[1]);
                    setLevelDetail(LEVEL_DETAIL[0]);
                    break;
                  case '스터디':
                    setCategoryDetail(CATEGORY_DETAIL[2]);
                    setLevelDetail(LEVEL_DETAIL[1]);
                    break;
                }
              }}
            >
              <ToggleGroupItem value="사교/취미">사교/취미</ToggleGroupItem>
              <ToggleGroupItem value="운동">운동</ToggleGroupItem>
              <ToggleGroupItem value="스터디">스터디</ToggleGroupItem>
            </ToggleGroup>
          )}
        />
        {errors.category && (
          <span className="text-red-500 text-sm">
            {errors.category.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="categoryDetail">{categoryDetail}</Label>
        <Controller
          name="categoryDetail"
          control={control}
          render={({ field }) => (
            <Input
              id="categoryDetail"
              placeholder={categoryDetail}
              {...field}
            />
          )}
        />
        {errors.categoryDetail && (
          <span className="text-red-500 text-sm">
            {errors.categoryDetail?.message}
          </span>
        )}
      </div>

      {(category === '운동' || category == '스터디') && (
        <div className="flex flex-col gap-4 items-start">
          <div className="flex items-center justify-between w-full">
            <Label htmlFor="level">레벨</Label>
            <Popover>
              <PopoverTrigger>
                <Info color="#ccc" />
              </PopoverTrigger>
              <PopoverContent className="m-4">
                <p className="text-sm md:text-base font-neoBold mb-2">상</p>
                <p className="text-sm md:text-base">{levelDetail[0]}</p>
                <Separator className="my-4" />
                <p className="text-sm md:text-base font-neoBold mb-2">중</p>
                <p className="text-sm md:text-base">{levelDetail[1]}</p>
                <Separator className="my-4" />
                <p className="text-sm md:text-base font-neoBold mb-2">하</p>
                <p className="text-sm md:text-base">{levelDetail[2]}</p>
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
      )}

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="hasMembershipFee">회비</Label>
        <Controller
          name="hasMembershipFee"
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
        {hasMembershipFee === '있음' && (
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
        <Label htmlFor="meetingPlace">모임 장소</Label>
        <Controller
          name="meetingPlace"
          control={control}
          render={({ field }) => (
            <Input id="meetingPlace" placeholder="모임 장소" {...field} />
          )}
        />
        {errors.meetingPlace && (
          <span className="text-red-500 text-sm">
            {errors.meetingPlace?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="meetingDate">모임 날짜 및 시간</Label>
        <div className="flex gap-4 w-full">
          <Controller
            name="meetingDate"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), 'yyyy-MM-dd')
                    ) : (
                      <span>날짜 선택</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date || new Date())}
                    disabled={(date) =>
                      date < new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          <Controller
            name="meetingTime"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? field.value : <span>시간 선택</span>}
                    <Clock4 className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex gap-2 mr-4">
                  <Select
                    onValueChange={(meridian) => {
                      const [currentHour, currentMinute] = (
                        field.value || '오전 12:00'
                      ).split(/[: ]/);
                      handleTimeChange(meridian, currentHour, currentMinute);
                    }}
                    value={field.value ? field.value.split(' ')[0] : '오전'}
                  >
                    <SelectTrigger className="w-full md:w-[180px] border-none">
                      <SelectValue placeholder="오전/오후" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="오전">오전</SelectItem>
                      <SelectItem value="오후">오후</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(hour) => {
                      const [currentMeridian, currentMinute] = (
                        field.value || '오전 12:00'
                      ).split(/[: ]/);
                      handleTimeChange(currentMeridian, hour, currentMinute);
                    }}
                    value={
                      field.value
                        ? field.value.split(' ')[1].split(':')[0]
                        : '12'
                    }
                  >
                    <SelectTrigger className="w-full md:w-[180px] border-none">
                      <SelectValue placeholder="시간" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(12).keys()].map((h) => (
                        <SelectItem
                          key={h}
                          value={String(h + 1).padStart(2, '0')}
                        >
                          {String(h + 1).padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(minute) => {
                      const [currentMeridian, currentHour] = (
                        field.value || '오전 12:00'
                      ).split(/[: ]/);
                      handleTimeChange(currentMeridian, currentHour, minute);
                    }}
                    value={field.value ? field.value.split(':')[1] : '00'}
                  >
                    <SelectTrigger className="w-full md:w-[180px] border-none">
                      <SelectValue placeholder="분" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(60).keys()].map((m) => (
                        <SelectItem key={m} value={String(m).padStart(2, '0')}>
                          {String(m).padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
        {errors.meetingDate && (
          <span className="text-red-500 text-sm">
            {errors.meetingDate?.message}
          </span>
        )}
        {errors.meetingTime && (
          <span className="text-red-500 text-sm">
            {errors.meetingTime?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="participantLimit">최대 참여 인원</Label>
        <Controller
          name="participantLimit"
          control={control}
          render={({ field }) => (
            <Input
              id="participantLimit"
              type="number"
              placeholder="최대 참여 인원"
              {...field}
            />
          )}
        />
        {errors.participantLimit && (
          <span className="text-red-500 text-sm">
            {errors.participantLimit?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="hasGenderRatio">성비</Label>
        <Controller
          name="hasGenderRatio"
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
        {hasGenderRatio === '지정' && (
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
        {errors.hasGenderRatio && (
          <span className="text-red-500 text-sm">
            {errors.hasGenderRatio?.message}
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
        <Label htmlFor="name">모임 이름</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input id="name" placeholder="모임 이름" {...field} />
          )}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="introduction">모임 소개</Label>
        <Controller
          name="introduction"
          control={control}
          render={({ field }) => (
            <Textarea id="introduction" placeholder="모임 소개" {...field} />
          )}
        />
        {errors.introduction && (
          <span className="text-red-500 text-sm">
            {errors.introduction?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="rules">모임 규칙</Label>
        <Controller
          name="rules"
          control={control}
          render={({ field }) => (
            <Textarea id="rules" placeholder="모임 규칙" {...field} />
          )}
        />
        {errors.rules && (
          <span className="text-red-500 text-sm">{errors.rules?.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="images">이미지 추가 (선택)</Label>
        <Input
          id="images"
          type="file"
          placeholder="images"
          {...register('images')}
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
        {errors.images && (
          <span className="text-red-500 text-sm">{errors.images?.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="joinQuestions">모임 참여 질문</Label>
        <Controller
          name="joinQuestions"
          control={control}
          render={({ field }) => (
            <Input id="joinQuestions" placeholder="모임 참여 질문" {...field} />
          )}
        />
        {errors.joinQuestions && (
          <span className="text-red-500 text-sm">
            {errors.joinQuestions?.message}
          </span>
        )}
      </div>

      <Button type="submit" className="w-full font-neoBold">
        모임 생성하기
      </Button>
    </form>
  );
};

export default CreateMeetingForm;
