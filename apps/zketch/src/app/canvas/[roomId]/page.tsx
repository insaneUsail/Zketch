// pages/index.tsx

import Zketch from "../../../components/Zketch";
export default async function HomePage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const param = await params;

  return (
    <div>
      <Zketch roomId={parseInt(param.roomId)} />
    </div>
  );
}
