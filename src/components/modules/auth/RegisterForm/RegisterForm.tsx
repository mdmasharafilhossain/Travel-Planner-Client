/* eslint-disable @typescript-eslint/no-explicit-any */
// app/register/page.tsx
"use client";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";


import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";
import { registerSchema, RegType } from "@/zod/auth/auth.validator";
import ShareInput from "../../InputHandler/ShareInput";



export default function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegType>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegType) {
    try {
      await registerUser(data);
      Swal.fire("Success", "Account created", "success");
      router.push("/");
    } catch (err: any) {
      Swal.fire("Error", err?.response?.data?.message || err.message, "error");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ShareInput label="Full name" register={register("fullName")} error={errors.fullName?.message as any} />
        <ShareInput label="Email" register={register("email")} error={errors.email?.message as any} />
        <ShareInput label="Password" register={register("password")} type="password" error={errors.password?.message as any} />
        <button className="w-full py-2 bg-indigo-600 text-white rounded mt-3">Register</button>
      </form>
    </div>
  );
}
