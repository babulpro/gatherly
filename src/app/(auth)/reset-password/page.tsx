"use client";

import Resetform from "@/components/Reset-form";
import { Suspense } from "react";

 
 


export default function SignInPage() {
   
 

  return (
    <div>
        <h2>reset passwoed</h2>
        <Suspense fallback="loading">
            <Resetform>
            </Resetform>
            

        </Suspense>
    
    </div>
    
  );
}