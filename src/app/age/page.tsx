import AgeCalculator from "@/components/AgeCalculator";

export const metadata = {
  title: "Age Calculator | Date & Time Calculator",
  description: "Calculate your exact age in years, months, and days. Find out how many days you have lived and when your next birthday is.",
};

export default function AgePage() {
  return <AgeCalculator />;
}
