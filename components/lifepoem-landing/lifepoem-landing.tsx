import { HeroSection } from "./hero-section";
import { LandingFooter } from "./landing-footer";
import { ScreenshotScrollShowcase } from "./screenshot-scroll-showcase";
import { ValueProps } from "./value-props";

export function LifepoemLanding() {
  return (
    <div className="flex min-h-full flex-col bg-[var(--lifepoem-bg)]">
      <HeroSection />
      <ValueProps />
      <ScreenshotScrollShowcase />
      <LandingFooter />
    </div>
  );
}
