/**
 * Admin Registration API (Optional - One-time setup)
 * ===================================================
 * Secure admin registration with registration code.
 * Use this once to create the initial admin account.
 */

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { AdminRegisterSchema } from "@/types";

// Secret registration code - change this in production!
const REGISTRATION_CODE = process.env.ADMIN_REGISTRATION_CODE || "GRAVILOCH2026";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = AdminRegisterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, password, registrationCode } = validation.data;

    // Verify registration code
    if (registrationCode !== REGISTRATION_CODE) {
      return NextResponse.json(
        { success: false, error: "Invalid registration code" },
        { status: 403 }
      );
    }

    // Check if email already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password with strong salt rounds
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "admin",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin account created successfully",
        data: admin,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create admin account",
      },
      { status: 500 }
    );
  }
}
