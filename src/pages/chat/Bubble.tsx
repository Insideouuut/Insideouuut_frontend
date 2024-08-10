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
  return (
    <div
      className={`flex items-end ${isCurrentUser ? 'justify-end' : ''} mb-4`}
    >
      {!isCurrentUser && (
        <div className="w-10 h-10 rounded-full mr-3 bg-primary flex items-center justify-center text-white text-xl">
          {sender[0].toUpperCase()}
        </div>
      )}
      {isCurrentUser && senderImage && (
        <img
          src={senderImage}
          alt="profile"
          className="w-10 h-10 rounded-full mr-3"
        />
      )}
      <div
        className={`max-w-xs p-3 rounded-lg ${isCurrentUser ? 'bg-primary text-white' : 'bg-gray-100 text-black'}`}
      >
        <div className="flex items-center mb-1">
          {!isCurrentUser && (
            <span className="text-xs font-neoBold mr-2">{sender}</span>
          )}
          <span className="text-xs">{sendTime}</span>
        </div>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Bubble;
