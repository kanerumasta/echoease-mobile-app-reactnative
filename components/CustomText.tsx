import { Text, TextStyle } from "react-native";

interface CustomTextProps {
    style?: TextStyle; // The style should be of type TextStyle
    children: React.ReactNode; // Expecting children as text content
  }
export  const CustomText: React.FC<CustomTextProps> = ({ children, style }) => {
    return (
      <Text style={[{ fontSize: 16 }, style]}>
        {children}
      </Text>
    );
  };
