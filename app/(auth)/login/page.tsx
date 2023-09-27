"use client";
import Button from "@/components/ui/Button";
import { isEmpty, isValidEmail } from "@/lib/utils";
import { DividerVerticalIcon, FileTextIcon } from "@radix-ui/react-icons";
import { AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Toaster, toast } from "sonner";

export default function Login() {
  // DEFAULT LOGIN IS HR ACCOUNT
  const initialFormData = {
    email: "hr@example.com",
    password: "Password888",
    emailError: false,
    emailErrorMsg: "",
    passwordError: false,
    passwordErrorMsg: "",
    isLoading: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const searchParams = useSearchParams();
  const customCallbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = formData;
    let updatedFormData = {
      ...formData,
      emailError: false,
      emailErrorMsg: "",
      passwordError: false,
      passwordErrorMsg: "",
      isLoading: true,
    };

    // Validate email
    if (isEmpty(email)) {
      updatedFormData = {
        ...updatedFormData,
        emailError: true,
        emailErrorMsg: "Email field cannot be blank",
        isLoading: false,
      };
    } else if (!isValidEmail(email)) {
      updatedFormData = {
        ...updatedFormData,
        emailError: true,
        emailErrorMsg: "Invalid Email",
        isLoading: false,
      };
    }
    // Validate password
    if (isEmpty(password)) {
      updatedFormData = {
        ...updatedFormData,
        passwordError: true,
        passwordErrorMsg: "Password field cannot be blank",
        isLoading: false,
      };
    }

    setFormData(updatedFormData);

    if (!updatedFormData.emailError && !updatedFormData.passwordError) {
      try {
        const response = await signIn("credentials", {
          redirect: false,
          username: formData.email,
          password: formData.password,
        });
        if (!response?.error) {
          router.push(customCallbackUrl);
        } else {
          toast.error("Invalid user");
        }
      } catch (error) {
        console.log(error);
        // Handle any error that occurred during the login attempt
        toast.error("An error occurred during login");
      } finally {
        // Set isLoading to false regardless of success or failure
        setFormData({ ...formData, isLoading: false });
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed w-full top-0 bg-slate-100 text-center p-2">
        <p className="full max-w-2xl mx-auto text-sm px-6 py-2">
          This is a mockup login of Internal Skill-Based Role Portal.
          <br />
          This prototype is designed for educational purposes and is not
          intended for real-world use.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center dvh safeMargin">
        <div aria-label="loginContainer" className="w-full space-y-12">
          <img
            className="max-w-[160px] h-auto mx-auto"
            src="../logoPlaceholder.png"
          />
          <form
            className="w-full max-w-[420px] mx-auto space-y-6"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="space-y-3">
              <div aria-label="emailInputContainer">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg focus:outline-none ${
                    formData.emailError ? "bg-red-50 border-red-500" : ""
                  }`}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
                {formData.emailError && (
                  <p className="flex items-center ml-2 mt-2 text-sm text-red-600 dark:text-red-500">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {formData.emailErrorMsg}
                  </p>
                )}
              </div>

              <div aria-label="passwordInputContainer">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg focus:outline-none ${
                    formData.passwordError ? "bg-red-50 border-red-500" : ""
                  }`}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                />
                {formData.passwordError && (
                  <p className="flex items-center ml-2 mt-2 text-sm text-red-600 dark:text-red-500">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {formData.passwordErrorMsg}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              loading={formData.isLoading}
              className="w-full h-11"
              text="Login"
            />
          </form>
        </div>
      </div>
      <footer className="fixed bottom-3 right-4 flex flex-row items-center text-xs text-gray-400">
        <Link
          href="https://github.com/aaronlimck/SPM2023"
          target="_blank"
          className="flex flex-row items-center"
        >
          <FileTextIcon className="w-4 h-4 mr-1" />
          Docs
        </Link>
        <DividerVerticalIcon className="w-4 h-4 mx-1" />
        SBRP v0.1.0
      </footer>
      <Toaster position="top-right" />
    </div>
  );
}
