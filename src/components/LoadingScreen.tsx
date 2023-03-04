import { LoadingIcon } from "./LoadingIcon";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black/60 overflow-y-clip z-50">
      <LoadingIcon />
    </div>
  );
};
