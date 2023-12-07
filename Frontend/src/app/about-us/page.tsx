import {
  AboutUsOverviewContainer,
  AboutUsSolutionContainer,
  AboutUsMissionContainer,
  AboutUsTeamContainer,
} from "@/containers";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      <AboutUsOverviewContainer />
      <AboutUsSolutionContainer />
      <AboutUsMissionContainer />
      <AboutUsTeamContainer />
    </div>
  );
}
