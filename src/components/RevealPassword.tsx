// import EyeHide from "";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type RevealPropsType = {
  reveal: boolean;
  setReveal: (value: boolean) => void;
};

export default function RevealPassword({ reveal, setReveal }: RevealPropsType) {
  return (
    <div className="cursor-pointer w-4" onClick={() => setReveal(!reveal)}>
      {reveal ? <EyeIcon /> : <EyeSlashIcon />}
    </div>
  );
}
