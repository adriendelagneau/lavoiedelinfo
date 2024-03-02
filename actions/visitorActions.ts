"use server"

import Visitor from "@/lib/models/Visitor"
import { NextRequest, NextResponse } from "next/server"

export const getVisitorIp = async (req: NextRequest) => {
  try {
    console.log(req)
      return {msg: "success"}
    } catch (err) {
      console.log(err)
    }
}

