"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

const inputClassName =
  "w-full rounded-xl border border-[#E2E6E2] bg-white px-4 py-3 text-sm text-[#181C1F] placeholder:text-[#5E6662] shadow-none [--field-border:#E2E6E2] [--field-border-hover:#CBD5CB] [--field-border-focus:#008C3A]";

const labelClassName = "text-sm font-medium text-[#22272B]";

export default function SignIn() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
    } else {
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("গুগল সাইন-ইন শুরু করতে সমস্যা হয়েছে।");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch {
      toast.error("গিটহাব সাইন-ইন শুরু করতে সমস্যা হয়েছে।");
    }
  };


  return (
    <div className="min-h-screen bg-[#F0F5F0] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[460px]">
        <div className="text-center mb-7">
          <h1 className="text-2xl sm:text-[28px] font-bold text-[#181C1F] tracking-tight">
            সাইন ইন
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#E4EAE4] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <TextField
              isRequired
              fullWidth
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা লিখুন";
                }
                return null;
              }}
            >
              <Label className={labelClassName}>ইমেইল</Label>
              <Input
                placeholder="আপনার ইমেইল লিখুন"
                className={inputClassName}
              />
              <FieldError className="text-xs text-red-600" />
            </TextField>

            <TextField
              isRequired
              fullWidth
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                }
                return null;
              }}
            >
              <Label className={labelClassName}>পাসওয়ার্ড</Label>
              <Input placeholder="কমপক্ষে ৮ অক্ষর" className={inputClassName} />
              <FieldError className="text-xs text-red-600" />
            </TextField>

            <Button
              type="submit"
              fullWidth
              className="mt-2 h-11 md:h-11 rounded-xl [--button-bg:#008C3A] [--button-bg-hover:#007530] [--button-bg-pressed:#00682A] [--button-fg:#ffffff] text-sm sm:text-[15px] font-semibold shadow-[0_6px_14px_rgba(0,140,58,0.24)]"
            >
              সাইন ইন
            </Button>
          </Form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#E5E8E5]" />
            <span className="text-xs text-[#6B7280]">অথবা</span>
            <span className="h-px flex-1 bg-[#E5E8E5]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              fullWidth
              className="h-10 md:h-10 rounded-xl border-[#E2E6E2] [--button-bg:#ffffff] [--button-bg-hover:#F7F9F7] [--button-bg-pressed:#EFF3EF] [--button-fg:#1F2328] px-3 text-[13px] font-medium"
              onClick={handleGoogleSignIn}
            >
              <GoogleIcon />
              <span>Google দিয়ে চালিয়ে যান</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              fullWidth
              className="h-10 md:h-10 rounded-xl border-[#E2E6E2] [--button-bg:#ffffff] [--button-bg-hover:#F7F9F7] [--button-bg-pressed:#EFF3EF] [--button-fg:#1F2328] px-3 text-[13px] font-medium"
              onClick={handleGithubSignIn}
            >
              <GitHubIcon />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </Button>
          </div>

          <p className="mt-5 text-center text-sm text-[#4B5563]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#008C3A] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] transition hover:text-[#181C1F]"
          >
            <span aria-hidden="true">←</span>
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
