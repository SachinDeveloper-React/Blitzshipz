import {useEffect, useRef, useState} from 'react';
import {
  Platform,
  PermissionsAndroid,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {SettingApi} from '../../networking';
import {showToast} from '../../utils';
import {useAuthStore} from '../../store';
import ImagePickerService from '../ImagePickerService';
import {Asset} from 'react-native-image-picker';

export type ChatMessage = {
  response: string;
  userResponse: boolean;
  attachment?: string | null;
  objectType: 'A' | 'I';
  isObject: boolean;
  ticketId: string;
  userId: string;
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const useChatSupportService = ({ticketID}: {ticketID: string}) => {
  const {user} = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [recording, setRecording] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [amplitudeArray, setAmplitudeArray] = useState<number[]>([]);
  const [recordedFilePath, setRecordedFilePath] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    imageUri: string;
    imageData: Asset;
  }>({
    imageUri: '',
    imageData: {},
  });
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: ChatMessage = {
        objectType: 'A',
        isObject: false,
        ticketId: ticketID,
        userId: user?.id ?? '',
        response: input,
        userResponse: true,
      };

      try {
        const response = await SettingApi.sendMessageByCustomer(newMessage);
        if (response.code === 200 && !response.error) {
          if (response.data.status === 200) {
            setMessages(prev => [newMessage, ...prev]);
            setInput('');
          } else {
            showToast('Message not delivered');
          }
        } else {
          showToast('Something went wrong');
        }
        setInput('');
      } catch (error: any) {
        showToast(error.message || 'Message sending failed');
        setInput('');
      }
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      return (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true;
  };

  const onStartRecord = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const path = Platform.select({
      ios: 'recording.m4a',
      android: `${Date.now()}.mp4`,
    });

    const result = await audioRecorderPlayer.startRecorder(path);
    setRecordedFilePath(result);

    audioRecorderPlayer.addRecordBackListener((e: any) => {
      setRecordSecs(e.current_position);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
      const fakeAmplitude = Math.floor(Math.random() * 60) + 20;
      setAmplitudeArray(prev => [...prev, fakeAmplitude]);
      return;
    });

    setRecording(true);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecording(false);
    setRecordSecs(0);
    setAmplitudeArray([]);
    setRecordedFilePath(result);
  };

  const onPlayRecorded = async () => {
    if (!recordedFilePath) return;

    setIsPlaying(true);
    await audioRecorderPlayer.startPlayer(recordedFilePath);
    audioRecorderPlayer.addPlayBackListener((e: any) => {
      if (e.current_position >= e.duration) {
        onStopPlay();
      }
      return;
    });
  };

  const onStopPlay = async () => {
    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlaying(false);
  };

  const handleAttachment = () => {
    Alert.alert('Select Image', 'Choose a source', [
      {
        text: 'Audio Record',
        onPress: () => onStartRecord(),
      },
      {
        text: 'Gallery',
        onPress: () =>
          ImagePickerService.pickImageWithPrompt(image => {
            if (image?.uri) {
              setSelectedImage(prev => ({
                ...prev,
                imageData: image,
                imageUri: image?.uri ?? '',
              }));
            }
          }),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const getChatByTicketId = async () => {
    try {
      setLoading(true);
      const response = await SettingApi.getChatByTicketId(ticketID);
      if (response.code === 200 && !response.error) {
        setMessages(response.data.reverse());
      }
    } catch (error: any) {
      showToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatByTicketId();
  }, []);

  return {
    loading,
    messages,
    input,
    setInput,
    handleSend,
    recording,
    onStartRecord,
    onStopRecord,
    recordTime,
    amplitudeArray,
    recordedFilePath,
    onPlayRecorded,
    onStopPlay,
    isPlaying,
    scrollViewRef,
    handleAttachment,
    selectedImage,
    setSelectedImage,
  };
};

export default useChatSupportService;
