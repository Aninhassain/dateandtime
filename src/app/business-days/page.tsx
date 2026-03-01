import BusinessDaysCalculator from "@/components/BusinessDaysCalculator";

export const metadata = {
  title: "Business Days Calculator | Date & Time Calculator",
  description: "Calculate the number of working days between two dates, excluding weekends and optionally holidays.",
};

export default function BusinessDaysPage() {
  return <BusinessDaysCalculator />;
}
