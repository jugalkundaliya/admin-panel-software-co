type User = {
  email: string;
  username: string;
  password: string;
};

const mockUser: User = {
  email: "user@example.com",
  username: "testuser",
  password: "password123",
};

export const login = async (
  email: string,
  password: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === mockUser.email && password === mockUser.password) {
        resolve(true);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};

export const signUp = async (
  email: string,
  username: string,
  password: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && username && password) {
        resolve(true);
      } else {
        reject(new Error("Failed to sign up. Please fill in all fields."));
      }
    }, 1000);
  });
};

export const forgotPassword = async (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === mockUser.email) {
        resolve(true);
      } else {
        reject(new Error("Email not found"));
      }
    }, 1000);
  });
};
