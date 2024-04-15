interface IProps {
  video: string,
  width: number
}

export const VideoPlayBack: React.FC<IProps> = ({video, width}) => {
  if (video.length > 0) {
    return <video src={video} width={width} controls />;
  }

  return null;
};
