import { SigninInput,SignupInput } from "#schemas/auth.schema.js";
import { Request, Response } from "express";

import { supabase } from "../utils/supabaseClient.js";

export const signup = async (req: Request, res: Response) => {
  const { email, name, password, role } = req.body as SignupInput;
  console.log({ email, name, password, role });

  const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";
  const { data, error } = await supabase.auth.signUp({
    email,
    options: {
      data: {
        name,
        role,
      },
      emailRedirectTo: `${frontendUrl}/sign-in`,
    },
    password,
  });
  if (error) {
    console.log(error);
    return res.status(400).json({
      error,
      message: "Bad Request",
    });
  }
  // Add signup logics
  res.status(200).json({
    data,
    message: "Thanks for signing up! Check your email for the confirmation link.",
  });
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body as SigninInput;
  console.log({ email, password });

  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if(error){
    console.log(error)
    return res.status(400).json({
      error,
      
    })
  }
  // Add signin logics
  res.status(200).json({
    data,
    message: "Thanks for signing in!",
  });

};