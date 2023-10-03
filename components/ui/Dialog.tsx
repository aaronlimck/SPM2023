import { cn } from "@/lib/utils";

function Modal({
  modalWidth,
  modalHeading,
  className,
  children,
}: {
  modalWidth?: string;
  modalHeading?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm safeMargin">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-background opacity-50"></div>

      <div
        id="model"
        className={cn(
          "w-full max-w-md bg-white p-6 border rounded-xl shadow-md z-50 relative",
          modalWidth,
          className
        )}
      >
        {modalHeading?.length ? (
          <h2 className="text-lg font-semibold mb-2">{modalHeading}</h2>
        ) : null}

        {/* Render children within the modal content */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
