import { applyForMeeting } from '@/api/clubApi';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { MeetingInfo } from './MeetingList';

interface ApplyModalProps {
  meeting: MeetingInfo;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ meeting, onClose }) => {
  const [answers, setAnswers] = useState<string[]>(
    meeting.joinQuestions.map(() => ''),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken') || '';
      const formattedAnswers = meeting.joinQuestions.map((question, index) => ({
        question,
        answer: answers[index],
      }));

      await applyForMeeting(String(meeting.id), token, formattedAnswers);
      alert('신청이 성공적으로 완료되었습니다!');
      onClose();
    } catch (error) {
      alert('신청 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[530px] max-w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">{meeting.name}</h2>
        <p className="text-lg mb-6 text-gray-800">{meeting.introduction}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="col-span-2">
            <h3 className="text-md font-semibold text-gray-700">기본 정보</h3>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-xs font-medium text-gray-500"
            >
              카테고리
            </label>
            <p id="category" className="text-sm mt-1">
              {meeting.category} - {meeting.categoryDetail}
            </p>
          </div>
          <div>
            <label
              htmlFor="level"
              className="block text-xs font-medium text-gray-500"
            >
              레벨
            </label>
            <p id="level" className="text-sm mt-1">
              {meeting.level}
            </p>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-xs font-medium text-gray-500"
            >
              일시
            </label>
            <p id="date" className="text-sm mt-1">
              {meeting.date}
            </p>
          </div>
          <div>
            <label
              htmlFor="place"
              className="block text-xs font-medium text-gray-500"
            >
              장소
            </label>
            <p id="place" className="text-sm mt-1">
              {meeting.place.name}
            </p>
          </div>
          <div>
            <label
              htmlFor="participantsNumber"
              className="block text-xs font-medium text-gray-500"
            >
              인원
            </label>
            <p id="participantsNumber" className="text-sm mt-1">
              {meeting.participantsNumber} / {meeting.participantLimit}
            </p>
          </div>
          <div>
            <label
              htmlFor="ratio"
              className="block text-xs font-medium text-gray-500"
            >
              성비
            </label>
            <p id="ratio" className="text-sm mt-1">
              {meeting.ratio}
            </p>
          </div>
          <div>
            <label
              htmlFor="ageRange"
              className="block text-xs font-medium text-gray-500"
            >
              연령대
            </label>
            <p id="ageRange" className="text-sm mt-1">
              {meeting.ageRange[0]} - {meeting.ageRange[1]}세
            </p>
          </div>
          <div>
            <label
              htmlFor="membershipFee"
              className="block text-xs font-medium text-gray-500"
            >
              회비
            </label>
            <p id="membershipFee" className="text-sm mt-1">
              {meeting.hasMembershipFee
                ? `${meeting.membershipFeeAmount}원`
                : '없음'}
            </p>
          </div>
          <div className="col-span-2">
            <h3 className="text-md font-semibold text-gray-700 mt-4">규칙</h3>
            <ul className="mt-1 list-disc list-inside text-sm text-gray-700">
              {meeting.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="text-md font-semibold text-gray-700 mt-4">
              참가 질문
            </h3>
            {meeting.joinQuestions.map((question, index) => (
              <div key={index} className="mb-2">
                <label
                  htmlFor={`question-${index}`}
                  className="text-sm text-gray-700"
                >
                  {question}
                </label>
                <input
                  id={`question-${index}`}
                  type="text"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={onClose}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            type="submit"
            className={`px-4 py-2 text-white rounded-md ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? '신청 중...' : '신청'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
