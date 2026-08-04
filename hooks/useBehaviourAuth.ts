import { useState, useEffect } from "react";
import { StudentAuth, verifyPin } from "@/services/api";

const AUTH_KEY = "eduportal_student_auth";

export function useBehaviourAuth() {
  const [student, setStudent] = useState<StudentAuth | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        setStudent(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored auth", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (pin: string) => {
    const authData = await verifyPin(pin);
    setStudent(authData);
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    return authData;
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return {
    student,
    isLoading,
    login,
    logout,
  };
}
