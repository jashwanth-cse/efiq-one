"use client";

import { useState } from "react";
import SelectUserStep from "./SelectUserStep";
import PreviewStep from "./PreviewStep";

export default function ChooseUserPage() {
  const [step, setStep] = useState(1);
  const [users, setUsers] = useState("");

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  return (
    <main className="min-h-screen pt-32 pb-16 px-4 bg-background overflow-x-hidden font-orbitron flex flex-col items-center">
      <div className="w-full max-w-3xl flex justify-center mt-12 sm:mt-24">
        <div className="w-full max-w-2xl rounded-3xl border-2 border-brand-blue/60 bg-gradient-to-br from-brand-blue/10 via-white to-brand-green/10 shadow-[0_16px_40px_rgba(90,120,255,0.14)] px-6 sm:px-10 py-8 sm:py-10">
          {step === 1 ? (
            <SelectUserStep
              users={users}
              setUsers={setUsers}
              onNext={handleNext}
            />
          ) : (
            <PreviewStep
              users={users}
              setUsers={setUsers}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </main>
  );
}
