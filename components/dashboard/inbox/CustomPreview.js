import { Avatar,ChannelPreviewUIComponentProps, useChatContext } from 'stream-chat-react';
import { useAuth } from '../../../context/AuthContext';
// import './CustomPreview.scss';

export const CustomPreview = (ChannelPreviewUIComponentProps) => {
  const { channel, lastMessage, setActiveChannel, setIsCreating } = ChannelPreviewUIComponentProps;
  const {user}=useAuth();

  const { channel: activeChannel , client } = useChatContext();
  const members = Object.values(channel.state.members).filter(
    ({ user }) => user?.id !== client.userID,
  );

  const selected = channel?.id === activeChannel?.id;

  const getTimeStamp = (channel) => {
    let lastHours = channel.state.last_message_at?.getHours();
    let lastMinutes = channel.state.last_message_at?.getMinutes();
    let half = 'AM';
  
    if (lastHours === undefined || lastMinutes === undefined) {
      return '';
    }
  
    if (lastHours > 12) {
      lastHours = lastHours - 12;
      half = 'PM';
    }
  
    if (lastHours === 0) lastHours = 12;
    if (lastHours === 12) half = 'PM';
  
    if (lastMinutes.toString().length === 1) {
      lastMinutes = `0${lastMinutes}`;
    }
  
    return `${lastHours}:${lastMinutes} ${half}`;
  };
  
  const getChannelName = (members) => {
    const defaultName = 'John Doe';
  
    if (!members.length || members.length === 1) {
      return members[0]?.user?.name || defaultName;
    }
  
    return `${members[0]?.user?.name || defaultName}, ${members[1]?.user?.name || defaultName}`;
  };


  const getAvatar = (members) => {
    const defaultName = 'John Doe';
  
    if (!members.length || members.length === 1) {
      return members[0]?.user?.name || defaultName;
    }
  
    return `${members[1]?.user?.name || defaultName}`;
  };

  const renderMessageText = () => {
    const lastMessageText = channel.state.messages[channel.state.messages.length - 1].text;

    const text = lastMessageText || 'message text';

    return text.length < 60 ? lastMessageText : `${text.slice(0, 70)}...`;
  };

  if (!channel.state.messages.length) return null;

  return (
    <div
      className={selected ? 'channel-preview__container selected' : 'channel-preview__container'}
      onClick={() => setActiveChannel(channel)}
    >
    {/* <Avatar
    image={members[0]?.user.image}
    name={members[0]?.user?.fullName}
    /> */}
      <div className='channel-preview__content-wrapper'>
        
        <div className='channel-preview__content-top'>
          <p className='channel-preview__content-name'>{getChannelName(members)}</p>
          <p className='channel-preview__content-name'>{channel.data?.subtitle}</p>
          <p className='channel-preview__content-time'>{getTimeStamp(channel)}</p>
        </div>
        <p className='channel-preview__content-message'>{renderMessageText()}</p>
      </div>
    </div>
  );
};