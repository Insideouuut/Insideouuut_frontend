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
import { Club } from '@/types/Modong';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Slider from '@radix-ui/react-slider';
import { Camera, Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const CATEGORY_DETAIL = ['사교/취미 종류', '운동 종류', '스터디 목표'];
const LEVEL_DETAIL = [
  ['운동 상 실력', '운동 중 실력', '운동 하 실력'],
  ['스터디 상 실력', '스터디 중 실력', '스터디 하 실력'],
];

const ClubSchema = z.object({
  category: z.enum(['사교/취미', '운동', '스터디']),
  categoryDetail: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  level: z.enum(['상', '중', '하']).optional(),
  hasMembershipFee: z.boolean(),
  membershipFeeAmount: z.preprocess(
    (val) => Number(val),
    z.number().optional(),
  ),
  activityRegion: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  frequency: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  weekDay: z.string().optional(),
  monthDate: z.string().optional(),
  participantLimit: z.preprocess(
    (val) => Number(val),
    z.number().positive().min(1, { message: '필수 입력 항목입니다.' }),
  ),
  hasGenderRatio: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  ratio: z.preprocess((val) => Number(val), z.number()),
  ageRange: z.array(z.number()),
  name: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  introduction: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  rules: z.string().min(1, { message: '필수 입력 항목입니다.' }),
  images: z.union([z.instanceof(File), z.null()]),
  joinQuestions: z.string().min(1, { message: '필수 입력 항목입니다.' }),
});

type ClubFormData = z.infer<typeof ClubSchema>;

const initialValues: ClubFormData = {
  category: '사교/취미',
  categoryDetail: '',
  level: '중',
  hasMembershipFee: false,
  membershipFeeAmount: 0,
  activityRegion: '',
  frequency: '',
  weekDay: '월요일',
  monthDate: '1',
  participantLimit: 1,
  hasGenderRatio: '무관',
  ratio: 5,
  ageRange: [20, 50],
  name: '',
  introduction: '',
  rules: '',
  images: null,
  joinQuestions: '',
};

const CreateClubForm = () => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ClubFormData>({
    resolver: zodResolver(ClubSchema),
    defaultValues: initialValues,
  });
  const [categoryDetail, setCategoryDetail] = useState(CATEGORY_DETAIL[0]);
  const [levelDetail, setLevelDetail] = useState(LEVEL_DETAIL[0]);

  const category = watch('category');
  const hasMembershipFee = watch('hasMembershipFee');
  const hasGenderRatio = watch('hasGenderRatio');
  const ratio = watch('ratio', 5);
  const frequency = watch('frequency');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setValue('images', file);
  };

  useEffect(() => {
    switch (category) {
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
  }, [category]);

  const onSubmit = (data: ClubFormData) => {
    let levelData = data.level || '';
    if (data.category === '사교/취미') {
      levelData = '';
    }
    const membershipFeeAmountData = data.membershipFeeAmount || 0;
    let dateData = data.frequency + ' ';
    if (data.frequency === '매주') {
      dateData += data?.weekDay;
    } else if (data.frequency === '매달') {
      dateData += data?.monthDate + '일';
    }
    let ratioData = '';
    if (data.ratio) {
      ratioData = `${ratio} : ${10 - ratio}`;
    }

    const createClubData: Club = {
      category: data.category,
      categoryDetail: data.categoryDetail,
      level: levelData,
      hasMembershipFee: data.hasMembershipFee,
      membershipFeeAmount: membershipFeeAmountData,
      activityRegion: data.activityRegion,
      date: dateData,
      participantLimit: data.participantLimit,
      hasGenderRatio: data.hasGenderRatio,
      ratio: ratioData,
      ageRange: data.ageRange,
      name: data.name,
      introduction: data.introduction,
      rules: [data.rules],
      images: data.images,
      joinQuestions: [data.joinQuestions],
    };
    console.log('data:', createClubData);
    alert('동아리 생성이 완료되었습니다!');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-12 min-h-full w-full max-w-[700px] p-8"
    >
      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="category">
          동아리 카테고리 <span className="text-primary font-neoBold">*</span>
        </Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <ToggleGroup
              type="single"
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value as '사교/취미' | '운동' | '스터디');
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

      {(category === '운동' || category == '스터디') && (
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
        <Label htmlFor="activityRegion">
          주로 활동하는 지역{' '}
          <span className="text-primary font-neoBold">*</span>
        </Label>
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
        <Label htmlFor="frequency">
          정기 모임 주기 <span className="text-primary font-neoBold">*</span>
        </Label>
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
                  min={1}
                  max={31}
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
          동아리 이름 <span className="text-primary font-neoBold">*</span>
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input id="name" placeholder="동아리 이름" {...field} />
          )}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="introduction">
          동아리 소개 <span className="text-primary font-neoBold">*</span>
        </Label>
        <Controller
          name="introduction"
          control={control}
          render={({ field }) => (
            <Textarea id="introduction" placeholder="동아리 소개" {...field} />
          )}
        />
        {errors.introduction && (
          <span className="text-red-500 text-sm">
            {errors.introduction?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="rules">
          동아리 규칙 <span className="text-primary font-neoBold">*</span>
        </Label>
        <Controller
          name="rules"
          control={control}
          render={({ field }) => (
            <Textarea id="rules" placeholder="동아리 규칙" {...field} />
          )}
        />
        {errors.rules && (
          <span className="text-red-500 text-sm">{errors.rules?.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="images">이미지 추가 (선택)</Label>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <Input
              id="images"
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
        {errors.images && (
          <span className="text-red-500 text-sm">{errors.images.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <Label htmlFor="joinQuestions">
          가입 질문 <span className="text-primary font-neoBold">*</span>
        </Label>
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