import { Suspense } from "react";
import DepositDetailsClient from "./DepositDetailsClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DepositDetailsClient />
    </Suspense>
  );
}
