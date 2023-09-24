import CustomLink from "@/components/ui/CustomLink";

export default function Denied() {
  return (
    <div className="flex flex-col justify-center items-center dvh space-y-2">
      <img className="max-w-[120px] h-auto" src="../cross.png" alt="error401" />
      <h1 className="text-2xl font-semibold">Access Denied</h1>
      <p className="text-center w-full max-w-sm text-gray-600 pb-2">
        You don't have permission to access this page. Contact an adminstrator
        for access.
      </p>
      <CustomLink href="/" text="Back to Home" variant="primary" />
    </div>
  );
}
