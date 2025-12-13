import { CoachSignupInput, RefreshTokenInput, SigninInput, SignupInput, SuperAdminSignupInput } from "#schemas/auth.schema.js";
import { Request, Response } from "express";

import { db } from "../db/index.js";
import { coachTable, superAdminTable, usersTable } from "../db/schema.js";
import { SuperAdmin, UserMetadata } from "../types/auth.types.js";
import { supabase } from "../utils/supabaseClient.js";

export const signup = async (req: Request, res: Response) => {
  const { email, name, password, role } = req.body as SignupInput;
  console.log({ email, name, password, role });

  const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";
  const redirectUrl = `${frontendUrl.replace(/\/$/, "").replace(/\/sign-in\/?$/, "")}/sign-in`;
  console.log("signup triggered", { redirectUrl });
// Check if user exists
  const { data: existingUser, error: existingUserError } = await supabase.from("users").select("email").eq("email", email).maybeSingle();
  if (existingUserError) {
    console.log("signup existing user error", existingUserError);
    return res.status(400).json({
      error: existingUserError,
      message: "Bad Request",
    });
  }
  if (existingUser) {
    console.log("User already exists", existingUser);
    return res.status(400).json({
      error: "User already exists",
      message: "User already exists",
    });
  }
  console.log("User does not exist, creating new user");
  const { data, error } = await supabase.auth.signUp({
    email,
    options: {
      data: {
        name,
        role,
      },
      emailRedirectTo: redirectUrl,
    },
    password,
  });
  console.log("signup auth data", data);
  if (error) {
    console.log("signup auth error", error);
    return res.status(400).json({
      error,
      message: "Bad Request",
    });
  }
  // Create user in local db
  if (data.user) {
    console.log("User created successfully", data);
    console.log({
      email,
      email_verified: false,
      name,
      phone_verified: false,
      role,
    })
    try {
      await db.insert(usersTable).values({
        email,
        email_verified: false,
        id: data.user.id,
        name,
        phone_verified: false,
        role,
      });
    } catch (error) {
      console.log("signup db error", error);
      return res.status(400).json({
        error,
        message: "Bad Request",
      });
    }
  }

  // Add signup logics
  res.status(200).json({
    data,
    message: "Thanks for signing up! Check your email for the confirmation link.",
  });
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body as SigninInput;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log("signin auth data", data);
  if (error) {
    console.log("signin auth error", error);
    let errorMessage = "An error occurred during sign in";
    if (error.code === "invalid_credentials") {
      errorMessage = "Invalid email or password";
    } 
    if (error.code =="email_not_confirmed"){
      errorMessage = "Email not confirmed, please check your email for the confirmation link";
    }
    return res.status(error.status ?? 400).json({
      error: error.message,
      message: errorMessage,
    });
  }
  const { session, user } = data;
  console.log({
    session,
    user,
  });
  let email_verified, name, phone_verified, role;

  if (user.user_metadata.role === "superadmin") {
    const { data: superAdminData, error: superAdminError } = await supabase
      .from("super_admin")
      .select("*")
      .eq("email", user.email)
      .maybeSingle<SuperAdmin>();
    if (superAdminError) {
      return res.status(400).json({
        error: superAdminError,
        message: "Bad Request",
      });
    }
    if (!superAdminData) {
      return res.status(404).json({
        message: "Super admin profile not found",
      });
    }
    email_verified = true; // Superadmins are verified by default or handled differently
    name = superAdminData.name;     
    phone_verified = true;
    role = "superadmin";
  } else {
    ({ email_verified, name, phone_verified, role } = user.user_metadata as UserMetadata);
  }

  res.status(200).json({
    data: {
      session: {
        access_token: session.access_token,
        expires_at: session.expires_at,
        expires_in: session.expires_in,
        refresh_token: session.refresh_token,
      },
      user: {
        email: user.email,
        email_verified: email_verified,
        id: user.id,
        name: name,
        phone_verified: phone_verified,
        role: role,
      },
    },
    message: "Thanks for signing in!",
  });
};

export const refresh = async (req: Request, res: Response) => {
  const { refresh_token } = req.body as RefreshTokenInput;

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token,
  });

  if (error) {
    console.log(error);
    return res.status(401).json({
      error: error.message,
      message: "Unauthorized: Invalid refresh token",
    });
  }

  const { session, user } = data;
  if (!session || !user) {
    return res.status(401).json({
      message: "Unauthorized: Session expired",
    });
  }

  res.status(200).json({
    data: {
      session: {
        access_token: session.access_token,
        expires_at: session.expires_at,
        expires_in: session.expires_in,
        refresh_token: session.refresh_token,
      },
    },
    message: "Token refreshed successfully",
  });
};

export const coachSignup = async (req: Request, res: Response) => {
  const { gymAddress, gymName, members, name, password, work_email } = req.body as CoachSignupInput;
  console.log({ gymAddress, gymName, members, name, password, work_email });

  const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";
  const redirectUrl = `${frontendUrl.replace(/\/$/, "").replace(/\/sign-in\/?$/, "")}/sign-in`;

  const { data, error } = await supabase.auth.signUp({
    email: work_email,
    options: {
      data: {
        gymAddress,
        gymName,
        members,
        name,
        role: "coach",
      },
      emailRedirectTo: redirectUrl,
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

  // Create user in local db
  if (data.user) {
    // Check if user already exists
    const { data: existingUser, error: existingUserError } = await supabase.from("coach").select("work_email").eq("work_email", work_email).maybeSingle();
    if (existingUserError) {
      return res.status(400).json({
        error: existingUserError,
        message: "Bad Request",
      });
    }
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
        message: "User already exists",
      });
    }
    await db.insert(coachTable).values({
      gymAddress,
      gymName,
      id: data.user.id,
      members,
      name,
      role: "coach",
      work_email,
    });
  }

  // Add signup logics
  res.status(200).json({
    data,
    message: "Thanks for signing up! Check your email for the confirmation link.",
  });
};

export const superAdminSignup = async (req: Request, res: Response) => {
  const { email, name, password } = req.body as SuperAdminSignupInput;

  const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";
  const redirectUrl = `${frontendUrl.replace(/\/$/, "").replace(/\/sign-in\/?$/, "")}/sign-in`;

  const { data, error } = await supabase.auth.signUp({
    email,
    options: {
      data: {
        name,
        role: "superadmin",
      },
      emailRedirectTo: redirectUrl,
    },
    password,
  });

  if (error) {
    console.log(error);
    return res.status(400).json({
      error,
      message: error.message || "Bad Request",
    });
  }

  // Create user in local db
  if (data.user) {
    // Check if user already exists
    const { data: existingUser, error: existingUserError } = await supabase.from("super_admin").select("email").eq("email", email).maybeSingle();
    if (existingUserError) {
      return res.status(400).json({
        error: existingUserError,
        message: existingUserError.message || "Bad Request",
      });
    }
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
        message: "User already exists",
      });
    }
    try {
      await db.insert(superAdminTable).values({
        email,
        id: data.user.id,
        name,
        role: "superadmin",
      });
    } catch (error) {
      console.log("signup db error", error);
      return res.status(400).json({
        error,
        message: "User already exists",
      });
    }
  }

  res.status(200).json({
    data,
    message: "Thanks for signing up! Check your email for the confirmation link.",
  });
};
