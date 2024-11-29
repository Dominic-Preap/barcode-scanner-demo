"use client";

import { BarcodeScannerDialog } from "@/components/barcode-scanner";
import { NextPage } from "next";
import { useState } from "react";

const Page: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [qr, setQR] = useState('');

  return (
    <div className="p-12">
      <button onClick={()=>setOpen(true)} className="bg-blue-500 py-2 px-3 rounded text-white">Open Camera</button>
      <div>
        CODE IS: {qr}
      </div>

      <BarcodeScannerDialog //
        open={open}
        onClose={()=>setOpen(false)}
        onCapture={setQR}
      />
    </div>
  );
};

export default Page;
