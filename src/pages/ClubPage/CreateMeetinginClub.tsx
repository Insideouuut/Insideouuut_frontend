import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { createClubMeeting } from '@/api/clubApi';
import { useNavigate, useParams } from 'react-router-dom';

const CreateMeeting: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [memberLimit, setMemberLimit] = useState<string | number>('');
  const [date, setDate] = useState('');
  const [fee, setFee] = useState<string | number>('');
  const [rules, setRules] = useState<string[]>(['']);
  const [joinQuestions, setJoinQuestions] = useState<string[]>(['']);
  const [category, setCategory] = useState('');
  const [categoryDetail, setCategoryDetail] = useState('');
  const [level, setLevel] = useState('');
  const [ageRange, setAgeRange] = useState<[number, number]>([15, 50]);
  const [hasGenderRatio, setHasGenderRatio] = useState('지정');
  const [ratio, setRatio] = useState('5 : 5');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();

  const handleRuleChange = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const handleRemoveRule = (index: number) => {
    if (rules.length > 1) {
      const newRules = rules.filter((_, i) => i !== index);
      setRules(newRules);
    } else {
      alert('최소 1개의 규칙은 있어야 합니다.');
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...joinQuestions];
    newQuestions[index] = value;
    setJoinQuestions(newQuestions);
  };

  const handleAddRule = () => {
    if (rules.length < 3) {
      setRules([...rules, '']);
    }
  };

  const handleAddQuestion = () => {
    if (joinQuestions.length < 3) {
      setJoinQuestions([...joinQuestions, '']);
    }
  };

  const handleMemberLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거
    setMemberLimit(Number(value));
  };

  const formatFee = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자를 제거
    setFee(Number(value));
  };

  const categoryOptions = {
    SPORTS: '운동',
    SOCIAL: '사교/취미',
    STUDY: '스터디',
  };

  const levelOptions = {
    BEGINNER: '하',
    INTERMEDIATE: '중',
    ADVANCED: '상',
    NONE: '무관',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!title) newErrors.title = '필수 입력입니다.';
    else if (title.length < 3 || title.length > 10)
      newErrors.title = '제목은 3~10글자 내로 작성해주세요.';

    if (!description) newErrors.description = '필수 입력입니다.';
    else if (description.length < 10 || description.length > 100)
      newErrors.description = '설명은 10~100글자 내로 작성해주세요.';

    if (!location) newErrors.location = '필수 입력입니다.';
    else if (location.length < 3 || location.length > 10)
      newErrors.location = '장소는 3~10글자 내로 작성해주세요.';

    if (!memberLimit) newErrors.memberLimit = '필수 입력입니다.';

    if (!date) newErrors.date = '필수 입력입니다.';

    if (!fee) newErrors.fee = '필수 입력입니다.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newMeeting = {
      type: "동아리 모임",
      name: title,
      introduction: description,
      category,
      categoryDetail: "기타",
      participantLimit:
        typeof memberLimit === 'string' ? parseInt(memberLimit) : memberLimit,
      rules,
      joinQuestions,
      date,
      level,
      ageRange,
      hasGenderRatio,
      ratio,
      hasMembershipFee: typeof fee === 'number' && fee > 0,
      membershipFeeAmount: typeof fee === 'string' ? parseInt(fee) : fee,
      meetingPlace: {
        name: location,
        placeUrl: "",
        kakaoMapId: "",
        address_name: "",
        road_address_name: "",
        latitude: "",
        longitude: "",
      }
    };

    try {
      const token = localStorage.getItem('accessToken') || '';
      await createClubMeeting(clubId!, token, newMeeting);
      alert('모임이 성공적으로 생성되었습니다.');
      navigate(`/club/${clubId}/meetings`);
    } catch (error) {
      console.error('모임 생성에 실패했습니다:', error);
      alert('모임 생성에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col p-6 rounded-lg w-[820px] border-2 border-gray-200">
      <h2 className="text-xl font-bold mb-6">모임 생성</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 제목 입력 */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2">제목</label>
          {errors.title && <span className="text-red-500 text-[12px]">{errors.title}</span>}
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        {/* 설명 입력 */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2">설명</label>
          {errors.description && <span className="text-red-500 text-[12px]">{errors.description}</span>}
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        {/* 카테고리 입력 */}
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-2">카테고리</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
          >
            {Object.entries(categoryOptions).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
        {/* 카테고리 상세 입력 */}
        <div className="flex flex-col">
          <label htmlFor="categoryDetail" className="mb-2">카테고리 상세</label>
          <input
            id="categoryDetail"
            type="text"
            value={categoryDetail}
            onChange={(e) => setCategoryDetail(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        {/* 장소 및 최대 인원 입력 */}
        <div className="flex w-full justify-between">
          <div className="flex flex-col w-[48%]">
            <label htmlFor="location" className="mb-2">장소</label>
            {errors.location && <span className="text-red-500 text-[12px]">{errors.location}</span>}
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="memberLimit" className="mb-2">최대 인원</label>
            {errors.memberLimit && <span className="text-red-500 text-[12px]">{errors.memberLimit}</span>}
            <select
              id="memberLimit"
              value={memberLimit}
              onChange={(e) => setMemberLimit(e.target.value)}
              className="p-2 border rounded h-[42px]"
            >
              <option value="">선택하세요</option>
              <option value="custom">직접 입력</option>
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="5">5명</option>
              <option value="6">6명</option>
              <option value="7">7명</option>
              <option value="8">8명</option>
              <option value="9">9명</option>
              <option value="10">10명</option>
            </select>
            {(memberLimit === 'custom' || typeof memberLimit === 'number') && (
              <input
                value={typeof memberLimit === 'number' ? memberLimit : ''}
                onChange={handleMemberLimitChange}
                className="mt-2 p-2 border rounded"
                placeholder="최대 인원을 입력하세요"
              />
            )}
          </div>
        </div>
        {/* 일시 입력 */}
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-2">일시</label>
          {errors.date && <span className="text-red-500 text-[12px]">{errors.date}</span>}
          <input
            id="date"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        {/* 회비 입력 */}
        <div className="flex flex-col">
          <label htmlFor="fee" className="mb-2">회비</label>
          {errors.fee && <span className="text-red-500 text-[12px]">{errors.fee}</span>}
          <select
            id="fee"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">선택하세요</option>
            <option value="custom">직접 입력</option>
            <option value="5000">5,000원</option>
            <option value="10000">10,000원</option>
            <option value="20000">20,000원</option>
          </select>
          {(fee === 'custom' || typeof fee === 'number') && (
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={typeof fee === 'number' ? formatFee(fee) : ''}
                onChange={handleFeeChange}
                className="p-2 border rounded flex-grow"
                placeholder="회비를 입력하세요"
              />
              <span className="ml-2">원</span>
            </div>
          )}
        </div>
        {/* 규칙 입력 */}
        <div className="flex flex-col">
          <label className="mb-2">규칙</label>
          {rules.map((rule, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                value={rule}
                onChange={(e) => handleRuleChange(index, e.target.value)}
                className="p-2 border rounded flex-grow"
                placeholder={`규칙 ${index + 1}`}
              />
              {rules.length > 1 && (
                <Button
                  onClick={() => handleRemoveRule(index)}
                  className="ml-2 bg-red-500 text-white hover:bg-red-700"
                >
                  삭제
                </Button>
              )}
            </div>
          ))}
          {rules.length < 3 && (
            <Button
              onClick={handleAddRule}
              className="mt-2 bg-primary text-white hover:bg-green-700"
            >
              규칙 추가
            </Button>
          )}
        </div>
        {/* 질문 입력 */}
        <div className="flex flex-col">
          <label className="mb-2">가입 질문</label>
          {joinQuestions.map((question, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="p-2 border rounded flex-grow"
                placeholder={`질문 ${index + 1}`}
              />
              {joinQuestions.length > 1 && (
                <Button
                  onClick={() => setJoinQuestions(joinQuestions.filter((_, i) => i !== index))}
                  className="ml-2 bg-red-500 text-white hover:bg-red-700"
                >
                  삭제
                </Button>
              )}
            </div>
          ))}
          {joinQuestions.length < 3 && (
            <Button
              onClick={handleAddQuestion}
              className="mt-2 bg-primary text-white hover:bg-green-700"
            >
              질문 추가
            </Button>
          )}
        </div>
        {/* 레벨, 성비, 나이 범위 입력 */}
        <div className="flex flex-col">
          <label className="mb-2">레벨</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="p-2 border rounded"
          >
            {Object.entries(levelOptions).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-2">나이 범위</label>
          <input
            type="number"
            value={ageRange[0]}
            onChange={(e) => setAgeRange([Number(e.target.value), ageRange[1]])}
            className="p-2 border rounded w-[48%]"
            placeholder="최소 나이"
          />
          <input
            type="number"
            value={ageRange[1]}
            onChange={(e) => setAgeRange([ageRange[0], Number(e.target.value)])}
            className="p-2 border rounded w-[48%] mt-2"
            placeholder="최대 나이"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">성비 설정</label>
          <select
            value={hasGenderRatio}
            onChange={(e) => setHasGenderRatio(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="지정">지정</option>
            <option value="미지정">미지정</option>
          </select>
          {hasGenderRatio === '지정' && (
            <input
              type="text"
              value={ratio}
              onChange={(e) => setRatio(e.target.value)}
              className="p-2 border rounded mt-2"
              placeholder="예: 5 : 5"
            />
          )}
        </div>
        {/* 생성 버튼 */}
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            className="px-4 py-2 bg-primary w-28 text-white text-sm font-neoBold rounded-md hover:bg-green-700"
          >
            생성
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateMeeting;
