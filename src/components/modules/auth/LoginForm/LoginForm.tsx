/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";
import { loginSchema, LoginType } from "@/zod/auth/auth.validator";
import ShareInput from "../../InputHandler/ShareInput";



export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginType) {
    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err: any) {
      Swal.fire("Error", err?.response?.data?.message || err.message, "error");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ShareInput label="Email" register={register("email")} error={errors.email?.message as any} />
        <ShareInput label="Password" register={register("password")} type="password" error={errors.password?.message as any} />
        <button className="w-full py-2 bg-indigo-600 text-white rounded mt-3">Login</button>
      </form>
    </div>
  );
}
