// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { RedundancyCalculator } from "@/components/calculators/RedundancyCalculator";

afterEach(cleanup);

describe("RedundancyCalculator (component wiring)", () => {
  it("renders the default live result", () => {
    render(<RedundancyCalculator />);
    // defaults: age 40, 6 years, £500/wk => 6 weeks × £500 = £3,000
    // (appears in both the headline and the breakdown row)
    expect(screen.getAllByText("£3,000").length).toBeGreaterThan(0);
  });

  it("recomputes live when an input changes (no submit)", () => {
    render(<RedundancyCalculator />);
    const weekly = screen.getByLabelText("Gross weekly pay") as HTMLInputElement;
    fireEvent.change(weekly, { target: { value: "600" } });
    // 6 weeks × £600 = £3,600
    expect(screen.getAllByText("£3,600").length).toBeGreaterThan(0);
  });

  it("shows the download CTA only for a valid result", () => {
    render(<RedundancyCalculator />);
    expect(screen.getByRole("button", { name: /download pdf summary/i })).toBeTruthy();

    const years = screen.getByLabelText("Full years of service") as HTMLInputElement;
    fireEvent.change(years, { target: { value: "1" } }); // below 2-year minimum
    expect(screen.queryByRole("button", { name: /download pdf summary/i })).toBeNull();
  });
});
