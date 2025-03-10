import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="solid"
      type="submit"
      className="group flex h-[3rem] w-[8rem] items-center justify-center gap-2 rounded-full outline-none transition-all  disabled:scale-100 disabled:bg-opacity-65 "
      disabled={pending}
    >
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1" />{" "}
        </>
      )}
    </Button>
  );
}
