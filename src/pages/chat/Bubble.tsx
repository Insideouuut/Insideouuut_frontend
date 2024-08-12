interface BubbleProps {
  isCurrentUser: boolean;
  message: string;
  sender: string;
  sendTime: string;
  senderImage?: string;
}

const Bubble: React.FC<BubbleProps> = ({
  isCurrentUser,
  message,
  sender,
  sendTime,
  senderImage,
}) => {
  // 시스템 메시지
  if (sender === 'SYSTEM') {
    return (
      <div className="text-primary justify-center flex w-full items-center mb-2">
        <p className="text-xs">{message}</p>
      </div>
    );
  }

  // 현재 유저의 메시지
  if (isCurrentUser) {
    return (
      <div className="flex items-end justify-end mb-4">
        {senderImage && (
          <img
            src={senderImage}
            alt="profile"
            className="w-10 h-10 rounded-full ml-3"
          />
        )}
        <div className="max-w-xs p-3 rounded-lg bg-primary text-white">
          <div className="flex items-center mb-1">
            <span className="text-xs">{sendTime}</span>
          </div>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    );
  }

  // 다른 유저의 메시지
  return (
    <div className="flex items-end justify-start mb-4">
      <div className="w-10 h-10 rounded-full mr-3 bg-primary flex items-center justify-center text-white text-xl">
        {sender[0]}
      </div>
      <div className="max-w-xs p-3 rounded-lg bg-gray-100 text-black">
        <div className="flex items-center mb-1">
          <span className="text-xs font-neoBold mr-2">{sender}</span>
          <span className="text-xs">{sendTime}</span>
        </div>
        <p className="text-sm">{message}</p>
      </div>
      {senderImage && (
        <img
          src={senderImage}
          alt="profile"
          className="w-10 h-10 rounded-full ml-3"
        />
      )}
    </div>
  );
};

export default Bubble;
