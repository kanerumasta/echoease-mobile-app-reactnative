import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  return<View>
<Text>Payment Success!</Text>
  </View>
};
