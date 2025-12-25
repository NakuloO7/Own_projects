import { Auth } from "@/Components/Auth";
import { Quote } from "@/Components/Quote";

export const Signin = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Auth Section - Bottom half on mobile, Right half on desktop */}
      <div className="flex-1 min-h-[50vh] lg:min-h-screen">
        <Auth type="signin" />
      </div>
      {/* Quote Section - Top half on mobile, Left half on desktop */}
      <div className="flex-1 min-h-[50vh] lg:min-h-screen">
        <Quote />
      </div>
    </div>
  );
};
