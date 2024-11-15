import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

type MenuButtonProps = {
  icon: React.ReactNode;
  label: string;
  route: string;
};

export const MenuButton = ({ label, icon, route }: MenuButtonProps) => {
  return (
    <Link href={route}>
      <LinearGradient colors={['#00F2FE', 'rgba(0, 146, 255, 0.82)']} style={styles.mainContainer}>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
          <Text style={styles.label}>{label}</Text>
        </View>
      </LinearGradient>
    </Link>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    width: 150,
    height: 150,
  },
  label: {
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1.5 },
    textShadowRadius: 1,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 4,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
