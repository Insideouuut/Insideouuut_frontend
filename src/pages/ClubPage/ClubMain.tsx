import React from "react";
import GroupCard from '@/components/GroupCard';

interface ClubInfo {
    name: string;
    description: string;
    meetingTimes: string;
    location: string;
    maxParticipants: number;
    currentParticipants: number;
    contact: string;
}

interface ClubMainProps {
    clubData: ClubInfo;
}

const ClubMain: React.FC<ClubMainProps> = ({ clubData }) => {
    const recentMeetings = [
        {
            clubTypes: ['동아리'],
            meetingTypes: ['운동'],
            imageUrl: 'https://via.placeholder.com/150',
            title: '한강 러닝 크루',
            description: '한강에서 러닝을 함께 즐겨요!',
            date: '2024-07-22',
            location: '서울 한강공원',
            members: { current: 8, total: 10 },
        },
        {
            clubTypes: ['모임'],
            meetingTypes: ['사교/취미'],
            imageUrl: 'https://via.placeholder.com/150',
            title: '요리 동아리',
            description: '함께 요리하며 친목을 다져요!',
            date: '2024-07-20',
            location: '강남역 쿠킹 클래스',
            members: { current: 5, total: 10 },
        },
        {
            clubTypes: ['동아리'],
            meetingTypes: ['스터디'],
            imageUrl: 'https://via.placeholder.com/150',
            title: '토익 스터디',
            description: '토익 점수 올리기 함께해요!',
            date: '2024-07-18',
            location: '신촌 토익 학원',
            members: { current: 15, total: 20 },
        },
        {
            clubTypes: ['모임'],
            meetingTypes: ['운동'],
            imageUrl: 'https://via.placeholder.com/150',
            title: '등산 모임',
            description: '함께 산을 오르며 건강을 챙겨요!',
            date: '2024-07-15',
            location: '북한산 등산로 입구',
            members: { current: 9, total: 10 },
        }
    ];

    return (
        <div className="flex p-6 bg-gray-50 rounded-lg shadow-md w-[820px] border-2 border-gray-200 space-x-6">
            <div className="w-[40%] p-4 bg-white rounded-lg shadow space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{clubData.name}</h2>
                    <p className="text-sm text-gray-600 mt-2">{clubData.description}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">모임 시간</h3>
                    <p className="text-sm text-gray-600 mt-2">{clubData.meetingTimes}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">위치</h3>
                    <p className="text-sm text-gray-600 mt-2">{clubData.location}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">참가자 정원</h3>
                    <p className="text-sm text-gray-600 mt-2">현재 참가자 수: {clubData.currentParticipants} / {clubData.maxParticipants}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">문의</h3>
                    <p className="text-sm text-gray-600 mt-2">{clubData.contact}</p>
                </div>
            </div>
            <div className="w-[60%] p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">최근 생성된 모임 목록</h3>
                <div className="grid grid-cols-1 gap-4">
                    {recentMeetings.map((meeting, index) => (
                        <GroupCard key={index} {...meeting} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ClubMain;
