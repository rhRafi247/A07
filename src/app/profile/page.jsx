"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient, signOut, updateUser } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

function SignOutIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Rezwan Ahmed");
  const [statusMessage, setStatusMessage] = useState("");
  const [failedUrl, setFailedUrl] = useState(null);
  const { data: session } = authClient.useSession();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { error } = await updateUser({
      name: data.name,
    });

    if (error) {
      toast.error(error.message || "প্রোফাইল আপডেট ব্যর্থ হয়েছে।");
    } else {
      setUserName(data.name);
      toast.success("প্রোফাইলের তথ্য সফলভাবে আপডেট করা হয়েছে!");
      setStatusMessage("তথ্য সফলভাবে আপডেট করা হয়েছে।");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে।");
    } finally {
      router.push("/signin");
      router.refresh();
    }
  };

  const displayImage =
    session?.user?.image && failedUrl !== session.user.image
      ? session.user.image
      : "/profileImage.jpg";

  return (
    <div className="min-h-screen bg-[#F0F5F0] px-4 py-12">
      <div className="mx-auto w-full max-w-[760px]">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-[26px] font-bold text-[#181C1F] tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1.5 text-sm text-[#6B7280]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#E4EAE4] bg-white p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F3F4F6]">
              <Image
                src={displayImage}
                alt={userName}
                width={64}
                height={64}
                className="h-full w-full object-cover"
                onError={() => setFailedUrl(session?.user?.image)}
                referrerPolicy="no-referrer"
                unoptimized
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#181C1F] leading-snug">
                {session?.user?.name || userName}
              </h2>
              <p className="mt-0.5 text-sm text-[#6B7280]">
                {session?.user?.email}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-9.5 md:h-9.5 self-start sm:self-auto rounded-xl border border-[#E79A9A] [--button-bg:#ffffff] [--button-bg-hover:#FEF2F2] [--button-bg-pressed:#FEE2E2] [--button-fg:#DC2626] px-4 text-sm font-medium"
            onClick={handleSignOut}
          >
            <SignOutIcon />
            <span>সাইন আউট</span>
          </Button>
        </div>

        <div className="mt-5 rounded-2xl border border-[#E4EAE4] bg-white p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <h2 className="mb-5 text-base font-bold text-[#181C1F]">তথ্য</h2>

          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <TextField
              isRequired
              fullWidth
              name="name"
              type="text"
              onChange={() => {
                if (statusMessage) setStatusMessage("");
              }}
              validate={(value) => {
                if (!value.trim()) {
                  return "অনুগ্রহ করে নাম লিখুন";
                }
                return null;
              }}
            >
              <Label className="text-sm font-medium text-[#22272B]">নাম</Label>
              <Input
                className="w-full rounded-xl border border-[#E2E6E2] bg-white px-4 py-3 text-sm text-[#181C1F] shadow-none [--field-border:#E2E6E2] [--field-border-hover:#CBD5CB] [--field-border-focus:#008C3A]"
                placeholder="আপনার নাম লিখুন"
              />
              <FieldError className="text-xs text-red-600" />
            </TextField>

            {statusMessage && (
              <p className="text-xs font-medium text-[#008C3A]">
                {statusMessage}
              </p>
            )}

            <Button
              type="submit"
              fullWidth
              className="mt-1 h-11 md:h-11 rounded-xl [--button-bg:#008C3A] [--button-bg-hover:#007530] [--button-bg-pressed:#00682A] [--button-fg:#ffffff] text-sm sm:text-[15px] font-semibold shadow-[0_6px_14px_rgba(0,140,58,0.24)]"
            >
              আপডেট
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
