import Video,{VideoRef} from 'react-native-video';
import { useRef } from 'react';
import { View } from 'react-native';

export default function VideoThumbnail({ videoUri }:{videoUri:string}) {
  const videoRef = useRef<VideoRef>(null);

  const handleCaptureThumbnail = () => {
    if (videoRef.current) {
      videoRef.current.seek(2);  // Seek to a specific time in the video (e.g., 2 seconds)
    }
  };

  return (
    <View>
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        style={{ width: 100, height: 200 }}
        paused={true}
        onLoad={handleCaptureThumbnail}
      />
    </View>
  );
}
