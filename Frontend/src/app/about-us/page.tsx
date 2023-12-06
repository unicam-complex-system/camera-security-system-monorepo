import {
  AboutUsOverviewContainer,
  AboutUsSolutionContainer,
  AboutUsMissionContainer,
  AboutUsTeamContainer,
} from "@/containers";

export default function ContactUsPage() {
  return (
    <div className="flex flex-col">
      <AboutUsOverviewContainer />
      <AboutUsSolutionContainer />
      <AboutUsMissionContainer />
      <AboutUsTeamContainer />
    </div>
  );
}
