import { ReactNode } from "react";

const ModalBodyWrapper = ({
  children,
  wrapperGap,
}: {
  children: ReactNode;
  wrapperGap?: string;
}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-2 mx-auto max-w-sm md:max-w-[500px]">
          {/*content*/}
          <div
            className={`border-0 rounded-lg shadow-lg relative py-10 ${
              wrapperGap ? wrapperGap : "px-6"
            } flex flex-col w-full bg-white outline-none focus:outline-none`}
          >
            {/*body*/}
            <div className="relative p-2 flex-auto text-center">{children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalBodyWrapper;
