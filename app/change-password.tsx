import { useChangePasswordMutation } from "@/redux/features/accountApiSlice";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function ChangePassword() {
  const [focusedInput, setFocusedInput] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter()
  const [changePassword, { isLoading, isSuccess, isError }] = useChangePasswordMutation();


  // Password requirements with validation checks
  const passwordRequirements = [
    {
      label: "At least one uppercase letter",
      test: (password: string) => /[A-Z]/.test(password),
    },
    {
      label: "At least one lowercase letter",
      test: (password: string) => /[a-z]/.test(password),
    },
    {
      label: "At least one special character",
      test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    {
      label: "At least one number",
      test: (password: string) => /\d/.test(password),
    },
    {
      label: "At least 8 characters",
      test: (password: string) => password.length >= 8,
    },
  ];

  const validatePassword = (): boolean => {
    // Check if all requirements are met
    const isValid = passwordRequirements.every((req) => req.test(newPassword));
    if (!isValid) {
      Toast.show({
        text1: "Invalid Password",
        text2: "Please ensure all password requirements are met.",
        type: "error",
      });
      return false;
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      Toast.show({
        text1: "Passwords Do Not Match",
        text2: "New password and confirm password must match.",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleChangePassword = (): void => {
    if (!validatePassword()) {
      return;
    }
    const payload = {
      new_password: newPassword,
      old_password: oldPassword,
    };
    changePassword(payload).unwrap().then(()=>{
        Toast.show({
            text1: "Password Changed Successfully",
            text2: "Your password has been successfully changed.",
            type: "success",
          });
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setFocusedInput("");
          router.back()
    }).catch(()=>{
        Toast.show({
            text1: "Incorrect old password",
            text2: "The old password you entered was incorrect",
            type: "error",
          });
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ paddingTop: 30 }}>
        <Ionicons name="chevron-back" size={24} />
        <Text style={styles.title}>Change Password</Text>
      </View>
      <View>
        <Text style={styles.inputLabel}>Old Password</Text>
        <TextInput
          secureTextEntry={!showPassword}
          value={oldPassword}
          onChangeText={setOldPassword}
          onFocus={() => setFocusedInput("old")}
          style={[
            styles.input,
            {
              borderWidth: focusedInput === "old" ? 2 : 1,
              borderColor: focusedInput === "old" ? "dodgerblue" : "rgba(0,0,0,0.2)",
            },
          ]}
          placeholder="Enter your old password"
        />
      </View>
      <View>
        <Text style={styles.inputLabel}>New Password</Text>
        <TextInput
          secureTextEntry={!showPassword}
          value={newPassword}
          onChangeText={setNewPassword}
          onFocus={() => setFocusedInput("new")}
          style={[
            styles.input,
            {
              borderWidth: focusedInput === "new" ? 2 : 1,
              borderColor: focusedInput === "new" ? "dodgerblue" : "rgba(0,0,0,0.2)",
            },
          ]}
          placeholder="Enter your new password"
        />

      </View>
      <View>
        <Text style={styles.inputLabel}>Confirm New Password</Text>
        <TextInput
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onFocus={() => setFocusedInput("confirm")}
          style={[
            styles.input,
            {
              borderWidth: focusedInput === "confirm" ? 2 : 1,
              borderColor: focusedInput === "confirm" ? "dodgerblue" : "rgba(0,0,0,0.2)",
            },
          ]}
          placeholder="Confirm new password"
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5}}>
        <Checkbox
          uncheckedColor="dodgerblue"
          color="dodgerblue"
          status={showPassword ? "checked" : "unchecked"}
          onPress={() => setShowPassword(!showPassword)}
        />
        <Text>Show passwords</Text>
      </View>
        {/* Password Requirements Section */}
        <View style={styles.requirements}>
          {passwordRequirements.map((req, index) => (
            <Text
              key={index}
              style={{
                color: req.test(newPassword) ? "dodgerblue" : "rgba(0,0,0,0.6)",
              }}
            >
              • {req.label}
            </Text>
          ))}
        </View>
      <TouchableOpacity
        onPress={handleChangePassword}
        disabled={!oldPassword || !newPassword || !confirmPassword || isLoading}
        style={[
          styles.button,
          { opacity: !oldPassword || !newPassword || !confirmPassword ? 0.6 : 1 },
        ]}
      >
        <Text style={styles.buttonLabel}>{isLoading ? <ActivityIndicator color="#fff"/> : "Submit Password"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  mainContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 30,
    fontWeight: "bold",
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: "700",
  },
  button: {
    backgroundColor: "dodgerblue",
    padding: 14,
    borderRadius: 40,
    marginTop: 14,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  requirements: {
    marginBottom:20
  },
});
