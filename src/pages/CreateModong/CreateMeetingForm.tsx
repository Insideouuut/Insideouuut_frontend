import { createMeeting } from '@/api/createModongApi';
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
import { MeetingPlace } from '@/types/Modong';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Slider from '@radix-ui/react-slider';
import { format } from 'date-fns';
import { CalendarIcon, Camera, Clock4, Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Map from './Map';

const CATEGORY_DETAIL = ['사교/취미 종류', '운동 종류', '스터디 목표'];
const LEVEL_DETAIL = [
  ['운동 상 실력', '운동 중 실력', '운동 하 실력'],
  ['스터디 상 실력', '스터디 중 실력', '스터디 하 실력'],
];

const MeetingPlaceSchema = z.object({
  kakaoMapId: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  name: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  addressName: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  roadAddressName: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  latitude: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  longitude: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  placeUrl: z.string().url().min(1, { message: '필수 입력 항목입니다.' }),
});

const MeetingSchema = z.object({
  category: z.enum(['SOCIAL', 'SPORTS', 'STUDY']),
  categoryDetail: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  level: z.enum(['ADVANCED', 'INTERMEDIATE', 'BEGINNER']).optional(),
  hasMembershipFee: z.boolean(),
  membershipFeeAmount: z.preprocess(
    (val) => Number(val),
    z.number().optional(),
  ),
  meetingPlace: z.union([MeetingPlaceSchema, z.null()]),
  meetingDate: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  meetingTime: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  participantLimit: z.preprocess(
    (val) => Number(val),
    z.number().positive().min(1, { message: '필수 입력 항목입니다.' }),
  ),
  hasGenderRatio: z.string(),
  ratio: z.preprocess((val) => Number(val), z.number()),
  ageRange: z.array(z.number()),
  name: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  introduction: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  rules: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  imageFiles: z.union([z.instanceof(File), z.string()]),
  joinQuestions: z.string().min(1, { message: '필수 입력 항목입니다.' }),
});

type MeetingFormData = z.infer<typeof MeetingSchema>;

const initialValues: MeetingFormData = {
  category: 'SOCIAL',
  categoryDetail: '',
  level: 'INTERMEDIATE',
  hasMembershipFee: false,
  membershipFeeAmount: 0,
  meetingPlace: null,
  meetingDate: '',
  meetingTime: '',
  participantLimit: 1,
  hasGenderRatio: '무관',
  ratio: 5,
  ageRange: [20, 50],
  name: '',
  introduction: '',
  rules: '',
  imageFiles: '',
  joinQuestions: '',
};

const CreateMeetingForm = () => {
  const navigate = useNavigate();
  const {
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
  const [selectedFile, setSelectedFile] = useState<File | ''>('');

  const [meetingPlace, setMeetingPlace] = useState<MeetingPlace | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || '';
    setSelectedFile(file);
    setValue('imageFiles', file);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    switch (category) {
      case 'SOCIAL':
        setCategoryDetail(CATEGORY_DETAIL[0]);
        break;
      case 'SPORTS':
        setCategoryDetail(CATEGORY_DETAIL[1]);
        setLevelDetail(LEVEL_DETAIL[0]);
        break;
      case 'STUDY':
        setCategoryDetail(CATEGORY_DETAIL[2]);
        setLevelDetail(LEVEL_DETAIL[1]);
        break;
    }
  }, [category]);

  const onSubmit = async (data: MeetingFormData) => {
    if (!meetingPlace) {
      alert('모임 장소는 필수 입력 값입니다.');
      return;
    }
    const formattedTime = (meetingTime: string) => {
      let formattedTime = '';
      const [meridian, time] = meetingTime.split(' ');
      const [hour, minute] = time.split(':');
      let adjustedHour = hour;

      if (meridian === '오후' && hour !== '12') {
        adjustedHour = String(Number(hour) + 12).padStart(2, '0');
      } else if (meridian === '오전' && hour === '12') {
        adjustedHour = '00';
      }

      formattedTime = `${adjustedHour}:${minute}:00`;
      return formattedTime;
    };

    const request = {
      type: '모임',
      category: data.category,
      categoryDetail: data.categoryDetail,
      level: data.category === 'SOCIAL' ? 'NONE' : data.level,
      hasMembershipFee: data.hasMembershipFee,
      membershipFeeAmount: data.membershipFeeAmount || 0,
      meetingPlace: meetingPlace,
      date: data.meetingDate + ' ' + formattedTime(data.meetingTime),
      participantLimit: data.participantLimit,
      hasGenderRatio: data.hasGenderRatio,
      ratio: `${data.ratio} : ${10 - data.ratio}`,
      ageRange: data.ageRange,
      name: data.name,
      introduction: data.introduction,
      rules: data.rules.split(',').map((rule) => rule.trim()),
      joinQuestions: data.joinQuestions
        .split(',')
        .map((joinQuestion) => joinQuestion.trim()),
    };

    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(request)], { type: 'application/json' }),
    );
    formData.append('imageFiles', data.imageFiles);

    try {
      const response = await createMeeting(formData);
      const meetingId = response.data.results[0].meetingId;
      if (response.status === 200) {
        alert('모임 생성이 완료되었습니다!');
        navigate(`/meeting/${meetingId}`);
      } else {
        console.error(response.statusText);
        alert(response.statusText);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
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
        <Label htmlFor="category">
          모임 카테고리 <span className="text-primary font-neoBold">*</span>
        </Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              type="single"
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value as 'SOCIAL' | 'SPORTS' | 'STUDY');
              }}
            >
              <ToggleGroupItem value="SOCIAL">사교/취미</ToggleGroupItem>
              <ToggleGroupItem value="SPORTS">운동</ToggleGroupItem>
              <ToggleGroupItem value="STUDY">스터디</ToggleGroupItem>
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
        <Label htmlFor="categoryDetail">
          {categoryDetail} <span className="text-primary font-neoBold">*</span>
        </Label>
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

      {(category === 'SPORTS' || category == 'STUDY') && (
        <div className="flex flex-col gap-4 items-start">
          <div className="flex items-center justify-between w-full">
            <Label htmlFor="level">
              레벨 <span className="text-primary font-neoBold">*</span>
            </Label>
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
                  field.onChange(
                    value as 'ADVANCED' | 'INTERMEDIATE' | 'BEGINNER',
                  )
                }
                className="flex w-full"
              >
                <ToggleGroupItem
                  value="ADVANCED"
                  className="flex-1"
                  variant="outline"
                >
                  상
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="INTERMEDIATE"
                  className="flex-1"
                  variant="outline"
                >
                  중
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="BEGINNER"
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
        <Label htmlFor="hasMembershipFee">
          회비 <span className="text-primary font-neoBold">*</span>
        </Label>
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
                <RadioGroupItem value={false} id="없음" />
                <Label htmlFor="없음">없음</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={true} id="있음" />
                <Label htmlFor="있음">있음</Label>
              </div>
            </RadioGroup>
          )}
        />
        {hasMembershipFee === true && (
          <>
            <div className="flex flex-col gap-4 items-start">
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
        <Label htmlFor="meetingPlace">
          모임 장소 <span className="text-primary font-neoBold">*</span>
        </Label>
        {meetingPlace !== null && (
          <div className="text-sm">
            <p className="font-neoBold">{meetingPlace.name}</p>
            <p className="text-sm text-gray-500">
              {meetingPlace.addressName || meetingPlace.roadAddressName}
            </p>
          </div>
        )}

        <Map setMeetingPlace={setMeetingPlace} />
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="meetingDate">
          모임 날짜 및 시간 <span className="text-primary font-neoBold">*</span>
        </Label>
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
                    onSelect={(date) =>
                      field.onChange(formatDate(date || new Date()))
                    }
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
        <Label htmlFor="participantLimit">
          최대 참여 인원 <span className="text-primary font-neoBold">*</span>
        </Label>
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
        <Label htmlFor="hasGenderRatio">
          성비 <span className="text-primary font-neoBold">*</span>
        </Label>
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
        <Label htmlFor="ageRange">
          연령대 <span className="text-primary font-neoBold">*</span>
        </Label>
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
        <Label htmlFor="name">
          모임 이름 <span className="text-primary font-neoBold">*</span>
        </Label>
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
        <Label htmlFor="introduction">
          모임 소개 <span className="text-primary font-neoBold">*</span>
        </Label>
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
        <div className="flex items-center justify-between w-full">
          <Label htmlFor="rules">
            <Label htmlFor="rules">
              모임 규칙 <span className="text-primary font-neoBold">*</span>
            </Label>
          </Label>
          <Popover>
            <PopoverTrigger>
              <Info color="#ccc" />
            </PopoverTrigger>
            <PopoverContent className="m-2 text-xs">
              <p>
                규칙은 쉼표(,)로 구분됩니다.
                <br />
                마지막 규칙 뒤에 쉼표(,)를 작성하지 마세요.
              </p>
              <p className="mt-2">예시</p>
              <p className="text-gray-500">
                모임 규칙 1, 모임 규칙 2, 모임 규칙 3
              </p>
            </PopoverContent>
          </Popover>
        </div>
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
        <Label htmlFor="imageFiles">이미지 추가 (선택)</Label>
        <Controller
          name="imageFiles"
          control={control}
          render={({ field }) => (
            <Input
              id="imageFiles"
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                handleFileChange(e);
                field.onChange(e.target.files?.[0] ?? null);
              }}
              style={{ display: 'none' }}
              accept="image/*"
            />
          )}
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
        {selectedFile && (
          <div className="text-sm text-gray-500">{selectedFile.name}</div>
        )}
        {errors.imageFiles && (
          <span className="text-red-500 text-sm">
            {errors.imageFiles.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <div className="flex items-center justify-between w-full">
          <Label htmlFor="joinQuestions">
            <Label htmlFor="joinQuestions">
              모임 참여 질문{' '}
              <span className="text-primary font-neoBold">*</span>
            </Label>
          </Label>
          <Popover>
            <PopoverTrigger>
              <Info color="#ccc" />
            </PopoverTrigger>
            <PopoverContent className="m-2 text-xs">
              <p>
                모임 참여 질문은 쉼표(,)로 구분됩니다.
                <br />
                마지막 질문 뒤에 쉼표(,)를 작성하지 마세요.
              </p>
              <p className="mt-2">예시</p>
              <p className="text-gray-500">
                참여 질문 1, 참여 질문 2, 참여 질문 3
              </p>
            </PopoverContent>
          </Popover>
        </div>
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
